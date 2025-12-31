<script lang="ts">
	import { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import type { Vector3Tuple } from 'three'
	import { T, useTask } from '@threlte/core'
	import Rope from './Rope.svelte'
	import { OrbitControls } from '@threlte/extras'
	import Skin from './Skin.svelte'
	import { Collider, Debug } from '@threlte/rapier'

	let torsoSegments = 20
	let torsoLength = 5

	let damping = 2
	let ropeEnd = $state<Vector3Tuple>([0, 4, 1])

	let torsoPositions = $state<Float32Array>()
	let leftArmPositions = $state<Float32Array>()

	let torsoRigidBody = $state<RapierRigidBody>()
	let startLeftArmRigidbody = $state<RapierRigidBody>()
	let startRightArmRigidbody = $state<RapierRigidBody>()
	let endLeftArmRigidbody = $state<RapierRigidBody>()
	let endRightArmRigidbody = $state<RapierRigidBody>()

	setInterval(() => {
		// Torso
		if (Math.random() > 0.2) {
			torsoRigidBody?.applyImpulse(
				{
					x: (Math.random() - 0.5) * 0.1,
					y: 0.1,
					z: (Math.random() - 0.5) * 0.1,
				},
				true
			)
		}
	}, 100)

	useTask(() => {
		if (torsoRigidBody === undefined) {
			return
		}

		const translation = torsoRigidBody.translation()
		startLeftArmRigidbody?.setNextKinematicTranslation(translation)
		startRightArmRigidbody?.setNextKinematicTranslation(translation)
	})
</script>

<T.AmbientLight />
<T.DirectionalLight position={[10, 10, 10]} />

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 20]}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
	<OrbitControls />
</T.PerspectiveCamera>

<Debug />

<!-- torso -->
<Rope
	bind:positions={torsoPositions}
	bind:lastRigidBody={torsoRigidBody}
	ballRadius={0.1}
	ropeStart={[0, 0, 0]}
	{ropeEnd}
	length={torsoLength}
	segments={torsoSegments}
	{damping}
/>
<Skin
	radius={0.3}
	segments={torsoSegments}
	heightSegments={torsoSegments * 10}
	segmentHeight={torsoLength / torsoSegments}
	positions={torsoPositions}
/>

<Rope
	bind:positions={leftArmPositions}
	bind:startRigidBody={startLeftArmRigidbody}
	bind:lastRigidBody={endLeftArmRigidbody}
	ballRadius={0.1}
	ropeStart={[0, 0, 0]}
	{ropeEnd}
	length={3}
	segments={8}
	{damping}
/>
<Skin
	radius={0.3}
	segments={8}
	heightSegments={8 * 10}
	segmentHeight={torsoLength / torsoSegments}
	positions={leftArmPositions}
/>

<Rope
	bind:startRigidBody={startRightArmRigidbody}
	bind:lastRigidBody={endRightArmRigidbody}
	ballRadius={0.1}
	ropeStart={[0, 0, 0]}
	{ropeEnd}
	length={3}
	segments={8}
	{damping}
/>

<T.Group position={[0, -2, 0]}>
	<Collider
		type="static"
		shape="cuboid"
		args={[10, 2, 10]}
	></Collider>
</T.Group>
