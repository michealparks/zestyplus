import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
	plugins: [mkcert(), tailwindcss(), sveltekit()],

	server: {
		host: true,
		port: 3000,
		https: true,
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
