<script lang="ts">
	import {
		Color,
		InstancedMesh,
		Matrix4,
		Quaternion,
		Vector3,
		PostProcessing,
		MeshToonNodeMaterial,
	} from 'three/webgpu'
	import { toonOutlinePass } from 'three/tsl'

	import { T, useTask, useThrelte } from '@threlte/core'
	import { useAnalyser, hueShift } from '$lib'
	import { WebGPURenderer } from 'three/src/Three.WebGPU.Nodes.js'
	import Reflection from '$lib/components/Reflection.svelte'

	const { renderer, scene, camera, renderMode } = useThrelte<WebGPURenderer>()
	const postProcessing = new PostProcessing(renderer)

	$effect(() => {
		postProcessing.outputNode = toonOutlinePass(scene, $camera)
	})

	$effect(() => {
		renderMode.set('manual')
		return () => renderMode.set('always')
	})

	useTask(() => {
		postProcessing.render()
	})

	const { size } = useThrelte()
	const analyser = useAnalyser()

	const count = 20
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
		for (let i = 0, l = analyser.log01.length; i < l; i += 1) {
			const barHeight = analyser.log01[i]

			if (barHeight) {
				mesh.getMatrixAt(i, matrix)
				matrix.decompose(position, quaternion, scale)
				position.y = barHeight * 10
				scale.set(1, position.y * 4 + 1, 1)
				matrix.compose(position, quaternion, scale)
				mesh.setMatrixAt(i, matrix)
			}
		}
		mesh.instanceMatrix.needsUpdate = true
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-28, 60, 65]}
	zoom={$size.width / 400}
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

<T
	is={mesh}
	castShadow
	receiveShadow
>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T is={MeshToonNodeMaterial} />
</T>

<Reflection />
