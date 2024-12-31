<script lang="ts">
	import { VideoTexture, Mesh } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Environment, OrbitControls } from '@threlte/extras'

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

	$effect(() => {
		createWebcamTexture()
	})

	const mesh = new Mesh()

	useTask((delta) => {
		mesh.rotation.y += delta
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={5}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight />
<T.AmbientLight />

{#if texture}
	<T is={mesh}>
		<T.TorusKnotGeometry args={[1, 0.4, 256, 64]} />
		<T.MeshStandardMaterial
			roughness={0.1}
			metalness={1}
			envMap={texture}
		/>
	</T>

	<Environment {texture} />
{/if}
