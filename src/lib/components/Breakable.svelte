<script
	lang="ts"
	module
>
	import { T } from '@threlte/core'
	import {
		type CollisionEnterEvent,
		type ContactEvent,
		AutoColliders,
		RigidBody,
	} from '@threlte/rapier'
	import { Vector3, type Object3D } from 'three'
	import { ConvexObjectBreaker } from 'three/addons'
	import Self from './Breakable.svelte'

	const breaker = new ConvexObjectBreaker()
</script>

<script lang="ts">
	type Props = {
		fixed?: boolean
		depth?: number
		maxDepth?: number
		minBreakForce?: number
		mesh: Object3D
	}

	let {
		fixed = false,
		depth = 0,
		maxDepth = 1,
		minBreakForce = 100,
		/**
		 * Expects mesh.geometry to be a ConvexGeometry
		 */
		/** internal prop for recursive rendering */

		mesh,
		...rest
	}: Props = $props()

	let debris: Object3D[] = $state([])

	if (depth === 0) {
		// no need to prepare if we're already "broken"!
		breaker.prepareBreakableObject(mesh, 1, new Vector3(), new Vector3(), true)
	}

	/** used as signal if collision happened */
	let impactV: Vector3 | undefined
	let impactN: Vector3 | undefined

	const oncollisionenter: CollisionEnterEvent = (event) => {
		if (depth >= maxDepth) return

		const contacts = event.manifold.numContacts()
		if (contacts === 0) return

		const contactPoint = event.manifold.localContactPoint1(0)
		if (!contactPoint) return

		impactV = new Vector3(contactPoint.x, contactPoint.y, contactPoint.z)
	}

	const vec3 = new Vector3()

	const oncontact: ContactEvent = (event) => {
		if (!impactV) return

		if (event.totalForceMagnitude < minBreakForce) {
			// if the force is too small, we don't break, but reset the impactV
			impactV = undefined
			return
		}

		const normal = event.maxForceDirection
		impactN = new Vector3(normal.x, normal.y, normal.z)

		debris = breaker.subdivideByImpact(mesh, impactV, impactN, 2, 1)
		console.log(debris)

		mesh.getWorldPosition(vec3)
		const parentPos = mesh.parent?.parent?.position

		if (!parentPos) return

		for (const item of debris) {
			item.position.add(parentPos)
		}
	}
</script>

{#if debris.length === 0}
	<RigidBody
		type={fixed ? 'fixed' : 'dynamic'}
		{oncollisionenter}
		{oncontact}
		canSleep={false}
		{...rest}
	>
		<AutoColliders shape="convexHull">
			<T is={mesh} />
		</AutoColliders>
	</RigidBody>
{:else}
	{#each debris as object (object.uuid)}
		<T.Group scale={0.98}>
			<Self
				mesh={object}
				depth={depth + 1}
				{maxDepth}
				{minBreakForce}
			/>
		</T.Group>
	{/each}
{/if}
