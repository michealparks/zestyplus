<script lang="ts">
	import { Color, InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Outlines } from '@threlte/extras'
	import { useAnalyser, hueShift } from '$lib'

	const { size } = useThrelte()
	const { frequencyData } = useAnalyser()

	const count = 16
	const gap = 1
	const offset = (count * gap) / 2

	const color = new Color('red')
	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)
	const matrix = new Matrix4()
	const mesh = new InstancedMesh(undefined, undefined, count * count)

	let index = 0
	for (let i = 0; i < count; i += 1) {
		for (let j = 0; j < count; j += 1) {
			position.set(i * gap - offset, 0, j * gap - offset)
			matrix.setPosition(position)
			mesh.setMatrixAt(index, matrix)
			mesh.setColorAt(index, hueShift(color, (i * j) / 10000))
			index += 1
		}
	}

	mesh.instanceMatrix.needsUpdate = true
	if (mesh.instanceColor) {
		mesh.instanceColor.needsUpdate = true
	}

	useTask(() => {
		for (let i = 0, l = frequencyData.current.length / 2; i < l; i += 1) {
			const barHeight = frequencyData.current[i]

			if (barHeight) {
				mesh.getMatrixAt(i, matrix)
				matrix.decompose(position, quaternion, scale)
				position.y = barHeight / 75
				scale.set(1, position.y * 4 + 1, 1)
				matrix.compose(position, quaternion, scale)
				mesh.setMatrixAt(i, matrix)
			}
		}
		mesh.instanceMatrix.needsUpdate = true
	})
</script>

<T.OrthographicCamera
	makeDefault
	position={[-28, 60, 65]}
	zoom={$size.width / 40}
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
	<T.PlaneGeometry args={[100, 100]} />
	<T.MeshStandardMaterial color="black" />
</T.Mesh>

<T
	is={mesh}
	castShadow
	receiveShadow
>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T.MeshStandardMaterial />
	<Outlines color="black" />
</T>
