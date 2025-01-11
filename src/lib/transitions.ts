import type { Material } from 'three'
import { createTransition } from '@threlte/extras'
import { cubicOut } from 'svelte/easing'

export const fade = createTransition<Material>((ref: Material) => {
	ref.transparent = true
	return {
		tick(t) {
			// t is [0,1]
			ref.opacity = t
		},
		easing: cubicOut,
		duration: 400,
		delay: 100,
	}
})
