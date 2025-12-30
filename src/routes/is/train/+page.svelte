<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { useGltf, Float } from '@threlte/extras'
	import {
		Group,
		Fog,
		RectAreaLightNode,
		Object3D,
		DirectionalLight,
	} from 'three/webgpu'
	import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

	import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js'

	RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())

	let debug = true

	const { scene } = useThrelte()

	$effect(() => {
		scene.fog = new Fog('black')
		scene.fog.far = 100
		scene.fog.near = 80
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

	const tracks = $derived(
		track ? Array.from({ length: 15 }).map(() => track.clone()) : undefined
	)
	const trainCars = $derived(
		trainCar ? Array.from({ length: 4 }).map(() => trainCar.clone()) : undefined
	)

	const trees1 = $derived(
		tree1 ? Array.from({ length: 20 }).map(() => tree1.clone()) : undefined
	)

	let currentIndex = 0
	let currentPosition = -18

	const setCastShadow = (obj: Object3D) => {
		obj.castShadow = true
		obj.receiveShadow = true
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
			let sign = 1

			for (const tree of trees1) {
				sign = -sign
				tree.position.x = i
				tree.position.z = (Math.random() + 0.2) * 100 * sign
				tree.scale.setScalar(Math.random() * 0.25 + 0.75)
				tree.rotation.y = Math.random() * 2 * Math.PI
				i += 18

				tree.traverse(setCastShadow)
			}
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
</script>

<T is={trainRoot}>
	<T.RectAreaLight
		width={6.8}
		height={0.3}
		color="#FFD700"
		intensity={20}
		position={[0.75, 1, 1.02]}
		oncreate={(ref) => {
			ref.lookAt(0.75, 1, -2)
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

	<T.AmbientLight intensity={0.05} />

	<T
		is={directionalLightTarget}
		position={[0, 1, 0]}
	/>
	<T.DirectionalLight
		intensity={1}
		castShadow
		position={[1, 1, 0]}
		target={directionalLightTarget}
	>
		{#snippet children({ ref })}
			{#if debug}
				<T.DirectionalLightHelper
					args={[ref]}
					oncreate={(helper) => {
						requestAnimationFrame(function frame() {
							requestAnimationFrame(frame)
							helper.update()
						})
					}}
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
				<T is={trainCar} />
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
	<T.MeshToonMaterial color="white" />
</T.Mesh>
