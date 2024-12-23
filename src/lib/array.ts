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
