<script lang="ts">
	import { useTask, useThrelte } from '@threlte/core'
	import { EffectComposer, EffectPass, RenderPass, BloomEffect, KernelSize } from 'postprocessing'

	const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte()

	const composer = new EffectComposer(renderer)

	$effect(() => {
		composer.removeAllPasses()
		composer.addPass(new RenderPass(scene, $camera))
		composer.addPass(
			new EffectPass(
				$camera,
				new BloomEffect({
					intensity: 0.8,
					luminanceThreshold: 0.15,
					height: 1024,
					width: 1024,
					luminanceSmoothing: 0.5,
					mipmapBlur: true,
					kernelSize: KernelSize.MEDIUM,
				})
			)
		)
	})

	$effect(() => {
		const w = $size.width * window.devicePixelRatio
		const h = $size.height * window.devicePixelRatio
		composer.setSize(w, h)
	})

	$effect(() => {
		const before = autoRender.current
		autoRender.set(false)
		return () => autoRender.set(before)
	})

	useTask(
		(delta) => {
			composer.render(delta)
		},
		{
			stage: renderStage,
			autoInvalidate: false,
		}
	)
</script>
