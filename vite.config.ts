import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { threlteStudio } from '@threlte/studio/vite'

export default defineConfig({
	plugins: [sveltekit(), threlteStudio()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
