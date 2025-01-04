<script>
	let costco = $state(false)

	let interval = 1000 * 20

	$effect(() => {
		function flip() {
			// flip a coin
			const coin = Math.random() > 0

			if (coin) {
				console.log(coin)
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
	<div class="costco h-screen">
		<img
			class="costco absolute left-0 scale-[2.5] opacity-20"
			src="costco.png"
			alt=""
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
