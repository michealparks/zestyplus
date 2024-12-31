export const onTargetTime = (
	target: Date,
	callback: () => void
): (() => void) => {
	// Calculate the delay in milliseconds
	const delay = target.getTime() - Date.now()

	if (delay > 0) {
		const id = setTimeout(callback, delay)
		return () => clearTimeout(id)
	} else {
		console.error('Target time is in the past. Check system clock.')
		return () => {}
	}
}

export const minutesBeforeNewYears = (minutes = 1): Date => {
	// Calculate the target time for 11:59 PM on New Year's Eve
	const nextYear = new Date().getFullYear() + 1
	const targetTime = new Date(nextYear, 0, 1, 0, 0, 0)
	return new Date(targetTime.getTime() - 60_000 * minutes)
}

export const getDateSecondsFromNow = (seconds: number): Date => {
	return new Date(Date.now() + seconds * 1000)
}

export const formatDisplayTime = (date: Date): string => {
	const minutes = date.getMinutes().toString()
	const seconds = date.getSeconds().toString().padStart(2, '0')
	return `${minutes}:${seconds}`
}

export const formatDisplayTimeFromNumber = (input: number): string => {
	const totalSeconds = Math.floor(input / 1000)
	const minutes = Math.floor(totalSeconds / 60).toString()
	const seconds = (totalSeconds % 60).toString().padStart(2, '0')
	return `${minutes}:${seconds}`
}
