export const analyser: { current: AnalyserNode | undefined } = { current: undefined }
export const analyserData = { current: new Uint8Array() }

export const getAnalyser = async () => {
	// 1. Get access to the user's microphone
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

	// 2. Create a Web Audio context
	const audioContext = new AudioContext()

	// 3. Connect the microphone stream to the Web Audio context
	const source = audioContext.createMediaStreamSource(stream)

	// 4. Create an Analyser Node
	analyser.current = audioContext.createAnalyser()
	analyser.current.fftSize = 512 // Adjust for resolution (128, 256, 512, etc.)

	// Connect the source to the analyser
	source.connect(analyser.current)

	return analyser
}

export async function startAudioAnalyser(canvas: HTMLCanvasElement) {
	try {
		const analyser = await getAnalyser()

		if (!analyser.current) {
			throw new Error()
		}

		const bufferLength = analyser.current.frequencyBinCount // Half of fftSize
		analyserData.current = new Uint8Array(bufferLength) // Array to hold frequency data

		// 5. Set up a Canvas for visualization
		const canvasCtx = canvas.getContext('2d')!

		if (canvasCtx === null) {
			throw new Error('no canvas context')
		}

		function draw() {
			requestAnimationFrame(draw)

			// Get frequency data
			analyser.current.getByteFrequencyData(analyserData.current)

			// Clear the canvas
			canvasCtx.fillStyle = 'rgb(0, 0, 0)'
			canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

			// Draw frequency bars
			const barWidth = (canvas.width / bufferLength) * 2.5
			let barHeight
			let x = 0

			for (let i = 0; i < bufferLength; i++) {
				barHeight = analyserData.current[i] / 5

				canvasCtx.fillStyle = `rgb(255, 50, 50)`
				canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)

				x += barWidth + 1
			}
		}

		draw() // Start drawing
	} catch (err) {
		console.error('Error accessing microphone:', err)
	}
}
