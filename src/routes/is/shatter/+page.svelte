<script lang="ts">
	import {
		BoxGeometry,
		Color,
		DirectionalLight,
		Fog,
		Mesh,
		MeshStandardMaterial,
		MeshStandardNodeMaterial,
	} from 'three/webgpu'
	import { injectPlugin, T, useTask, useThrelte } from '@threlte/core'
	import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier'

	import Breakable from '$lib/components/Breakable.svelte'
	import { useAnalyser } from '$lib'
	import { lerp } from 'three/src/math/MathUtils.js'
	import Reflection from '$lib/components/Reflection.svelte'

	const { scene } = useThrelte()
	const { world } = useRapier()
	const analyser = useAnalyser()

	const create = () => {
		const material = new MeshStandardNodeMaterial()
		material.roughness = 0
		const geometry = new BoxGeometry()
		const mesh = new Mesh(geometry, material)
		mesh.castShadow = mesh.receiveShadow = true
		mesh.visible = false

		mesh.quaternion.random()
		return mesh
	}

	let breakables = $state<Mesh[]>([create()])

	$effect(() => {
		const { y } = world.gravity
		world.gravity.y = 0
		return () => (world.gravity.y = y)
	})

	$effect(() => {
		scene.fog = new Fog('#000', 2, 20)
		return () => (scene.fog = null)
	})

	const light = new DirectionalLight()

	// useTask((dt) => {
	// 	const i = analyser.logSmooth01[32]
	// 	light.intensity = Math.min(1, Math.max(lerp(i, 0, 2 * dt), 0.5))
	// })

	let time = performance.now()
	let lastBreakTime = performance.now()

	const color = new Color()
	useTask((dt) => {
		time += dt

		if (analyser.level > 0.012 && time - lastBreakTime > 2) {
			lastBreakTime = time
			breakables.push(create())

			if (breakables.length > 10) {
				breakables.shift()
			}
		}

		if (analyser.level > 0.002) {
			const arr = [...meshes]

			const l = arr.length
			const mesh = arr[(Math.random() * l) | 0]
			if (mesh) {
				const material = mesh.material as MeshStandardMaterial
				color.setHSL(Math.random(), 1, 0.4)
				material.color.set(color)
			}
		}
	})

	const meshes = new Set<Mesh>()

	injectPlugin('color', (args) => {
		if (!args.ref.isMesh) return

		$effect(() => {
			meshes.add(args.ref)
			return () => meshes.delete(args.ref)
		})
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.y={1}
	position.z={10}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T
	is={light}
	intensity={3}
	position={[5, 5, 5]}
	castShadow
	shadow.camera.left={-5}
	shadow.camera.right={5}
	shadow.camera.top={5}
	shadow.camera.bottom={-5}
	shadow.mapSize.width={4096}
	shadow.mapSize.height={4096}
/>
<T.AmbientLight intensity={0.1} />

{#each breakables as mesh (mesh.uuid)}
	<Breakable
		{mesh}
		autoBreak
		minBreakForce={0.0}
		maxDepth={2}
		castShadow
		receiveShadow
	/>
{/each}

<RigidBody type="fixed">
	<AutoColliders shape="cuboid">
		<T.Mesh visible={false}>
			<T.BoxGeometry args={[0.05, 0.05, 0.05]} />
		</T.Mesh>
	</AutoColliders>
</RigidBody>

<!-- <RigidBody type="fixed">
	<AutoColliders shape="cuboid">
		<Reflection />
	</AutoColliders>
</RigidBody> -->
