<script lang="ts">
	import { Mesh, SpotLight, MeshStandardMaterial } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import Lightformer from '$lib/components/Lightformer.svelte'
	import { useAnalyser } from '$lib'
	import { lerp } from 'three/src/math/MathUtils.js'
	import { normalizeToUnitInterval } from '$lib/math'

	const { scene } = useThrelte()
	const analyser = useAnalyser()

	const spot1 = new SpotLight()

	const mesh1 = new Mesh()
	const mesh2 = new Mesh()
	const mesh3 = new Mesh()

	const torusMaterial = new MeshStandardMaterial()

	mesh1.rotation.y += Math.PI / 2
	mesh2.rotation.y += Math.PI / 4

	useTask((delta) => {
		mesh1.rotation.y += delta
		mesh2.rotation.y += delta
		mesh3.rotation.y += delta

		const n = normalizeToUnitInterval(analyser.logSmooth01[16], 0, 100)
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

<Lightformer />

<T
	is={mesh2}
	position={[-5, 0, -5]}
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

<T
	is={mesh3}
	position={[5, 0, -5]}
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

<Lightformer />
