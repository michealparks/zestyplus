import type { Color } from 'three'

export const hueShift = (color: Color, shift: number): Color => {
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
