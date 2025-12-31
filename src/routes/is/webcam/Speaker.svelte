<script lang="ts">
	import type { Props } from '@threlte/core'
	import type { Group } from 'three/webgpu'
	import { MathUtils } from 'three/webgpu'
	import { T } from '@threlte/core'
	import { Edges } from '@threlte/extras'
	import { quartIn, quartOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'

	export type SpeakerProps = Props<Group> & {
		volume?: number
	}

	let { volume = 0, ...rest }: SpeakerProps = $props()

	let jumpOffsetY = new Tween(0)
	let jumpRotationX = new Tween(0)
	let jumpRotationZ = new Tween(0)
	let isJumping = $state(false)

	const randomSign = () => Math.round(Math.random()) * 2 - 1

	const jump = () => {
		isJumping = true
		const upDuration = 70 + Math.random() * 50

		jumpOffsetY.set(0.2, {
			duration: upDuration,
			easing: quartOut,
		})
		jumpRotationX.set(Math.random() * 4 * randomSign(), {
			duration: upDuration,
			easing: quartOut,
		})
		jumpRotationZ.set(Math.random() * 4 * randomSign(), {
			duration: upDuration,
			easing: quartOut,
		})

		setTimeout(() => {
			const downDuration = 120 + Math.random() * 70

			jumpOffsetY.set(0, {
				duration: downDuration,
				easing: quartIn,
			})
			jumpRotationX.set(0, {
				duration: downDuration,
				easing: quartIn,
			})
			jumpRotationZ.set(0, {
				duration: downDuration,
				easing: quartIn,
			})

			setTimeout(() => {
				isJumping = false
			}, downDuration * 1.5)
		}, upDuration)
	}

	$effect(() => {
		if (volume > 0.15 && !isJumping) jump()
	})
</script>

<T.Group {...rest}>
	<T.Group
		position.y={jumpOffsetY.current}
		rotation.z={MathUtils.DEG2RAD * jumpRotationZ.current}
		rotation.x={MathUtils.DEG2RAD * jumpRotationX.current}
	>
		<!-- CASE -->
		<T.Mesh
			castShadow
			receiveShadow
			position.y={1.26}
			scale={0.5}
		>
			<T.BoxGeometry args={[3, 5, 3]} />
			<T.MeshStandardMaterial color="#eedbcb" />
			<Edges
				color="black"
				scale={1.001}
			/>

			<!-- CONE -->
			<T.Mesh
				position.z={1.1}
				position.y={1}
				scale={1 + volume}
				rotation.x={MathUtils.DEG2RAD * -90}
			>
				<T.ConeGeometry args={[1, 1, 64]} />
				<T.MeshStandardMaterial
					flatShading
					color="#111111"
				/>
				<Edges
					color="black"
					scale={1.001}
					thresholdAngle={20}
				/>
			</T.Mesh>
		</T.Mesh>
	</T.Group>
</T.Group>
