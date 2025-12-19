<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import {
		uniform,
		reflector,
		mix,
		sample,
		vec4,
		rangeFogFactor,
		Fn,
	} from 'three/tsl'
	import { hashBlur } from 'three/addons/tsl/display/hashBlur.js'
	import { MeshStandardNodeMaterial } from 'three/webgpu'

	const { scene } = useThrelte()

	const roughness = uniform(0.9)
	const radius = uniform(0.2)

	const reflection = reflector({
		resolutionScale: 1,
		depth: true,
		bounces: true,
	})

	const reflectionDepth = reflection.getDepthNode()
	reflection.target.rotateX(-Math.PI / 2)
	scene.add(reflection.target)

	const floorMaterial = new MeshStandardNodeMaterial()
	floorMaterial.transparent = true
	floorMaterial.colorNode = Fn(() => {
		// ranges adjustment
		const radiusRange = mix(0.01, 0.1, radius) // range [ 0.01, 0.1 ]
		const roughnessRange = mix(0.3, 0.03, roughness) // range [ 0.03, 0.3 ]

		// mask the sample
		const maskReflection = sample((uv) => {
			const sample = reflection.sample(uv)
			const mask = reflectionDepth.sample(uv)

			return vec4(sample.rgb, sample.a.mul(mask.r))
		}, reflection.uvNode)

		// blur the reflection
		const reflectionBlurred = hashBlur(maskReflection, radiusRange, {
			premultipliedAlpha: true,
		})

		// reflection composite
		const reflectionMask = reflectionBlurred.a
			.mul(reflectionDepth)
			.remapClamp(0, roughnessRange)
		const reflectionIntensity = 0.08
		const reflectionMixFactor = reflectionMask.mul(roughness.mul(2).min(1))
		const reflectionFinal = mix(
			reflection.rgb,
			reflectionBlurred.rgb,
			reflectionMixFactor
		).mul(reflectionIntensity)

		// mix reflection with animated circle
		const output = reflectionFinal
		// const output = animatedCircle.add(reflectionFinal)

		// falloff opacity by distance like an opacity-fog

		const opacity = rangeFogFactor(80, 200).oneMinus()

		// final output

		return vec4(output, opacity)
	})()
</script>

<T.Mesh>
	<T.BoxGeometry args={[100, 0.001, 100]} />
	<T
		is={floorMaterial}
		color="red"
	/>
</T.Mesh>
