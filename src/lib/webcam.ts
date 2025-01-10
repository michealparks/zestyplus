import { VideoTexture } from 'three'

export async function createWebcamVideoTexture() {
	// Create a video element
	const video = document.createElement('video')
	video.autoplay = true
	video.playsInline = true

	try {
		// Request access to the webcam
		const stream = await navigator.mediaDevices.getUserMedia({ video: true })
		video.srcObject = stream
	} catch (error) {
		console.error('Unable to access webcam:', error)
		return
	}

	// Wait for video to load
	await new Promise((resolve) => (video.onloadedmetadata = resolve))

	return new VideoTexture(video)
}
