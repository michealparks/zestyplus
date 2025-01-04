<script lang="ts">
	import {
		BoxGeometry,
		Color,
		DirectionalLight,
		InstancedMesh,
		Matrix4,
		MeshStandardMaterial,
		Quaternion,
		Vector3,
	} from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { hueShift, useAnalyser } from '$lib'
	import { RoundedBoxGeometry, Stars } from '@threlte/extras'
	import Lightformer from '$lib/components/Lightformer.svelte'

	const { camera, scene } = useThrelte()

	const numCubes = 1000

	const mesh = new InstancedMesh(undefined, undefined, numCubes)
	mesh.name = 'cubes'
	mesh.frustumCulled = false
	mesh.castShadow = mesh.receiveShadow = true

	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)
	const matrix = new Matrix4()

	const { frequencyData } = useAnalyser()

	let j = numCubes - 1

	const hex = '#C84C09'
	const color = new Color(hex)

	$effect(() => {
		for (let index = 0; index < numCubes; index += 1) {
			const a = (Math.random() - 0.5) * 5
			const b = a > 0 ? 2 : -2
			const c = (Math.random() - 0.5) * 10

			position.set(a * 2 + b, c, -index / 2)
			quaternion.random()
			matrix.compose(position, quaternion, scale)
			mesh.setMatrixAt(index, matrix)
			mesh.setColorAt(index, hueShift(color, 0))
		}
		if (mesh.instanceColor) {
			mesh.instanceColor.needsUpdate = true
		}
		mesh.instanceMatrix.needsUpdate = true
	})

	const light = new DirectionalLight()
	scene.add(light.target)

	let stars

	useTask((delta) => {
		camera.current.position.z -= delta * 20

		if (stars) {
			stars.position.z = camera.current.position.z
			light.position.z = camera.current.position.z + 2

			light.target.position.copy(camera.current.position)
		}

		for (let index = 0; index < numCubes; index += 1) {
			mesh.getMatrixAt(index, matrix)
			matrix.decompose(position, quaternion, scale)

			const ftt = frequencyData.current[index % 32]
			scale.setScalar(Math.max(ftt / 100, 0.5))

			mesh.setColorAt(index, hueShift(color.set(hex), ftt / 1000))

			if (position.z > camera.current.position.z) {
				position.z = -j / 2
				j += 1
			}

			matrix.compose(position, quaternion, scale)
			mesh.setMatrixAt(index, matrix)
		}

		if (mesh.instanceColor) {
			mesh.instanceColor.needsUpdate = true
		}

		mesh.instanceMatrix.needsUpdate = true
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0.5, 5]}
	oncreate={(ref) => ref.lookAt(0, 0, 0.1)}
/>

<T
	is={light}
	castShadow
	position.x={2}
	position.y={2}
	intensity={0.5}
/>
<T.AmbientLight intensity={0.5} />

<T is={mesh}>
	<RoundedBoxGeometry />
	<T.MeshStandardMaterial roughness={0.05} />
</T>

<Lightformer />

<Stars bind:ref={stars} />
