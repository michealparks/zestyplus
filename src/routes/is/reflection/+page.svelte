<script lang="ts">
	import {
		VideoTexture,
		Mesh,
		SpotLight,
		ShaderMaterial,
		PlaneGeometry,
	} from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Environment, OrbitControls } from '@threlte/extras'
	import Lightformer from '$lib/components/Lightformer.svelte'
	import { useAnalyser } from '$lib'
	import { lerp } from 'three/src/math/MathUtils.js'
	import { normalizeToUnitInterval } from '$lib/math'
	import { fragmentShader, vertexShader } from './shader'

	const { scene } = useThrelte()
	const { frequencyData } = useAnalyser()

	let texture: VideoTexture | undefined = $state()

	async function createWebcamTexture() {
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

		texture = new VideoTexture(video)
	}

	// $effect(() => {
	// 	createWebcamTexture()
	// })

	const spot1 = new SpotLight()

	const mesh1 = new Mesh()

	const uniforms = {
		time: { value: 1.0 },
	}
	const shaderMaterial = new ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
	})

	useTask((delta) => {
		mesh1.rotation.y += delta

		uniforms.time.value += delta / 3 + frequencyData.current[32] / 500

		const n = normalizeToUnitInterval(frequencyData.current[16], 0, 100)
		spot1.intensity = lerp(n * 10, 0, delta / 2)
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={6}
>
	<OrbitControls />
</T.PerspectiveCamera>

<!-- <T.DirectionalLight
	castShadow
	position={[2, 2, 2]}
/> -->
<!-- <T.AmbientLight /> -->

<T
	is={spot1}
	castShadow
	intensity={1000}
	position={[4, 3, 2]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)

		scene.add(ref.target)
		ref.target.position.set(0, 0, 0)
	}}
/>

<T
	is={mesh1}
	castShadow
	receiveShadow
>
	<T.TorusKnotGeometry args={[1, 0.4, 256, 64]} />
	<T.MeshStandardMaterial
		roughness={0.1}
		metalness={1}
	/>
</T>

<T.Mesh position.z={-1}>
	<T is={shaderMaterial} />
	<T.BoxGeometry args={[12, 3]} />
</T.Mesh>

<Lightformer />
