<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { useGltf, Float } from '@threlte/extras'
	import { Group, Fog, RectAreaLightNode, Object3D } from 'three/webgpu'
	import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'
	import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js'
	import { useAnalyser } from '$lib'

	RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())

	let debug = false

	const analyser = useAnalyser()
	const { scene } = useThrelte()

	$effect(() => {
		scene.fog = new Fog('black')
		scene.fog.near = 80
		scene.fog.far = 200
		return () => (scene.fog = null)
	})

	const trainRoot = new Group()
	const spotLightTarget = new Group()
	const directionalLightTarget = new Group()

	const trainHeadGLTF = useGltf('/glb/HighSpeed_Front.glb')
	const trainCarGLTF = useGltf('/glb/HighSpeed_Wagon.glb')
	const trackGLTF = useGltf('/glb/RailwayTrack_Straight.glb')
	const tree1GLTF = useGltf('/glb/Tree_1.glb')

	const trainHead = $derived($trainHeadGLTF?.scene)
	const trainCar = $derived($trainCarGLTF?.scene)
	const track = $derived($trackGLTF?.scene)
	const tree1 = $derived($tree1GLTF?.scene)

	const numTracks = 15
	const numCars = 7

	const tracks = $derived(
		track
			? Array.from({ length: numTracks }).map(() => track.clone())
			: undefined
	)
	const trainCars = $derived(
		trainCar
			? Array.from({ length: numCars }).map(() => trainCar.clone())
			: undefined
	)
	const trees1 = $derived(
		tree1 ? Array.from({ length: 40 }).map(() => tree1.clone()) : undefined
	)

	let currentIndex = 0
	let currentPosition = -18

	let treeCurrentIndex = 0
	let treeCurrentPosition = -32

	const setCastShadow = (obj: Object3D) => {
		obj.castShadow = true
		obj.receiveShadow = true
	}

	const backSideChance = 1 / 3

	const placeTree = (tree: Object3D, x: number) => {
		tree.position.x = x

		// Back side = mostly out of camera (positive z)
		// Camera-facing side = in front of camera (negative z)
		const isBackSide = Math.random() < backSideChance

		if (isBackSide) {
			// 👈 other side of the track (behind it, mostly off-camera)
			// small band close to the track
			const minDist = 5
			const maxDist = 20
			const dist = minDist + Math.random() * (maxDist - minDist)
			tree.position.z = dist // +z = back side
		} else {
			// 👈 camera side: keep them more spread out & further out
			const minDist = 20
			const maxDist = 90
			const dist = minDist + Math.random() * (maxDist - minDist)
			tree.position.z = -dist // -z = toward camera
		}

		tree.scale.setScalar(Math.random() * 0.25 + 0.75)
		tree.rotation.y = Math.random() * 2 * Math.PI
	}

	$effect(() => {
		trainHead?.traverse(setCastShadow)
	})

	$effect(() => {
		if (trainCars) {
			let i = 11.5
			for (const car of trainCars) {
				car.position.x = i
				i += 11.5

				car.traverse(setCastShadow)
			}
		}
	})

	$effect(() => {
		if (tracks) {
			let i = -18
			for (const track of tracks) {
				track.position.x = i
				i += 18

				track.traverse(setCastShadow)
			}

			currentIndex = tracks.length
		}
	})

	$effect(() => {
		if (trees1) {
			let i = -32

			for (const tree of trees1) {
				placeTree(tree, i)
				i += 18

				tree.traverse(setCastShadow)
			}

			treeCurrentIndex = trees1.length
			treeCurrentPosition = -32
		}
	})

	const bufferSpace = 10
	const trainSpeed = 50

	useTask((dt) => {
		trainRoot.position.x -= dt * trainSpeed
	})

	useTask(() => {
		if (!tracks) {
			return
		}

		const { x } = trainRoot.position

		if (x < currentPosition + bufferSpace) {
			currentIndex -= 1
			currentPosition -= 18

			tracks[currentIndex].position.x = currentPosition

			if (currentIndex === 0) {
				currentIndex = tracks.length
			}
		}
	})

	useTask(() => {
		if (!trees1) return

		const { x } = trainRoot.position

		if (x < treeCurrentPosition + bufferSpace) {
			treeCurrentIndex -= 1
			treeCurrentPosition -= 18

			const tree = trees1[treeCurrentIndex]

			// 👇 reuse the same placement logic as initialization
			placeTree(tree, treeCurrentPosition)

			if (treeCurrentIndex === 0) {
				treeCurrentIndex = trees1.length
			}
		}
	})

	const loudness = $state(
		Array.from({ length: numCars + 1 }).fill(0) as number[]
	)

	useTask(() => {
		for (let i = 0, j = 0, l = loudness.length; i < l; i += 1, j += 2) {
			loudness[i] = analyser.spectrum01[j]
		}
	})
