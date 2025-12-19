import { setContext, getContext } from 'svelte'

const key = Symbol('analyser-context')

interface Context {
	current: AnalyserNode | undefined

	/** Raw FFT bins in decibels (negative values). */
	spectrumDb: Float32Array

	/** FFT bins normalized to [0..1] based on analyser.minDecibels/maxDecibels. */
	spectrum01: Float32Array

	/** Log-binned spectrum normalized [0..1]. Great for visuals. */
	log01: Float32Array

	/** Log-binned spectrum with temporal smoothing (best for bars/meshes). */
	logSmooth01: Float32Array

	/** Simple energy bands [0..1]. */
	bands: Bands

	/** Time-domain RMS (roughly 0..1). */
	rms: number

	/** Peak absolute sample (0..1). */
	peak: number

	/** Smoothed “level” (0..1) using attack/release smoothing. */
	level: number

	/** Very smoothed “mood” level. */
	slowLevel: number

	/** Transient energy: fast level minus slow level (0..1-ish). */
	punch: number

	/** Perceptual-ish loudness (band-weighted). */
	loudness: number

	/** Shaped loudness curve for visuals (gamma + floor). */
	energyCurve: number

	/** Spectral flux (onset-ish). Bigger = more “hits”. */
	flux: number

	/** Adaptive onset detection (no hand-tuned threshold). */
	onset: boolean
	onsetStrength: number

	/** Tilt of energy [-1..1] (low vs high). */
	tilt: number

	/** Spectral centroid in Hz (brightness). */
	centroidHz: number

	/** Heuristic drum-ish controls (0..1). */
	kick: number
	snare: number
	hat: number

	/** True when there’s meaningful sound; useful to gate effects. */
	active: boolean
}

type Bands = {
	bass: number
	lowMid: number
	mid: number
	highMid: number
	treble: number
	air: number
}

