<script lang="ts">
	import { Color } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Outlines } from '@threlte/extras'
	import { useAnalyser, hueShift } from '$lib'

	const { size } = useThrelte()
	const { frequencyData } = useAnalyser()

	const count = 48
	const gap = 1
	const offset = (count * gap) / 2

	let z

	const positions: [number, number, number][] = $state([])
	for (let i = 0; i < count; i++) {
		positions.push([0, i * gap - offset, 0])
	}

	useTask(() => {
		for (let i = 0, l = count; i < l; i += 1) {
			let barHeight = frequencyData.current[i]
			positions[i][2] = barHeight / 75
		}
	})

	const color = new Color('red')
</script>

<T.OrthographicCamera
	makeDefault
	position={[-28, 60, 65]}
	zoom={$size.width / 50}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight
	castShadow
	shadow.camera.left={-15}
	shadow.camera.right={15}
	shadow.camera.top={15}
	shadow.camera.bottom={-15}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	intensity={3}
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
		<T.MeshStandardMaterial color={hueShift(color, index / 10000)} />
		<Outlines color="black" />
	</T.Mesh>
{/each}
