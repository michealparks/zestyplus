import type { Config } from 'tailwindcss'

export default {
	// Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
} satisfies Config
