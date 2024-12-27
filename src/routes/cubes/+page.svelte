<script lang="ts">
	import {
		BoxGeometry,
		InstancedMesh,
		Matrix4,
		MeshStandardMaterial,
		Quaternion,
		Vector3,
	} from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { useAnalyser } from '$lib'
	import { RoundedBoxGeometry } from '@threlte/extras'

	const { camera } = useThrelte()

	const numCubes = 1000
	const geometry = new BoxGeometry()
	const material = new MeshStandardMaterial()
	const mesh = new InstancedMesh(undefined, material, numCubes)
	mesh.name = 'cubes'
	mesh.frustumCulled = false
	mesh.castShadow = true
	mesh.receiveShadow = true

	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)
	const matrix = new Matrix4()

	const { frequencyData } = useAnalyser()

	let j = numCubes - 1

	$effect(() => {
		for (let index = 0; index < numCubes; index += 1) {
			const a = (Math.random() - 0.5) * 5
			const b = a > 0 ? 2 : -2
			const c = (Math.random() - 0.5) * 10

			position.set(a * 2 + b, c, -index / 2)
			quaternion.random()
			matrix.compose(position, quaternion, scale)
			mesh.setMatrixAt(index, matrix)
		}
		mesh.instanceMatrix.needsUpdate = true
	})

	useTask((delta) => {
		camera.current.position.z -= delta * 20

		for (let index = 0; index < numCubes; index += 1) {
			mesh.getMatrixAt(index, matrix)
			matrix.decompose(position, quaternion, scale)

			const ftt = frequencyData.current[index % 32]
			scale.setScalar(Math.max(ftt / 100, 0.5))

			if (position.z > camera.current.position.z) {
				position.z = -j / 2
				j += 1
			}

			matrix.compose(position, quaternion, scale)
			mesh.setMatrixAt(index, matrix)
		}

		mesh.instanceMatrix.needsUpdate = true
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0.5, 5]}
	oncreate={(ref) => ref.lookAt(0, 0, 0.1)}
/>

<T.DirectionalLight castShadow />
<T.AmbientLight />

<T is={mesh}>
	<RoundedBoxGeometry />
</T>
