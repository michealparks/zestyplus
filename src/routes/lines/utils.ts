import type { Color } from 'three'

export function shiftAndAddVector(
	array: Float32Array,
	x: number,
	y: number,
	z: number
): Float32Array {
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

export function hueShift(color: Color, shift: number): Color {
	// Convert the color to HSL
	const hsl = { h: 0, s: 0, l: 0 }
	color.getHSL(hsl)

	// Shift the hue
	hsl.h = (hsl.h + shift) % 1 // Ensure the hue stays within [0, 1]
	if (hsl.h < 0) hsl.h += 1 // Handle negative shifts

	// Set the color back from HSL
	color.setHSL(hsl.h, hsl.s, hsl.l)

	return color
}
