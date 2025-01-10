import containerQueries from '@tailwindcss/container-queries'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { join } from 'node:path'
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	// Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// Append the path to the Skeleton package
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		),
	],
	theme: {
		extend: {},
	},
	plugins: [
		typography,
		containerQueries,
		// Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: { preset: ['vintage'] },
		}),
	],
} satisfies Config
