<script lang="ts">
	import { provideWikipedia } from '$lib/hooks/wikipedia.svelte'

	const wikipedia = provideWikipedia()

	let text = $state()

	const setEvent = () => {
		const r = (Math.random() * wikipedia.current.length) | 0
		const item = wikipedia.current[r]

		if (item) {
			text = `${item.date}: ${item.description}`
		}
	}

	$effect(() => {
		setEvent()
		const id = setInterval(() => {
			setEvent()
		}, 10_000)

		return () => clearInterval(id)
	})
</script>

<p class="absolute top-0 left-0 z-10 w-3/4 p-4 text-xs text-white">
	{text}
</p>
