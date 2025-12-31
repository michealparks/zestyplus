<script lang="ts">
	import {
		BoxGeometry,
		Color,
		DirectionalLight,
		InstancedMesh,
		Matrix4,
		Quaternion,
		Vector3,
		Fog,
	} from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { hueShift, useAnalyser } from '$lib'
	import Lightformer from '$lib/components/Lightformer.svelte'

	const { camera, scene } = useThrelte()

	$effect(() => {
		scene.fog = new Fog('#000', 2, 30)
		return () => (scene.fog = null)
	})

	const numCubes = 1000

	const mesh = new InstancedMesh(undefined, undefined, numCubes)
	mesh.name = 'cubes'
	mesh.frustumCulled = false
	mesh.castShadow = mesh.receiveShadow = true

	const outlines = new InstancedMesh(undefined, undefined, numCubes)
	outlines.frustumCulled = false

	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)
	const matrix = new Matrix4()

	const analyser = useAnalyser()

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

			outlines.setMatrixAt(index, matrix)
		}

		if (mesh.instanceColor) {
			mesh.instanceColor.needsUpdate = true
		}

		mesh.instanceMatrix.needsUpdate = true
	})

	const light = new DirectionalLight()
	scene.add(light.target)

	useTask((delta) => {
		camera.current.position.z -= delta * 12

		for (let index = 0; index < numCubes; index += 1) {
			mesh.getMatrixAt(index, matrix)
			matrix.decompose(position, quaternion, scale)

			const ftt = analyser.log01[index % 128]
			scale.setScalar(Math.max(ftt * 4, 0.5))

			mesh.setColorAt(index, hueShift(color.set(hex), ftt))

			if (position.z > camera.current.position.z) {
				position.z = -j / 2
				j += 1
			}

			matrix.compose(position, quaternion, scale)
			mesh.setMatrixAt(index, matrix)
			outlines.setMatrixAt(index, matrix)
		}

		if (mesh.instanceColor) {
			mesh.instanceColor.needsUpdate = true
		}

		mesh.instanceMatrix.needsUpdate = true
		outlines.instanceMatrix.needsUpdate = true
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
	<T.BoxGeometry />
	<T.MeshStandardMaterial roughness={0.05} />
</T>

<T is={outlines}>
	<T.EdgesGeometry args={[new BoxGeometry(), 1]} />
	<T.MeshBasicMaterial wireframe />
</T>

<Lightformer />
