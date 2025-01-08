<script lang="ts">
	import { goto } from '$app/navigation'

	import Logo from '$lib/components/Logo.svelte'
</script>

<div
	class="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center"
>
	<Logo class="w-1/2" />
	<p class="py-2 text-white opacity-55">
		zesty.plus will request to use your microphone to react to your tunes.
	</p>

	<div class="flex gap-2">
		<button
			class="flex items-center gap-1 bg-slate-600 px-3 py-1 text-white"
			onclick={() => goto('/is/lines')}
		>
			<span class="text-xs">get zesty</span> 🤌
		</button>
		<button
			class="flex items-center gap-1 bg-slate-600 px-3 py-1 text-white"
			onclick={() => goto('/about')}
		>
			<span class="text-xs">what the zest?</span> 🧐
		</button>
	</div>
</div>