</script>

<T is={trainRoot}>
	{#each { length: numCars + 1 }, index}
		<T.RectAreaLight
			width={6.8}
			height={0.3}
			color="#FFD700"
			intensity={150 * loudness[index]}
			position={[0.75 + index * 11.3, 1, 1.02]}
			oncreate={(ref) => {
				ref.lookAt(0.75 + index * 11.3, 1, -2)
			}}
		>
			{#snippet children({ ref })}
				{#if debug}
					<T
						is={RectAreaLightHelper}
						args={[ref]}
					/>
				{/if}
			{/snippet}
		</T.RectAreaLight>
	{/each}

	<T.AmbientLight intensity={0.2} />

	<T
		is={directionalLightTarget}
		position={[0, 1, 0]}
	/>
	<T.DirectionalLight
		intensity={1}
		castShadow
		color="#FFF8DE"
		position={[-5, 8, 5]}
		shadow.camera.left={-50}
		shadow.camera.right={50}
		shadow.camera.top={50}
		shadow.camera.bottom={-50}
		shadow.mapSize.width={8192}
		shadow.mapSize.height={8192}
		target={directionalLightTarget}
	>
		{#snippet children({ ref })}
			{#if debug}
				<T.DirectionalLightHelper
					attach={scene}
					args={[ref]}
					oncreate={(helper) => {
						requestAnimationFrame(function frame() {
							requestAnimationFrame(frame)
							helper.update()
						})
					}}
				/>

				<T.CameraHelper
					attach={scene}
					args={[ref.shadow.camera]}
				/>
			{/if}
		{/snippet}
	</T.DirectionalLight>

	<T
		is={spotLightTarget}
		position={[-20, 1, 0]}
	/>
	<T.SpotLight
		castShadow
		color="#FFD700"
		penumbra={0.9}
		position={[-5, 1, 0]}
		intensity={20}
		angle={Math.PI / 4}
		target={spotLightTarget}
	>
		{#snippet children({ ref })}
			{#if debug}
				<T.SpotLightHelper
					args={[ref]}
					attach={scene}
					oncreate={(helper) => {
						requestAnimationFrame(function frame() {
							requestAnimationFrame(frame)
							helper.update()
						})
					}}
				/>
			{/if}
		{/snippet}
	</T.SpotLight>

	<Float
		floatIntensity={3}
		speed={2}
		rotationIntensity={0.3}
		rotationSpeed={2}
	>
		<T.PerspectiveCamera
			makeDefault
			position={[-15, 5, 15]}
			oncreate={(ref) => {
				ref.lookAt(0, 0, 0)
			}}
		></T.PerspectiveCamera>
	</Float>

	{#if trainHead}
		<T is={trainHead} />
	{/if}

	{#if trainCars}
		{#each trainCars as trainCar (trainCar.uuid)}
			<Float
				floatIntensity={0.01}
				speed={50}
				rotationIntensity={0.001}
				rotationSpeed={20}
			>
				<T is={trainCar}></T>
			</Float>
		{/each}
	{/if}
</T>

{#if tracks}
	{#each tracks as track (track.uuid)}
		<T is={track} />
	{/each}
{/if}

{#if trees1}
	{#each trees1 as tree (tree.id)}
		<T is={tree} />
	{/each}
{/if}

<T.Mesh position={[0, -0.2, 0]}>
	<T.BoxGeometry args={[10_000, 0.1, 200]} />
	<T.MeshToonMaterial color="#222" />
</T.Mesh>
