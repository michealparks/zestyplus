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
