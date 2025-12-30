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
	import {
		Material,
		Mesh,
		Quaternion,
		Vector3,
		type Object3D,
		type Vector3Tuple,
	} from 'three'
	import { ConvexObjectBreaker } from 'three/addons'
	import Self from './Breakable.svelte'

	const breaker = new ConvexObjectBreaker()
</script>

<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	interface Props {
		velocity?: Vector3Tuple
		angularVelocity?: Vector3Tuple
		fixed?: boolean
		autoBreak?: boolean
		depth?: number
		maxDepth?: number
		minBreakForce?: number
		mesh: Object3D
	}

	let {
		fixed = false,
		velocity,
		angularVelocity,
		depth = 0,
		maxDepth = 1,
		minBreakForce = 100,
		mesh,
		...rest
	}: Props = $props()

	let debris: Object3D[] = $state([])

	// last recorded velocities at the moment the piece breaks
	let breakVelocity: Vector3Tuple | undefined = velocity
	let breakAngularVelocity: Vector3Tuple | undefined = angularVelocity

	// handle to the current Rapier rigid body
	let rigidBody: RapierRigidBody | undefined

	if (depth === 0) {
		// same as before: only prepare the root piece
		breaker.prepareBreakableObject(mesh, 1, new Vector3(), new Vector3(), true)
	}

	let impactV: Vector3 | undefined
	let impactN: Vector3 | undefined

	const oncollisionenter: CollisionEnterEvent = (event) => {
		if (depth >= maxDepth) return

		const contacts = event.manifold.numContacts()
		if (contacts === 0) return

		const contactPoint = event.manifold.localContactPoint1(0)
		if (!contactPoint) return

		// this is in the collider's local space, which matches what the breaker expects
		impactV = new Vector3(contactPoint.x, contactPoint.y, contactPoint.z)
	}

	const pos = new Vector3()
	const quat = new Quaternion()

	const oncontact: ContactEvent = (event) => {
		if (!impactV) return

		if (event.totalForceMagnitude < minBreakForce) {
			impactV = undefined
			return
		}

		const normal = event.maxForceDirection
		impactN = new Vector3(normal.x, normal.y, normal.z)

		// snapshot current RB velocities once, right before we break
		if (rigidBody) {
			const lv = rigidBody.linvel()
			const av = rigidBody.angvel()
			breakVelocity = [lv.x, lv.y, lv.z]
			breakAngularVelocity = [av.x, av.y, av.z]
		}

		// *** this part is unchanged in spirit from your original ***
		debris = breaker.subdivideByImpact(mesh, impactV, impactN, 2, 1)

		// use the parent transform (RB object) as before, but fix rotation math
		const parent = mesh.parent
		if (parent) {
			parent.getWorldPosition(pos)
			parent.getWorldQuaternion(quat)

			for (const item of debris) {
				// rotate shard offset into world space
				item.position.applyQuaternion(quat)
				item.position.add(pos)

				// compose rotations: worldRot = parentRot * localRot
				item.quaternion.premultiply(quat)

				item.castShadow = item.receiveShadow = true
				;(item as Mesh).material = ((mesh as Mesh).material as Material).clone()
			}
		}

		// clear impact so we don't double-break on lingering contacts
		impactV = undefined
		impactN = undefined
	}
</script>

{#if debris.length === 0}
	<RigidBody
		type={fixed ? 'fixed' : 'dynamic'}
		{oncollisionenter}
		{oncontact}
		oncreate={(ref) => {
			rigidBody = ref

			// keep your original "spawn velocity" behaviour
			if (velocity) {
				ref.setLinvel({ x: velocity[0], y: velocity[1], z: velocity[2] }, true)
			}
			if (angularVelocity) {
				ref.setAngvel(
					{
						x: angularVelocity[0],
						y: angularVelocity[1],
						z: angularVelocity[2],
					},
					true
				)
			}
		}}
		canSleep={false}
	>
		<AutoColliders shape="convexHull">
			<T
				is={mesh}
				{...rest}
			/>
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
				velocity={breakVelocity}
				angularVelocity={breakAngularVelocity}
				{...rest}
			/>
		</T.Group>
	{/each}
{/if}
