export function normalizeToUnitInterval(
	n: number,
	min1: number,
	max1: number
): number {
	// Scale the number to 0-1
	return (n - min1) / (max1 - min1)
}

export function normalizeToUnitIntervalLog(
	n: number,
	min1: number,
	max1: number,
	base: number = 10
): number {
	// Normalize the number to 0-1
	const normalized = (n - min1) / (max1 - min1)

	// Apply logarithmic scaling with adjustable base to control trailing behavior
	return Math.log1p(normalized * (base - 1)) / Math.log1p(base - 1)
}
