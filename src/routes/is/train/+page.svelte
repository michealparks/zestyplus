<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { useGltf, Float } from '@threlte/extras'

	const trainHeadGLTF = useGltf('/glb/HighSpeed_Front.glb')
	const trainCarGLTF = useGltf('/glb/HighSpeed_Wagon.glb')
	const trackGLTF = useGltf('/glb/RailwayTrack_Straight.glb')

	const trainHead = $derived($trainHeadGLTF?.scene)
	const trainCar = $derived($trainCarGLTF?.scene)
	const track = $derived($trackGLTF?.scene)

	const tracks = $derived(
		track ? Array.from({ length: 15 }).map(() => track.clone()) : undefined
	)
	const trainCars = $derived(
		trainCar ? Array.from({ length: 4 }).map(() => trainCar.clone()) : undefined
	)

	let currentIndex = 0
	let currentPosition = -18

	$effect(() => {
		if (trainCars) {
			let i = 11.5
			for (const car of trainCars) {
				car.position.x = i
				i += 11.5
			}
		}
	})

	$effect(() => {
		if (tracks) {
			let i = -18
			for (const track of tracks) {
				track.position.x = i
				i += 18
			}

			currentIndex = tracks.length
		}
	})

	const bufferSpace = 10
	const trainSpeed = 15

	useTask((dt) => {
		if (!trainHead || !tracks) {
			return
		}

		const { x } = trainHead.position
		trainHead.position.x -= dt * trainSpeed

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

<T.DirectionalLight
	castShadow
	position={[5, 5, 5]}
/>
<T.AmbientLight />

{#if trainHead}
	<T
		is={trainHead}
		castShadow
		receiveShadow
	>
		<Float>
			<T.PerspectiveCamera
				makeDefault
				position={[-15, 5, 15]}
				oncreate={(ref) => {
					ref.lookAt(0, 0, 0)
				}}
			></T.PerspectiveCamera>
		</Float>

		{#if trainCars}
			{#each trainCars as trainCar (trainCar.uuid)}
				<T
					is={trainCar}
					castShadow
					receiveShadow
				/>
			{/each}
		{/if}
	</T>
{/if}

{#if tracks}
	{#each tracks as track (track?.uuid)}
		<T is={track} />
	{/each}
{/if}

<T.Mesh position={[0, -0.2, 0]}>
	<T.BoxGeometry args={[500, 0.1, 600]} />
	<T.MeshToonMaterial color="blue" />
</T.Mesh>