export const provideAnalyser = () => {
	let analyser = $state.raw<AnalyserNode>()
	let audioContext: AudioContext | undefined
	let stream: MediaStream | undefined

	// ---- Tuning knobs (feel free to tweak) ----
	const fftSize = 1024
	const logBinCount = 512

	const minDb = -90
	const maxDb = -10
	const smoothingTimeConstant = 0.8

	// attack/release for level smoothing
	const attack = 0.35
	const release = 0.08

	// log bin range
	const logMinHz = 20
	const logMaxHz = 16000

	// activity gate
	const activeThreshold = 0.06
	const activeHoldFrames = 10

	// ---- Backing storage (no per-frame allocs) ----
	let timeU8 = new Uint8Array()
	let spectrumDb = new Float32Array()
	let spectrum01 = new Float32Array()
	let log01 = new Float32Array(logBinCount)
	let logSmooth01 = new Float32Array(logBinCount)
	let prev01 = new Float32Array()

	// cached scalars
	let rms = 0
	let peak = 0

	let level = 0
	let slowLevel = 0
	let punch = 0

	let loudness = 0
	let energyCurve = 0

	let flux = 0
	let centroidHz = 0
	let tilt = 0

	let fluxAvg = 0
	let fluxDev = 0
	let onset = false
	let onsetStrength = 0

	let kick = 0
	let snare = 0
	let hat = 0

	let active = false
	let activeHold = 0

	let bands: Bands = {
		bass: 0,
		lowMid: 0,
		mid: 0,
		highMid: 0,
		treble: 0,
		air: 0,
	}

	// derived constants
	let binHz = 0
	let sampleRate = 0

	// precomputed index ranges for log bins + bands (avoids heavy math per frame)
	let logRanges: Array<{ a: number; b: number }> = []
	let bandRanges: Record<keyof Bands, { a: number; b: number }> = {
		bass: { a: 0, b: 0 },
		lowMid: { a: 0, b: 0 },
		mid: { a: 0, b: 0 },
		highMid: { a: 0, b: 0 },
		treble: { a: 0, b: 0 },
		air: { a: 0, b: 0 },
	}

	const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t

	const dbTo01 = (db: number) => clamp01((db - minDb) / (maxDb - minDb))

	const hzToIndex = (hz: number) => {
		if (!binHz) return 0

		return Math.max(0, Math.min(spectrum01.length - 1, Math.round(hz / binHz)))
	}

	const avgRange = (arr: Float32Array, a: number, b: number) => {
		if (b < a) return 0

		let sum = 0
		let n = 0
		for (let i = a; i <= b; i++) {
			sum += arr[i]
			n++
		}
		return n ? sum / n : 0
	}

	const shape = (x: number, floor = 0.02, gamma = 1.6) => {
		const y = Math.max(0, x - floor) / (1 - floor)
		return Math.pow(clamp01(y), 1 / gamma)
	}

	const precomputeRanges = () => {
		if (!analyser || !audioContext) return

		sampleRate = audioContext.sampleRate
		binHz = sampleRate / analyser.fftSize

		// log bins over a perceptual-ish frequency range
		const minHz = 20
		const maxHz = Math.min(16000, sampleRate / 2)
		const logMin = Math.log(minHz)
		const logMax = Math.log(maxHz)

		logRanges = new Array(logBinCount)
		for (let i = 0; i < logBinCount; i++) {
			const aHz = Math.exp(logMin + (i / logBinCount) * (logMax - logMin))
			const bHz = Math.exp(logMin + ((i + 1) / logBinCount) * (logMax - logMin))
			const a = hzToIndex(aHz)
			const b = hzToIndex(bHz)
			logRanges[i] = { a, b: Math.max(a, b) }
		}

		// band ranges (tweak to taste)
		// bass: 20–150, lowMid: 150–400, mid: 400–1200, highMid: 1200–3000, treble: 3000–8000, air: 8000–16000
		bandRanges.bass = { a: hzToIndex(20), b: hzToIndex(150) }
		bandRanges.lowMid = { a: hzToIndex(150), b: hzToIndex(400) }
		bandRanges.mid = { a: hzToIndex(400), b: hzToIndex(1200) }
		bandRanges.highMid = { a: hzToIndex(1200), b: hzToIndex(3000) }
		bandRanges.treble = { a: hzToIndex(3000), b: hzToIndex(8000) }
		bandRanges.air = { a: hzToIndex(8000), b: hzToIndex(16000) }
	}

	const createAnalyser = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					backgroundBlur: false,
					echoCancellation: false,
					noiseSuppression: false,
					autoGainControl: false,
				},
			})

			audioContext = new AudioContext()

			// Connect the microphone stream to the Web Audio context
			const source = audioContext.createMediaStreamSource(stream)
			analyser = audioContext.createAnalyser()

			// tuning:
			analyser.fftSize = fftSize
			analyser.smoothingTimeConstant = smoothingTimeConstant
			analyser.minDecibels = minDb
			analyser.maxDecibels = maxDb

			// Connect the source to the analyser
			source.connect(analyser)

			const n = analyser.frequencyBinCount
			timeU8 = new Uint8Array(analyser.fftSize)
			spectrumDb = new Float32Array(n)
			spectrum01 = new Float32Array(n)
			prev01 = new Float32Array(n)
			log01 = new Float32Array(logBinCount)
			logSmooth01 = new Float32Array(logBinCount)

			precomputeRanges()
		} catch (error) {
			console.error('Error accessing microphone:', error)
		}
	}

	const update = () => {
		if (!analyser || !audioContext) return

		// --- Spectrum in dB + normalized 0..1 ---
		analyser.getFloatFrequencyData(spectrumDb)
		for (let i = 0; i < spectrumDb.length; i++) {
			spectrum01[i] = dbTo01(spectrumDb[i])
		}

		// --- Log bins (musical-looking) ---
		for (let i = 0; i < logRanges.length; i++) {
			const { a, b } = logRanges[i]
			const v = avgRange(spectrum01, a, b)

			log01[i] = avgRange(spectrum01, a, b)
			logSmooth01[i] = lerp(logSmooth01[i], v, 0.25)
		}

		// --- Bands ---
		bands.bass = avgRange(spectrum01, bandRanges.bass.a, bandRanges.bass.b)
		bands.lowMid = avgRange(
			spectrum01,
			bandRanges.lowMid.a,
			bandRanges.lowMid.b
		)
		bands.mid = avgRange(spectrum01, bandRanges.mid.a, bandRanges.mid.b)
		bands.highMid = avgRange(
			spectrum01,
			bandRanges.highMid.a,
			bandRanges.highMid.b
		)
		bands.treble = avgRange(
			spectrum01,
			bandRanges.treble.a,
			bandRanges.treble.b
		)
		bands.air = avgRange(spectrum01, bandRanges.air.a, bandRanges.air.b)

		// --- Time-domain RMS + peak ---
		analyser.getByteTimeDomainData(timeU8)
		let sumSq = 0
		let p = 0
		for (let i = 0, l = timeU8.length; i < l; i++) {
			const x = (timeU8[i] - 128) / 128 // [-1, 1]
			const ax = Math.abs(x)
			if (ax > p) p = ax
			sumSq += x * x
		}
		rms = Math.sqrt(sumSq / timeU8.length)
		peak = p

		// Smoothed level (attack/release)
		const target = rms
		const k = target > level ? attack : release
		level += (target - level) * k

		// --- Slow level + punch (transients without beat detection) ---
		slowLevel += (level - slowLevel) * 0.03
		punch = Math.max(0, level - slowLevel)

		// --- Perceptual-ish loudness (band weighted) ---
		{
			const l =
				bands.bass * 0.4 +
				bands.lowMid * 0.8 +
				bands.mid * 1.0 +
				bands.highMid * 0.9 +
				bands.treble * 0.7 +
				bands.air * 0.4

			loudness += (l - loudness) * 0.2
		}

		// --- Shaped curve for visuals ---
		energyCurve = shape(loudness)

		// --- Activity gate ---
		{
			const isActiveNow = energyCurve > activeThreshold
			activeHold = isActiveNow ? activeHoldFrames : Math.max(0, activeHold - 1)
			active = activeHold > 0
		}

		// --- Spectral flux (onset-ish) ---
		let f = 0
		for (let i = 0; i < spectrum01.length; i++) {
			const d = spectrum01[i] - prev01[i]
			if (d > 0) f += d
			prev01[i] = spectrum01[i]
		}
		flux = f / spectrum01.length

		// --- Adaptive onset detection ---
		{
			fluxAvg += (flux - fluxAvg) * 0.05
			fluxDev += (Math.abs(flux - fluxAvg) - fluxDev) * 0.05

			const thresh = fluxAvg + 2.0 * fluxDev
			onset = flux > thresh
			onsetStrength = clamp01((flux - thresh) / (0.0001 + 3.0 * fluxDev))
		}

		// --- Spectral centroid (brightness) ---
		let num = 0
		let den = 0
		for (let i = 0; i < spectrum01.length; i++) {
			const w = spectrum01[i]
			const hz = i * (sampleRate / fftSize)
			num += hz * w
			den += w
		}
		centroidHz = den > 0 ? num / den : 0

		// --- Tilt [-1..1] (low vs high) ---
		{
			const low = (bands.bass + bands.lowMid + bands.mid) / 3
			const high = (bands.highMid + bands.treble + bands.air) / 3
			// map roughly into [-1..1]
			tilt = clamp01((high - low) * 0.75 + 0.5) * 2 - 1
		}

		// --- Heuristic drum-ish controls ---
		{
			const k = bands.bass * 0.9 + punch * 0.6
			const s = bands.highMid * 0.9 + punch * 0.4
			const h = bands.treble * 0.9 + bands.air * 0.7

			kick += (k - kick) * 0.3
			snare += (s - snare) * 0.3
			hat += (h - hat) * 0.25

			kick = clamp01(kick)
			snare = clamp01(snare)
			hat = clamp01(hat)
		}
	}

	$effect(() => {
		createAnalyser()

		return () => {
			try {
				stream?.getTracks().forEach((t) => t.stop())
			} catch {}
			try {
				audioContext?.close()
			} catch {}
			stream = undefined
			audioContext = undefined
			analyser = undefined
		}
	})

	$effect(() => {
		if (analyser) {
			const id = setInterval(update, 1000 / 30)
			return () => clearInterval(id)
		}
	})

	const context: Context = {
		get current() {
			return analyser
		},
		get spectrumDb() {
			return spectrumDb
		},
		get spectrum01() {
			return spectrum01
		},
		get log01() {
			return log01
		},
		get logSmooth01() {
			return logSmooth01
		},
		get bands() {
			return bands
		},
		get rms() {
			return rms
		},
		get peak() {
			return peak
		},
		get level() {
			return level
		},
		get slowLevel() {
			return slowLevel
		},
		get punch() {
			return punch
		},
		get loudness() {
			return loudness
		},
		get energyCurve() {
			return energyCurve
		},
		get flux() {
			return flux
		},
		get onset() {
			return onset
		},
		get onsetStrength() {
			return onsetStrength
		},
		get centroidHz() {
			return centroidHz
		},
		get tilt() {
			return tilt
		},
		get kick() {
			return kick
		},
		get snare() {
			return snare
		},
		get hat() {
			return hat
		},
		get active() {
			return active
		},
	}

	setContext<Context>(key, context)
}

export const useAnalyser = (): Context => {
	return getContext<Context>(key)
}
