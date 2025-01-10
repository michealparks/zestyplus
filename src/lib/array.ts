export const shiftAndAddVector = (
	array: Float32Array,
	x: number,
	y: number,
	z: number
): Float32Array => {
	// Shift all existing vectors to the right by mutation
	for (let i = array.length - 1; i >= 3; i--) {
		array[i] = array[i - 3]
	}

	// Insert the new vector at the front
	array[0] = x
	array[1] = y
	array[2] = z
	return array
}

/**
 * Shuffles array in place
 */
export const shuffle = <T>(array: T[]): void => {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
		// Swap the elements
		;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
	}
}
