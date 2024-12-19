<script lang="ts">
	import { useAnalyser } from '$lib'

	const { frequencyData } = useAnalyser()
	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D | undefined

	$effect(() => {
		ctx = canvas.getContext('2d')!
	})

	const draw = () => {
		requestAnimationFrame(draw)

		if (ctx === undefined) return

		// Clear the canvas
		ctx.fillStyle = 'rgb(0, 0, 0)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Draw frequency bars
		const { length } = frequencyData.current
		const barWidth = (canvas.width / length) * 2.5
		let barHeight
		let x = 0

		for (let i = 0; i < length; i += 1) {
			barHeight = frequencyData.current[i] / 5

			ctx.fillStyle = 'rgb(255, 50, 50)'
			ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)

			x += barWidth + 1
		}
	}

	requestAnimationFrame(draw)
</script>

<canvas
	height="50"
	width="50"
	bind:this={canvas}
></canvas>
