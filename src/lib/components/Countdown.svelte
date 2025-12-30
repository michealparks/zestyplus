<script lang="ts">
	import { useCountdown } from '$lib/hooks/useCountdown.svelte'
	import { fade } from 'svelte/transition'

	const countdown = useCountdown()

	const emojis = [
		'👺',
		'😱',
		'🤩',
		'🥳',
		'😘',
		'🤌',
		'👏',
		'🫶',
		'💥',
		'🍾',
		'🎺',
		'🎻',
		'🎉',
		'🎊',
		'🪩',
		'🙂‍↕️',
		'🤝',
		'🤙',
		'🫂',
		'🤸',
		'💸',
		'📈',
		'🎈',
		'🧘‍♀️',
		'🏄‍♂️',
		'🫵',
	]

	let currentEmojis: { emoji: string; x: number; y: number }[] = $state([])

	const celebrate = () => {
		const nextEmoji = {
			emoji: emojis.at(((Math.random() * emojis.length) | 0) - 1) ?? '',
			x: Math.random() * 100,
			y: Math.random() * 100,
		}

		currentEmojis.push(nextEmoji)

		if (currentEmojis.length > 50) currentEmojis.shift()
	}

	$effect(() => {
		if (countdown.displayState === 'celebrating') {
			const celebrateInterval = setInterval(celebrate, 500)
			return () => clearInterval(celebrateInterval)
		}
	})
</script>

{#if countdown.displayState === 'counting'}
	<div
		class="pointer-events-none absolute z-1 grid h-full w-full place-content-center text-9xl text-white"
	>
		<div
			class="flex gap-2"
			in:fade={{ duration: 60 * 1000 }}
		>
			{countdown.displayTime}
		</div>
	</div>
{:else if countdown.displayState === 'celebrating'}
	<div
		class="pointer-events-none absolute z-1 h-full w-full place-content-center text-8xl text-white"
		out:fade={{ duration: 10 * 1000 }}
	>
		{#each currentEmojis as { emoji, x, y } (`${x}:${y}:${emoji}`)}
			<div
				class="emoji absolute"
				style="left: {x}%; top: {y}%"
			>
				{emoji}
			</div>
		{/each}
	</div>
{/if}

<style>
	@keyframes emojiAnimation {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		25% {
			opacity: 1;
			transform: scale(1.2);
		}
		50% {
			transform: scale(1.5);
		}
		75% {
			opacity: 1;
			transform: scale(1.2);
		}
		100% {
			opacity: 0;
			transform: scale(1);
		}
	}

	.emoji {
		animation: emojiAnimation 3s infinite;
	}
</style>
