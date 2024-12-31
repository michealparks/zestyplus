<script>
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'

	import Ribbon from './Ribbon.svelte'
</script>

<T.PerspectiveCamera makeDefault>
	<OrbitControls
		autoRotate={true}
		autoRotateSpeed={2}
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
		target.y={2}
	/>
</T.PerspectiveCamera>

<Ribbon />

<Ribbon
	position.x={2}
	baseWidth={0.1}
	baseDashOffset={0.1}
/>

<Ribbon
	position.x={-1}
	baseWidth={0.1}
	baseDashOffset={0.2}
/>
