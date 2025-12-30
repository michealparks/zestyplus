import { formatDisplayTimeFromNumber } from '$lib/time'
import { getContext, setContext } from 'svelte'

const key = Symbol('countdown-context')

interface Context {
	targetTime: number
	remaining: number
	displayTime: string
	displayState: 'counting' | 'celebrating' | 'idle'
}

export const provideCountdown = () => {
	let targetTime = $state(-1)
	let remaining = $state(0)

	let displayTime = $state('')
	let displayState = $state<Context['displayState']>('idle')

	const tick = () => {
		const time = new Date()
		const now = time.getTime()

		remaining = targetTime - now
		displayTime = formatDisplayTimeFromNumber(remaining)

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

	$effect(() => {
		/**
		 * DEBUG OPTIONS
		 * Set debugTime to any future Date to test the countdown.
		 * Leave as null to use real New Year's logic.
		 *
		 * Example:
		 * const debugTime = new Date(Date.now() + 5 * 60_000) // 5 min from now
		 */
		const debugTime: Date | null = null //new Date(Date.now() + 0.1 * 60_000)

		const countdownTarget = debugTime
			? debugTime
			: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0)

		targetTime = countdownTarget.getTime()

		const startTime = new Date(countdownTarget.getTime() - 30 * 60_000)

		// If already past countdown start, start immediately
		if (Date.now() >= startTime.getTime()) {
			startCountdown()
			return () => null
		}

		// Calculate the delay in milliseconds
		const delay = startTime.getTime() - Date.now()
		const id = setTimeout(startCountdown, delay)
		return () => clearTimeout(id)
	})

	$effect(() => {
		if (displayState === 'celebrating') {
			const intervalTime = 1000 * 60 * 1

			const celebrateEndTimeout = setTimeout(() => {
				setTimeout(() => {
					displayState = 'idle'
				}, intervalTime)
			}, intervalTime)

			return () => {
				clearTimeout(celebrateEndTimeout)
			}
		}
	})

	setContext<Context>(key, {
		get targetTime() {
			return targetTime
		},
		get remaining() {
			return remaining
		},
		get displayTime() {
			return displayTime
		},
		get displayState() {
			return displayState
		},
	})
}

export const useCountdown = (): Context => {
	return getContext<Context>(key)
}
