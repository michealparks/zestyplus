<script>
	let costco = $state(true)

	let interval = 1000 * 20

	$effect(() => {
		function flip() {
			// flip a coin
			const coin = Math.random() > 0

			if (coin) {
				costco = true
				setTimeout(() => {
					costco = false
					setTimeout(flip, interval)
				}, 20 * 1000)
			} else {
				setTimeout(flip, interval)
			}
		}

		flip()
	})
</script>

{#if costco}
	<div class="costco z-10 h-screen">
		<img
			class="costco pointer-events-none absolute left-0 top-0 scale-[2.5] opacity-20"
			src="/costco.png"
			alt="Costco"
		/>
	</div>
{/if}

<style>
	.costco {
		animation: moveAcross 20s linear infinite;
	}

	@keyframes moveAcross {
		0% {
			left: -250vw;
		}
		100% {
			left: 200vw; /* Move off-screen to the right */
		}
	}
</style>
