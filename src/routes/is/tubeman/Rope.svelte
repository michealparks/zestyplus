<script lang="ts">
	import { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { observe, T, useTask } from '@threlte/core'
	import { Collider, RigidBody, useRopeJoint } from '@threlte/rapier'
	import { Vector3, type Object3D, type Vector3Tuple } from 'three'

	interface Props {
		segments: number
		ropeStart: Vector3Tuple
		ropeEnd: Vector3Tuple
		length: number
		ballRadius: number
		damping: number
		startRigidBody?: RapierRigidBody | undefined
		lastRigidBody?: RapierRigidBody | undefined
		positions?: Float32Array | undefined
	}

	let {
		segments,
		ropeStart,
		ropeEnd,
		length,
		ballRadius,
		damping,
		startRigidBody = $bindable<RapierRigidBody | undefined>(),
		lastRigidBody = $bindable<RapierRigidBody | undefined>(),
		positions = $bindable<Float32Array | undefined>(),
	}: Props = $props()

	let lengthBetweenSegments = $derived(length / (segments - 1))

	let jointsInitialized = $state(false)

	const joints = $derived(
		Array.from({ length: segments - 1 }, () => {
			return useRopeJoint([0, 0, 0], [0, 0, 0], lengthBetweenSegments)
		})
	)

	positions = new Float32Array(segments)

	const rigidBodies = $state<RapierRigidBody[]>([])

	$effect(() => {
		startRigidBody = rigidBodies.at(0)
		lastRigidBody = rigidBodies.at(-1)
	})

	const objects = $state<Object3D[]>([])
	const start = new Vector3().fromArray(ropeStart)
	const end = new Vector3().fromArray(ropeEnd)

	const getIntialRigidBodyPosition = (index: number) => {
		const t = index / (segments - 1)
		return start.clone().lerp(end, t)
	}

	$effect(() => {
		if (rigidBodies.length !== segments || objects.length !== segments) {
			return
		}

		if (jointsInitialized) {
			return
		}

		joints.forEach((joint, index) => {
			joint.rigidBodyA.set(rigidBodies[index])
			joint.rigidBodyB.set(rigidBodies[index + 1])
		})

		jointsInitialized = true
	})

	let points = $state(
		Array.from({ length: segments }, () => {
			return new Vector3(0, 0, 0)
		})
	)

	const vec3 = new Vector3()

	useTask(() => {
		if (!jointsInitialized) return

		for (let i = 0, j = 0, l = objects.length; i < l; i += 1, j += 3) {
			objects[i]?.getWorldPosition(vec3)
			positions[j + 0] = vec3.x
			positions[j + 1] = vec3.y
			positions[j + 2] = vec3.z
		}
	})

	observe(
		() => [jointsInitialized, ropeStart, ropeEnd],
		([jointsInitialized]) => {
			if (!jointsInitialized) return

			startRigidBody?.setNextKinematicTranslation({
				x: ropeStart[0],
				y: ropeStart[1],
				z: ropeStart[2],
			})
		}
	)
</script>

{#each { length: segments }, index}
	<T.Group
		oncreate={(ref) => {
			ref.position.copy(getIntialRigidBodyPosition(index))
		}}
	>
		<RigidBody
			linearDamping={damping}
			angularDamping={damping}
			type={index === 0 ? 'kinematicPosition' : 'dynamic'}
			bind:rigidBody={rigidBodies[index]}
		>
			<Collider
				shape="ball"
				args={[ballRadius]}
			>
				<T.Object3D bind:ref={objects[index]} />
			</Collider>
		</RigidBody>
	</T.Group>
{/each}
