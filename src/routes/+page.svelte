<script lang="ts">
	import Logo from '$lib/components/Logo.svelte'

	const musicIcons = [
		'boom',
		'confetti',
		'dance',
		'explode',
		'sax',
		'tornado',
	] as const
</script>

<div
	class="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-4 p-4"
	style="
		background-image: radial-gradient(at 100% 0%,hsla(135,34%,70%,.14) 0px,transparent 50%),radial-gradient(at 85% 100%,hsla(31,83%,50%,.14) 0px,transparent 50%);
		background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
	"
>
	<div class="relative w-3/4 sm:w-[40%]">
		<img
			alt=""
			src="/boom.png"
			class="absolute bottom-0 left-1/2 -translate-x-1/2"
			width="370"
		/>
		<img
			alt=""
			src="/zesty.png"
			class="relative"
		/>
		<img
			alt=""
			class="absolute bottom-0 right-0 -mr-4 w-[40%]"
			src="/plus.png"
		/>
	</div>

	<div
		class="flex flex-col gap-4 px-12 py-4 text-xs text-white opacity-80 sm:flex-row sm:gap-12 md:text-sm"
	>
		<div class="flex items-center gap-2">
			<img
				width="50"
				alt=""
				src="/explode.png"
			/>
			<p class="w-36">
				zesty.plus is a <br /><strong class="text-primary-500"
					>music visualizer</strong
				>
			</p>
		</div>

		<div class="flex items-center gap-2">
			<img
				width="50"
				alt=""
				src="/mic.png"
			/>
			<p class="w-40">
				it will request <strong class="text-tertiary-500"
					>microphone access</strong
				>
			</p>
		</div>

		<div class="flex items-center gap-2">
			<img
				width="50"
				alt=""
				src="/shh.png"
			/>
			<p class="w-32">
				all data stays on <strong class="text-success-500">your machine</strong>
			</p>
		</div>
	</div>

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
