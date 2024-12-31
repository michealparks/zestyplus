<script lang="ts">
	import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
	import { T } from '@threlte/core'
	import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier'

	import Breakable from '$lib/components/Breakable.svelte'

	const { world } = useRapier()

	$effect(() => {
		let oldGravity = world.gravity.y
		world.gravity.y = 0
		return () => (world.gravity.y = oldGravity)
	})

	const create = () => {
		const material = new MeshStandardMaterial()
		const geometry = new BoxGeometry()
		const mesh = new Mesh(geometry, material)
		mesh.position.y = 3
		mesh.rotation.x = Math.PI / 4 + Math.random()
		mesh.rotation.z = Math.PI / 4 + Math.random()

		return mesh
	}

	let breakables: Mesh[] = $state([create()])

	$effect(() => {
		const id = setInterval(() => breakables.push(create()), 5000)
		return () => clearInterval(id)
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.y={1}
	position.z={5}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.DirectionalLight />

{#each breakables as mesh}
	<Breakable
		{mesh}
		minBreakForce={0}
		maxDepth={2}
		oncreate={(ref) => {
			console.log('hi')
			ref.applyImpulse({ x: 0, y: -4, z: 0 }, true)
		}}
	/>
{/each}

<RigidBody type="fixed">
	<AutoColliders shape="cuboid">
		<T.Mesh position.y={-1}>
			<T.BoxGeometry args={[10, 0.1, 10]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</AutoColliders>
</RigidBody>
