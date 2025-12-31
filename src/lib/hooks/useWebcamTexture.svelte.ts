import { getContext, setContext } from 'svelte'
import { VideoTexture, VideoFrameTexture, LinearFilter } from 'three/webgpu'

const key = Symbol('webcam-texture-context')

interface Context {
	state: 'idle' | 'requesting' | 'streaming' | 'failed'

	video: HTMLVideoElement
	texture: VideoTexture
}

export const provideWebcamTexture = () => {
	let webcamState = $state<Context['state']>('idle')

	const video = document.createElement('video')
	video.autoplay = true
	video.playsInline = true

	const texture = new VideoTexture(video)
	texture.minFilter = LinearFilter
	texture.magFilter = LinearFilter

	const requestAccess = async () => {
		try {
			webcamState = 'requesting'

			const stream = await navigator.mediaDevices.getUserMedia({ video: true })
			video.srcObject = stream

			// Wait for video to load
			await new Promise((resolve) => (video.onloadedmetadata = resolve))

			webcamState = 'streaming'
		} catch (error) {
			console.error('Webcam stream failed to start:', error)
			webcamState = 'failed'
			return
		}
	}

	$effect(() => {
		requestAccess()

		return () => {
			const stream = video.srcObject as MediaStream

			if (stream) {
				// 1. Stop all tracks
				stream.getTracks().forEach((track) => track.stop())

				video.srcObject = null
				video.removeAttribute('src')

				texture.dispose()
			}
		}
	})

	const context: Context = {
		video,
		texture,
		get state() {
			return webcamState
		},
	}

	setContext<Context>(key, context)

	return context
}

export const useWebcamTexture = (): Context => {
	return getContext<Context>(key)
}
