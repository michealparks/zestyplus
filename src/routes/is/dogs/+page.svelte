<script lang="ts">
	import { Mesh } from 'three'
	import { T } from '@threlte/core'
	import { useGltf, OrbitControls } from '@threlte/extras'
	import { Collider, RigidBody } from '@threlte/rapier'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	const count = 15

	let nodes: Mesh[] = $state([])
	let timeoutIds = new Set<number>()

	useGltf('/hotdog.glb').then((dog) => {
		nodes.push(
			dog.nodes['Object_2'],
			dog.nodes['Object_3'],
			dog.nodes['Object_4'],
			dog.nodes['Object_5'],
			dog.nodes['Object_6']
		)
	})

	const reset = (rigidbody: RapierRigidBody) => {
		rigidbody.setLinvel({ x: 0, y: 0, z: 0 }, true)
		rigidbody.setAngvel(
			{
				x: (Math.random() - 0.5) * 2,
				y: (Math.random() - 0.5) * 2,
				z: (Math.random() - 0.5) * 2,
			},
			true
		)
		rigidbody.setTranslation(
			{
				x: (Math.random() - 0.5) * 7,
				y: 10,
				z: Math.random() - 0.5,
			},
			true
		)
	}

	$effect(() => {
		return () => {
			for (const id of timeoutIds) {
				clearTimeout(id)
			}
		}
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={10}
>
	<OrbitControls />
</T.PerspectiveCamera>

{#if nodes.length > 0}
	{#each { length: count }, index}
		<RigidBody
			type="dynamic"
			oncreate={(ref) => {
				ref.setTranslation({ x: 0, y: -20, z: 0 }, true)
				timeoutIds.add(setTimeout(() => reset(ref), index * 1000))
			}}
		>
			<Collider
				shape={'cuboid'}
				args={[0.5, 0.5, 0.5]}
			/>
			<T.Group scale={0.0015}>
				{#each nodes as node (node.uuid)}
					<T is={node.clone(true)} />
				{/each}
			</T.Group>
		</RigidBody>
	{/each}
{/if}

<T.Group position.y={-15}>
	<Collider
		shape="cuboid"
		sensor
		args={[100, 5, 100]}
		onsensorenter={(event) => {
			if (event.targetRigidBody) {
				reset(event.targetRigidBody)
			}
		}}
	/>
</T.Group>
