<script lang="ts">
	import { hueShift, useAnalyser } from '$lib'
	import { T, useTask, useThrelte } from '@threlte/core'
	import {
		Color,
		Matrix4,
		Mesh,
		InstancedMesh,
		OctahedronGeometry,
		MeshStandardNodeMaterial,
		RectAreaLightNode,
		Data3DTexture,
		RedFormat,
		LinearFilter,
		RepeatWrapping,
		RectAreaLight,
		VolumeNodeMaterial,
		BoxGeometry,
		PlaneGeometry,
		BackSide,
		MeshBasicMaterial,
		MeshStandardMaterial,
		Layers,
		PostProcessing,
	} from 'three/webgpu'
	import {
		vec3,
		Fn,
		time,
		texture3D,
		screenUV,
		uniform,
		screenCoordinate,
		pass,
	} from 'three/tsl'

	import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js'
	import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js'
	import { bayer16 } from 'three/addons/tsl/math/Bayer.js'
	import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js'
	import type Node from 'three/src/nodes/core/Node.js'
	import { WebGPURenderer } from 'three/src/Three.WebGPU.Nodes.js'

	const { camera, scene, renderer, renderMode, renderStage, size } =
		useThrelte<WebGPURenderer>()

	$effect(() => {
		renderMode.set('manual')
		return () => renderMode.set('always')
	})

	const LAYER_VOLUMETRIC_LIGHTING = 10

	function createTexture3D() {
		let i = 0

		const size = 128
		const data = new Uint8Array(size * size * size)

		const scale = 10
		const perlin = new ImprovedNoise()

		const repeatFactor = 5.0

		for (let z = 0; z < size; z++) {
			for (let y = 0; y < size; y++) {
				for (let x = 0; x < size; x++) {
					const nx = (x / size) * repeatFactor
					const ny = (y / size) * repeatFactor
					const nz = (z / size) * repeatFactor

					const noiseValue = perlin.noise(nx * scale, ny * scale, nz * scale)

					data[i] = 128 + 128 * noiseValue

					i += 1
				}
			}
		}

		const texture = new Data3DTexture(data, size, size, size)
		texture.format = RedFormat
		texture.minFilter = LinearFilter
		texture.magFilter = LinearFilter
		texture.wrapS = RepeatWrapping
		texture.wrapT = RepeatWrapping
		texture.unpackAlignment = 1
		texture.needsUpdate = true

		return texture
	}

	const analyser = useAnalyser()

	RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())

	// Volumetric Fog Area
	const noiseTexture3D = createTexture3D()

	const smokeAmount = uniform(3.5)

	const volumetricMaterial = new VolumeNodeMaterial()
	volumetricMaterial.steps = 12
	volumetricMaterial.offsetNode = bayer16(screenCoordinate) // Add dithering to reduce banding
	volumetricMaterial.scatteringNode = Fn(
		({ positionRay }: { positionRay: Node }) => {
			// Return the amount of fog based on the noise texture

			const timeScaled = vec3(time, 0, time.mul(0.3))

			const sampleGrain = (scale: number, timeScale = 1) =>
				texture3D(
					noiseTexture3D,
					positionRay.add(timeScaled.mul(timeScale)).mul(scale).mod(1),
					0
				).r.add(0.5)

			let density = sampleGrain(0.1)
			density = density.mul(sampleGrain(0.05, 1))
			density = density.mul(sampleGrain(0.02, 2))

			return smokeAmount.mix(1, density)
		}
	)

	const volumetricMesh = new Mesh(
		new BoxGeometry(100, 100, 100),
		volumetricMaterial
	)
	volumetricMesh.receiveShadow = true
	volumetricMesh.position.y = 20
	volumetricMesh.layers.disableAll()
	volumetricMesh.layers.enable(LAYER_VOLUMETRIC_LIGHTING)

	// Objects
	const rectLight1 = new RectAreaLight(0xff0000, 5, 4, 10)
	rectLight1.layers.enable(LAYER_VOLUMETRIC_LIGHTING)
	rectLight1.position.set(0, -10, 0)
	rectLight1.lookAt(0, 0, 0)

	const rectLight2 = new RectAreaLight(0x00ff00, 5, 4, 10)
	rectLight2.layers.enable(LAYER_VOLUMETRIC_LIGHTING)
	rectLight2.position.set(-10, 0, 0)
	rectLight2.lookAt(0, 0, 0)

	const rectLight3 = new RectAreaLight(0x0000ff, 5, 4, 10)
	rectLight3.layers.enable(LAYER_VOLUMETRIC_LIGHTING)
	rectLight3.position.set(0, 0, -10)
	rectLight3.lookAt(0, 0, 0)

	const createRectLightMesh = (rectLight: RectAreaLight) => {
		const geometry = new PlaneGeometry(4, 10)
		const frontMaterial = new MeshBasicMaterial({
			color: rectLight.color,
			side: BackSide,
		})
		const backMaterial = new MeshStandardMaterial({ color: 0x111111 })

		const backSide = new Mesh(geometry, backMaterial)
		backSide.position.set(0, 0, 0.08)

		const frontSide = new Mesh(geometry, frontMaterial)
		frontSide.position.set(0, 0, 0.01)

		rectLight.add(backSide)
		rectLight.add(frontSide)
	}

	createRectLightMesh(rectLight1)
	createRectLightMesh(rectLight2)
	createRectLightMesh(rectLight3)

	// Post-Processing

	const postProcessing = new PostProcessing(renderer)

	$effect(() => {
		postProcessing.renderer.setSize($size.width, $size.height)
	})

	// Layers

	const volumetricLightingIntensity = uniform(1)

	const volumetricLayer = new Layers()
	volumetricLayer.disableAll()
	volumetricLayer.enable(LAYER_VOLUMETRIC_LIGHTING)

	// Scene Pass

	$effect(() => {
		if (!$camera) return

		const scenePass = pass(scene, $camera)
		const sceneDepth = scenePass.getTextureNode('depth')

		// Material - Apply occlusion depth of volumetric lighting based on the scene depth

		volumetricMaterial.depthNode = sceneDepth.sample(screenUV)

		// Volumetric Lighting Pass

		const volumetricPass = pass(scene, $camera, { depthBuffer: false })
		volumetricPass.setLayers(volumetricLayer)
		volumetricPass.setResolutionScale(0.25)

		// Compose and Denoise

		const denoiseStrength = uniform(0.6)

		const blurredVolumetricPass = gaussianBlur(volumetricPass, denoiseStrength)

		const scenePassColor = scenePass.add(
			blurredVolumetricPass.mul(volumetricLightingIntensity)
		)

		postProcessing.outputNode = scenePassColor
	})

	//

	const numInstances = 200
	const mesh = new InstancedMesh(
		new OctahedronGeometry(1),
		new MeshStandardNodeMaterial({
			roughness: 0.05,
			color: 'white',
		}),
		numInstances
	)
	mesh.frustumCulled = false

	const cameraMatrix = new Matrix4()
		.makeRotationX(0.005)
		.multiply(new Matrix4().makeRotationY(0.005))
		.multiply(new Matrix4().makeRotationZ(0.005))
	const matrix = new Matrix4()

	let index = 0

	// Total voxels inside a cube of radius r (side = 2r+1)
	const cubeCount = (r: number) => {
		const s = 2 * r + 1
		return s * s * s
	}

	// Map k (0..perim-1) to a point on the perimeter of an s×s square at radius r (no duplicates)
	const perimeterXY = (k: number, r: number) => {
		const s = 2 * r + 1

		// top edge: y = +r, x = -r..+r   (length s)
		if (k < s) return { x: -r + k, y: r }
		k -= s

		// right edge: x = +r, y = r-1..-r  (length s-1)
		if (k < s - 1) return { x: r, y: r - 1 - k }
		k -= s - 1

		// bottom edge: y = -r, x = r-1..-r  (length s-1)
		if (k < s - 1) return { x: r - 1 - k, y: -r }
		k -= s - 1

		// left edge: x = -r, y = -r+1..r-1 (length s-2)
		return { x: -r, y: -r + 1 + k }
	}

	const cubeTranslation = (index_: number, n: number) => {
		// Find the smallest r such that (2r+1)^3 > index_
		let r = Math.ceil((Math.cbrt(index_ + 1) - 1) / 2)
		if (r < 0) r = 0

		// Fix any floating rounding edge cases
		while (cubeCount(r) <= index_) r++
		while (r > 0 && cubeCount(r - 1) > index_) r--

		// Offset within this shell
		const prev = r === 0 ? 0 : cubeCount(r - 1)
		let offset = index_ - prev

		let x = 0,
			y = 0,
			z = 0

		if (r === 0) {
			// center voxel
			x = 0
			y = 0
			z = 0
		} else {
			const s = 2 * r + 1

			// Shell enumeration order:
			// 1) top face z=+r (all s*s)
			// 2) middle slices z=+r-1 .. -r+1 (perimeter only)
			// 3) bottom face z=-r (all s*s)

			const topCount = s * s
			if (offset < topCount) {
				z = r
				x = (offset % s) - r
				y = ((offset / s) | 0) - r
			} else {
				offset -= topCount

				const perim = 8 * r // perimeter points per middle slice
				const midSlices = s - 2 // number of middle z slices
				const midCount = midSlices * perim

				if (offset < midCount) {
					const slice = (offset / perim) | 0
					const inSlice = offset - slice * perim

					z = r - 1 - slice
					const p = perimeterXY(inSlice, r)
					x = p.x
					y = p.y
				} else {
					offset -= midCount
					z = -r
					x = (offset % s) - r
					y = ((offset / s) | 0) - r
				}
			}
		}

		matrix.makeTranslation(x * n, y * n, z * n)
	}

	const color = new Color().setHSL(Math.random(), 0.8, 1)

	while (index < numInstances) {
		cubeTranslation(index, 1)
		mesh.setMatrixAt(index, matrix)

		index += 1
	}

	let x = 0
	let colorIndex = 0
	let colorIndex2 = 0

	useTask((dt) => {
		x += dt
		camera.current.applyMatrix4(cameraMatrix)

		for (let index = 0; index < numInstances; index += 1) {
			cubeTranslation(
				index,
				1 + (Math.sin(x) * 0.01 * analyser.logSmooth01[32]) / 30
			)
			mesh.setMatrixAt(index, matrix)
		}

		mesh.instanceMatrix.needsUpdate = true

		if (analyser.level >= 0.3) {
			const newColor = hueShift(color, colorIndex2)
			mesh.setColorAt(colorIndex, newColor)
			colorIndex += 1
			colorIndex2 += 10
			colorIndex %= numInstances
		}

		if (mesh.instanceColor) {
			mesh.instanceColor.needsUpdate = true
		}
	})

	useTask(
		() => {
			postProcessing.render()
		},
		{ stage: renderStage }
	)
</script>

<T.PerspectiveCamera
	makeDefault
	position.y={1}
	position.z={10}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight
	intensity={1}
	position={[0, 3, 0]}
/>
<T.DirectionalLight
	intensity={0.5}
	position={[0, 3, 2]}
/>
<T.DirectionalLight
	intensity={0.25}
	position={[2, 1, 2]}
/>

<T is={mesh} />

<T is={rectLight1}></T>
<T is={rectLight2}></T>
<T is={rectLight3}></T>

<T is={volumetricMesh}></T>
