<script lang="ts">
	import {
		formatDisplayTimeFromNumber,
		minutesBeforeNewYears,
		onTargetTime,
	} from '$lib/time'

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

	let targetTime = -1
	let displayState = $state<'counting' | 'celebrating' | 'idle'>('idle')

	let display = $state('')
	let fading = $state(false)

	const tick = () => {
		const time = new Date()
		const now = time.getTime()

		const remaining = targetTime - now

		display = formatDisplayTimeFromNumber(remaining)

		if (now <= targetTime) {
			requestAnimationFrame(tick)
		} else {
			displayState = 'celebrating'
		}
	}

	const startCountdown = () => {
		displayState = 'counting'
		requestAnimationFrame(tick)
	}

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
		/**
		 * DEBUG OPTIONS
		 * Set debugTime to any future Date to test the countdown.
		 * Leave as null to use real New Year's logic.
		 *
		 * Example:
		 * const debugTime = getDateSecondsFromNow(30) // 30 seconds from now
		 * const debugTime = new Date(Date.now() + 5 * 60_000) // 5 min from now
		 */
		const debugTime: Date | null = null

		const countdownTarget = debugTime
			? debugTime
			: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0)

		targetTime = countdownTarget.getTime()

		/**
		 * When to START the countdown
		 * - If debugging, start immediately
		 * - Otherwise: 10 minutes before midnight
		 */
		if (debugTime) {
			// Start immediately when debugging
			startCountdown()
			return () => null
		}

		// --- REAL WORLD BEHAVIOR BELOW ---

		const startTime = new Date(countdownTarget.getTime() - 10 * 60_000)

		// If already past countdown start, start immediately
		if (Date.now() >= startTime.getTime()) {
			startCountdown()
			return () => null
		}

		// Otherwise schedule the start
		const cleanup = onTargetTime(startTime, startCountdown)
		return cleanup
	})

	$effect(() => {
		if (displayState === 'celebrating') {
			const celebrateInterval = setInterval(celebrate, 500)
			const intervalTime = 1000 * 60 * 1 /* 3 min */
			const celebrateEndTimeout = setTimeout(() => {
				fading = true
				setTimeout(() => {
					displayState = 'idle'
				}, intervalTime)
			}, intervalTime)

			return () => {
				clearInterval(celebrateInterval)
				clearTimeout(celebrateEndTimeout)
			}
		}
	})
</script>

{#if displayState === 'counting'}
	<div
		class="pointer-events-none absolute z-1 grid h-full w-full place-content-center text-8xl text-white"
	>
		<div class="flex gap-2">
			{display}
		</div>
	</div>
{:else if displayState === 'celebrating'}
	<div
		class="pointer-events-none absolute z-1 h-full w-full place-content-center text-8xl text-white"
		class:fading
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

	@keyframes fade {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.emoji {
		animation: emojiAnimation 3s infinite;
	}

	.fading {
		animation: fade 175s forwards;
	}
</style>
