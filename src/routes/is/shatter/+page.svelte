<script lang="ts">
	import {
		BoxGeometry,
		Color,
		DirectionalLight,
		Fog,
		Mesh,
		MeshStandardMaterial,
	} from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { AutoColliders, RigidBody, World } from '@threlte/rapier'

	import Breakable from '$lib/components/Breakable.svelte'
	import Lightformer from '$lib/components/Lightformer.svelte'
	import { hueShift, useAnalyser } from '$lib'
	import { lerp } from 'three/src/math/MathUtils.js'

	const { scene } = useThrelte()
	const { frequencyData } = useAnalyser()

	const create = () => {
		const material = new MeshStandardMaterial()
		material.roughness = 0.1
		const geometry = new BoxGeometry()
		const mesh = new Mesh(geometry, material)
		mesh.castShadow = mesh.receiveShadow = true
		mesh.position.y = 3

		return mesh
	}

	let breakables: Mesh[] = $state([create()])

	$effect(() => {
		const id = setInterval(() => breakables.push(create()), 20_000)
		return () => clearInterval(id)
	})

	$effect(() => {
		scene.fog = new Fog('#000', 2, 10)
		return () => (scene.fog = null)
	})

	let c = new Color('#FF4F4F')

	let color1 = $state()

	const light = new DirectionalLight()

	useTask((dt) => {
		const i = frequencyData.current[16] / 200
		light.intensity = Math.min(1, Math.max(lerp(i, 0, 2 * dt), 0.5))
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.y={1}
	position.z={5}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T
	is={light}
	intensity={0.5}
	position={[1, 1, 1]}
	castShadow
/>

<World gravity={[0, -1, 0]}>
	{#each breakables as mesh}
		<Breakable
			{mesh}
			minBreakForce={0.1}
			maxDepth={2}
		/>
	{/each}

	<RigidBody type="fixed">
		<AutoColliders shape="cuboid">
			<T.Mesh
				position.y={-1}
				receiveShadow
			>
				<T.BoxGeometry args={[20, 0.1, 20]} />
				<T.MeshStandardMaterial roughness={0.1} />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>
</World>

<Lightformer />
