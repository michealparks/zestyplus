<script lang="ts">
	import { Color } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Text, Outlines } from '@threlte/extras'
	import { useTrack, useAnalyser } from '$lib'

	const { size } = useThrelte()
	const { track } = useTrack()
	const { frequencyData } = useAnalyser()

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
		for (let i = 0, l = frequencyData.current.length / 2; i < l; i += 1) {
			let barHeight = frequencyData.current[i]
			positions[i][2] = barHeight / 75
		}
	})

	const color = new Color()
</script>

<T.OrthographicCamera
	makeDefault
	position={[-28, 60, 65]}
	zoom={$size.width / 30}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={0.25} />

<T.DirectionalLight
	castShadow
	shadow.camera.left={-15}
	shadow.camera.right={15}
	shadow.camera.top={15}
	shadow.camera.bottom={-15}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	intensity={2}
	position={[10, 10, 10]}
/>

<T.Mesh
	rotation.x={-Math.PI / 2}
	position.y={-0.02}
	receiveShadow
>
	<T.PlaneGeometry args={[50, 50]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>

{#each positions as position, index}
	<T.Mesh
		position.x={position[0]}
		position.z={position[1]}
		position.y={position[2]}
		scale.y={position[2] * 4 + 1}
		castShadow
		receiveShadow
	>
		<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
		<T.MeshStandardMaterial color={color.setRGB(index / 10, index / 100, 0)} />
		<Outlines color="black" />
	</T.Mesh>
{/each}

<Text
	text={track.current?.item.name ?? ''}
	color="black"
	scale={10}
	rotation.x={-Math.PI / 2}
	position.x={-8}
	position.z={8}
/>

<Text
	text={track.current?.item.artists[0].name ?? ''}
	color="black"
	scale={6}
	rotation.x={-Math.PI / 2}
	position.x={-8}
	position.z={9.5}
/>
