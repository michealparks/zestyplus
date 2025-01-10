<script lang="ts">
	import { Mesh, SpotLight, ShaderMaterial, MeshStandardMaterial } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import Lightformer from '$lib/components/Lightformer.svelte'
	import { useAnalyser } from '$lib'
	import { lerp } from 'three/src/math/MathUtils.js'
	import { normalizeToUnitInterval } from '$lib/math'
	import { fragmentShader, vertexShader } from './shader'

	const { scene } = useThrelte()
	const { frequencyData } = useAnalyser()

	const spot1 = new SpotLight()

	const mesh1 = new Mesh()

	const uniforms = {
		time: { value: 1.0 },
	}
	const shaderMaterial = new ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
	})

	const torusMaterial = new MeshStandardMaterial()

	useTask((delta) => {
		mesh1.rotation.y += delta

		const v = lerp(torusMaterial.opacity, frequencyData.current[64] / 50, delta)
		torusMaterial.opacity = Math.max(0.1, v)

		uniforms.time.value += delta / 3 + frequencyData.current[32] / 500

		const n = normalizeToUnitInterval(frequencyData.current[16], 0, 100)
		spot1.intensity = lerp(n * 10, 0, delta / 2)
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={6}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T
	is={spot1}
	castShadow
	intensity={1000}
	position={[4, 3, 2]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)

		scene.add(ref.target)
		ref.target.position.set(0, 0, 0)
	}}
/>

<T
	is={mesh1}
	castShadow
	receiveShadow
>
	<T
		is={torusMaterial}
		roughness={0.1}
		metalness={1}
		transparent
	/>
	<T.TorusKnotGeometry args={[1, 0.4, 256, 64]} />
</T>

<T.Mesh position.z={-1}>
	<T is={shaderMaterial} />
	<T.PlaneGeometry args={[12, 3]} />
</T.Mesh>

<Lightformer />
