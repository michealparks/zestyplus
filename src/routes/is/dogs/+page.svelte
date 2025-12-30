<script lang="ts">
	import { T } from '@threlte/core'
	import { useGltf, OrbitControls } from '@threlte/extras'
	import { AutoColliders, Collider, Debug, RigidBody } from '@threlte/rapier'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { useAnalyser } from '$lib'
	import { useSettings } from '$lib/hooks/useSettings.svelte'
	import { untrack } from 'svelte'

	const { showCostco } = useSettings()
	const analyser = useAnalyser()

	$effect(() => {
		return untrack(() => {
			const lastValue = showCostco.current
			showCostco.current = true
			return () => {
				showCostco.current = lastValue
			}
		})
	})

	let timeoutIds = new Set<number>()

	const glb = useGltf('/glb/Costco.glb')

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

<T.AmbientLight />
<T.DirectionalLight />

<!-- <Debug /> -->

<T.PerspectiveCamera
	makeDefault
	position.z={10}
>
	<OrbitControls />
</T.PerspectiveCamera>

{#if $glb}
	{#each { length: 8 }}
		<RigidBody
			type="dynamic"
			oncreate={(ref) => {
				ref.setTranslation(
					{ x: (Math.random() - 0.5) * 2, y: -(Math.random() * 5) - 15, z: 0 },
					true
				)
			}}
		>
			<Collider
				shape="cuboid"
				args={[0.5, 1, 0.5]}
			/>

			<T is={$glb.nodes['HotDog'].clone()} />
		</RigidBody>
	{/each}

	{#each { length: 8 }}
		<RigidBody
			type="dynamic"
			oncreate={(ref) => {
				ref.setTranslation(
					{ x: (Math.random() - 0.5) * 2, y: -(Math.random() * 5) - 15, z: 0 },
					true
				)
			}}
		>
			<Collider
				shape="cuboid"
				args={[0.5, 0.5, 0.5]}
			/>

			<T is={$glb.nodes['Pizza'].clone()} />
		</RigidBody>
	{/each}

	{#each { length: 4 }}
		<RigidBody
			type="dynamic"
			oncreate={(ref) => {
				ref.setTranslation(
					{ x: (Math.random() - 0.5) * 2, y: -(Math.random() * 5) - 15, z: 0 },
					true
				)
			}}
		>
			<Collider
				shape="cuboid"
				args={[0.5, 0.5, 0.5]}
			/>

			<T is={$glb.nodes['Water'].clone()} />
		</RigidBody>
	{/each}

	{#each { length: 4 }}
		<RigidBody
			type="dynamic"
			oncreate={(ref) => {
				ref.setTranslation(
					{ x: (Math.random() - 0.5) * 2, y: -(Math.random() * 5) - 15, z: 0 },
					true
				)
			}}
		>
			<Collider
				shape="cuboid"
				args={[0.5, 0.5, 0.5]}
			/>

			<T is={$glb.nodes['Pepsi'].clone()} />
		</RigidBody>
	{/each}
{/if}

<T.Group position.y={-18}>
	<Collider
		shape="cuboid"
		sensor
		args={[500, 3, 500]}
		onsensorenter={(event) => {
			if (event.targetRigidBody) {
				reset(event.targetRigidBody)
			}
		}}
	/>
</T.Group>
