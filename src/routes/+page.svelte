<script lang="ts">
	import { goto } from '$app/navigation'

	import Logo from '$lib/components/Logo.svelte'
</script>

<div
	class="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center"
	style="
		background-image: radial-gradient(at 100% 0%,hsla(135,34%,70%,.14) 0px,transparent 50%),radial-gradient(at 85% 100%,hsla(31,83%,50%,.14) 0px,transparent 50%);
		background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
	"
>
	<Logo class="w-1/2" />
	<p class="py-2 text-white opacity-55">
		zesty.plus will request to use your microphone to react to your tunes.
	</p>

	<div class="flex gap-2">
		<a
			class="btn btn-sm variant-gradient-warning-error flex items-center gap-1 bg-gradient-to-br"
			href="/is/lines"
		>
			<span class="text-xs">get zesty</span> 🤌
		</a>
		<a
			class="btn btn-sm variant-gradient-warning-error flex items-center gap-1 bg-gradient-to-br"
			href="/about"
		>
			<span class="text-xs">what the zest?</span> 🧐
		</a>
	</div>
</div>
