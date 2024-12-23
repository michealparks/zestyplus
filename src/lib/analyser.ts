const analyser: { current: AnalyserNode | undefined } = {
	current: undefined,
}

const frequencyData = {
	current: new Uint8Array(),
}

const fttSize = 1024

const createAnalyser = async () => {
	// 1. Get access to the user's microphone
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

	// 2. Create a Web Audio context
	const audioContext = new AudioContext()

	// 3. Connect the microphone stream to the Web Audio context
	const source = audioContext.createMediaStreamSource(stream)

	// 4. Create an Analyser Node
	analyser.current = audioContext.createAnalyser()

	// Adjust for resolution (128, 256, 512, etc.)
	analyser.current.fftSize = fttSize

	// Connect the source to the analyser
	source.connect(analyser.current)
}

const startAnalyser = async () => {
	try {
		await createAnalyser()
	} catch (error) {
		console.error('Error accessing microphone:', error)
	}

	if (!analyser.current) {
		console.error('No audio analyser!')
		return
	}

	// Half of fftSize
	const bufferLength = analyser.current.frequencyBinCount
	frequencyData.current = new Uint8Array(bufferLength)

	const getByteFrequency = () => {
		requestAnimationFrame(getByteFrequency)

		if (analyser.current === undefined) return

		// Get frequency data
		analyser.current.getByteFrequencyData(frequencyData.current)
	}

	getByteFrequency()
}

export const useAnalyser = () => {
	return {
		fttSize,
		frequencyData,
		startAnalyser,
	}
}
