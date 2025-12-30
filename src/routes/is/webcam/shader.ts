import type { VideoTexture } from 'three/webgpu'
import {
	RenderTarget,
	WebGPURenderer,
	PlaneGeometry,
	Mesh,
	Scene,
	OrthographicCamera,
	MeshStandardNodeMaterial,
} from 'three/webgpu'
import {
	texture,
	uniform,
	varying,
	vec2,
	uv,
	floor,
	length,
	step,
	max,
	Discard,
	If,
	vec4,
	Fn,
	mix,
	materialColor,
} from 'three/tsl'
import { useTask, useThrelte } from '@threlte/core'

export const createShader = (videoTexture: VideoTexture) => {
	const { renderer } = useThrelte<WebGPURenderer>()
	const width = 640
	const height = 480

	const pixelateMat = new MeshStandardNodeMaterial()
	const uVideo = texture(videoTexture)
	const resolution = uniform(vec2(640, 480), 'vec2')
	const pixelSize = uniform(1, 'float')
	const vuv = uv()

	pixelateMat.colorNode = Fn(() => {
		const block = pixelSize.div(resolution)
		const uvPix = block.mul(floor(vuv.div(block)))
		return mix(uVideo.sample(uvPix), materialColor, 0.5)
	})()
	return pixelateMat

	const rtA = new RenderTarget(width, height)
	const rtB = new RenderTarget(width, height)

	let currRT = rtA
	let prevRT = rtB

	{
		const uVideo = texture(videoTexture)
		const uResolution = uniform('vec2')
		const uPixelSize = uniform('float')
		const vUv = varying(vec2(), 'vUv')

		pixelateMat.fragmentNode = Fn(() => {
			const block = uPixelSize.div(uResolution)
			const uvPix = block.mul(floor(vUv.div(block)))
			return uVideo.sample(uvPix)
		})
	}

	const fsQuadGeo = new PlaneGeometry(2, 2)
	const pixelateMesh = new Mesh(fsQuadGeo, pixelateMat)
	const pixelateScene = new Scene()
	pixelateScene.add(pixelateMesh)
	const pixelateCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)

	useTask(() => {
		renderer.setRenderTarget(currRT)
		renderer.render(pixelateScene, pixelateCamera)
	})

	// fragment shader (motion + pixelation)

	const uCurrentFrame = texture(rtA.texture)

	// pixelated or raw webcam frame
	const uPrevFrame = texture(rtB.texture)
	const uResolution = uniform({ x: 640, y: 480 }, 'vec2')

	// render target size in pixels
	const uPixelSize = uniform(8, 'float')

	// size of one "block" in pixels
	const uThreshold = uniform('float')

	// motion threshold
	const uPersistence = uniform('float')

	// 0..1, how long movement lingers
	const vUv = varying(vec2(), 'vUv')

	return Fn(() => {
		// 1. Pixelate: snap UV to a grid
		const block = uPixelSize.div(uResolution)

		// how big each cell is in UV units
		const uvPix = block.mul(floor(vUv.div(block)))

		// quantized UV
		const curr = uCurrentFrame.sample(uvPix)
		const prev = uPrevFrame.sample(uvPix)

		// 2. Motion detection
		const diff = length(curr.rgb.sub(prev.rgb))

		// grayscale "amount of change"
		// raw motion mask: 0 or 1
		const motion = step(uThreshold, diff)

		// 3. Optional persistence: use alpha channel of prev as “motion history”
		const prevMotion = prev.a

		// treat prev alpha as history
		const history = max(motion, prevMotion.mul(uPersistence))

		// 4. Only show moving pixels
		If(history.lessThan(0.001), () => {
			Discard()
		})

		return vec4(curr.rgb, history)
	})
}
