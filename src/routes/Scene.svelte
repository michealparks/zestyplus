<script lang="ts">
	import { Color } from 'three'
	import { analyserData } from '$lib/visualizer'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { InstancedMesh, Instance, Text } from '@threlte/extras'

	let { song, artist } = $props()

	const { size } = useThrelte()

	const count = 16
	const gap = 1
	const offset = (count * gap) / 2

	const positions: [number, number, number][] = $state([])
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			positions.push([i * gap - offset, j * gap - offset, 0])
		}
	}

	useTask(() => {
		for (let i = 0, l = analyserData.current.length; i < l; i += 1) {
			let barHeight = analyserData.current[i]
			positions[i][2] = barHeight / 100
		}
	})
</script>

<T.OrthographicCamera
	makeDefault
	position={[50, 50, 50]}
	zoom={$size.width / 30}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={0.25} />
<T.DirectionalLight intensity={2} />

<InstancedMesh>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T.MeshStandardMaterial color="white" />
	{#each positions as position, index}
		<Instance
			position.x={position[0]}
			position.z={position[1]}
			position.y={position[2]}
			scale.y={position[2] * 3 + 1}
			color={new Color().setRGB(index / 10, index / 100, 0)}
		/>
	{/each}
</InstancedMesh>

<Text
	text={song}
	color="black"
	scale={10}
	rotation.x={-Math.PI / 2}
	position.x={-2.5}
	position.z={8}
/>
<Text
	text={artist}
	color="black"
	scale={10}
	rotation.x={-Math.PI / 2}
	position.x={-2.5}
	position.z={9.5}
/>
