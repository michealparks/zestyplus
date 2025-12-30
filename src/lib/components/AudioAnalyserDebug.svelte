<script lang="ts">
	import { useAnalyser } from '$lib/analyser.svelte'

	const analyser = useAnalyser()

	let active = $derived(analyser.active)

	let spectrum = $state.raw<number[]>([])
	let bands = $state.raw(analyser.bands)

	let level = $state.raw(analyser.level)
	let slowLevel = $state.raw(analyser.slowLevel)
	let punch = $state.raw(analyser.punch)

	let loudness = $state.raw(analyser.loudness)
	let energyCurve = $state.raw(analyser.energyCurve)

	let flux = $state.raw(analyser.flux)
	let onset = $state.raw(analyser.onset)
	let onsetStrength = $state.raw(analyser.onsetStrength)

	let tilt = $state.raw(analyser.tilt)
	let centroidHz = $state.raw(analyser.centroidHz)

	let kick = $state.raw(analyser.kick)
	let snare = $state.raw(analyser.snare)
	let hat = $state.raw(analyser.hat)

	let rms = $state.raw(analyser.rms)
	let peak = $state.raw(analyser.peak)

	let frameID = 0
	const frame = () => {
		frameID = requestAnimationFrame(frame)

		active = analyser.active
		spectrum = [...analyser.logSmooth01]
		bands = { ...analyser.bands }

		level = analyser.level
		slowLevel = analyser.slowLevel
		punch = analyser.punch

		loudness = analyser.loudness
		energyCurve = analyser.energyCurve

		flux = analyser.flux
	}

	$effect(() => {
		frameID = requestAnimationFrame(frame)
		return () => cancelAnimationFrame(frameID)
	})

	const fmt = (v: number, digits = 4) => v.toFixed(digits)
</script>

<div
	class="color-[#f3f3f3] panel fixed top-2 right-2 z-100 h-95/100 w-105 overflow-auto bg-black/80 p-4 text-xs backdrop-blur-sm"
>
	<h2>Analyser Debug</h2>

	<!-- global status -->
	<div class="row">
		<div class="label">mic</div>
		<div class="value">
			<span
				class:active
				class="badge"
			>
				<span class="badge-dot"></span>
				{active ? 'active' : 'idle'}
			</span>
		</div>
	</div>

	<h3>Spectrum (logSmooth01)</h3>
	<div class="bar-strip">
		{#each spectrum as v, index (index)}
			<div class="bar-bg">
				<div
					class="bar"
					style="transform: scale(1, {v});"
				></div>
			</div>
		{/each}
	</div>

	<h3>Bands</h3>
	<div class="row">
		<div class="label">bass</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.bass * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.bass)}</div>
	</div>
	<div class="row">
		<div class="label">lowMid</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.lowMid * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.lowMid)}</div>
	</div>
	<div class="row">
		<div class="label">mid</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.mid * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.mid)}</div>
	</div>
	<div class="row">
		<div class="label">highMid</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.highMid * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.highMid)}</div>
	</div>
	<div class="row">
		<div class="label">treble</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.treble * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.treble)}</div>
	</div>
	<div class="row">
		<div class="label">air</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${bands.air * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(bands.air)}</div>
	</div>

	<h3>Levels</h3>
	<div class="row">
		<div class="label">rms</div>
		<div class="value">{fmt(rms)}</div>
	</div>
	<div class="row">
		<div class="label">peak</div>
		<div class="value">{fmt(peak)}</div>
	</div>
	<div class="row">
		<div class="label">level</div>
		<div class="value">{fmt(level)}</div>
	</div>
	<div class="row">
		<div class="label">slowLevel</div>
		<div class="value">{fmt(slowLevel)}</div>
	</div>
	<div class="row">
		<div class="label">punch</div>
		<div class="value">{fmt(punch)}</div>
	</div>

	<h3>Loudness</h3>
	<div class="row">
		<div class="label">loudness</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${loudness * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(loudness)}</div>
	</div>
	<div class="row">
		<div class="label">energyCurve</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${energyCurve * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(energyCurve)}</div>
	</div>

	<h3>Onset / Flux</h3>
	<div class="row">
		<div class="label">flux</div>
		<div class="value">{fmt(flux)}</div>
	</div>
	<div class="row">
		<div class="label">onsetStrength</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${onsetStrength * 100}%;`}
			></div>
		</div>
		<div class="value">
			{fmt(onsetStrength)}
			{onset ? '⚡' : ''}
		</div>
	</div>

	<h3>Timbre</h3>
	<div class="row">
		<div class="label">tilt</div>
		<div class="value">{fmt(tilt)}</div>
	</div>
	<div class="row">
		<div class="label">centroidHz</div>
		<div class="value">{fmt(centroidHz, 0)} Hz</div>
	</div>

	<h3>Drum-ish</h3>
	<div class="row">
		<div class="label">kick</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${kick * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(kick)}</div>
	</div>
	<div class="row">
		<div class="label">snare</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${snare * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(snare)}</div>
	</div>
	<div class="row">
		<div class="label">hat</div>
		<div class="bar-bg">
			<div
				class="bar"
				style={`height: ${hat * 100}%;`}
			></div>
		</div>
		<div class="value">{fmt(hat)}</div>
	</div>
</div>

<style>
	h2 {
		font-size: 0.9rem;
		margin: 0 0 0.4rem;
		font-weight: 600;
	}

	h3 {
		font-size: 0.8rem;
		margin: 0.6rem 0 0.3rem;
		font-weight: 600;
		opacity: 0.9;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.label {
		opacity: 0.8;
		white-space: nowrap;
	}

	.value {
		font-variant-numeric: tabular-nums;
	}

	.bar-strip {
		display: flex;
		align-items: flex-end;
		gap: 1px;
		height: 60px;
		padding: 4px 0;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.05);
		overflow: hidden;
	}

	.bar {
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #4ade80, #22d3ee);
		transform-origin: bottom;
	}

	.bar-bg {
		flex: 1;
		height: 100%;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 2px;
		overflow: hidden;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		font-size: 0.65rem;
	}

	.badge.active {
		background: rgba(52, 211, 153, 0.2);
		color: #bbf7d0;
	}

	.badge-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: rgba(239, 68, 68, 0.7);
	}

	.badge.active .badge-dot {
		background: rgba(52, 211, 153, 0.9);
	}
</style>
