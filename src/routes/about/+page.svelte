<script>
	import { resolve } from '$app/paths'
</script>

<div
	class="absolute top-0 left-0 grid h-screen w-screen place-content-center"
	style="
		background-image: radial-gradient(at 100% 0%,hsla(135,34%,70%,.14) 0px,transparent 50%),radial-gradient(at 85% 100%,hsla(31,83%,50%,.14) 0px,transparent 50%);
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	"
>
	<div class="flex max-w-120 flex-col gap-2 p-4 text-white">
		<p>
			<strong class="text-error-500">zesty.plus</strong> is a music visualizer,
			inspired by what iTunes - or winamp - did back in the days of yore. What
			it does is simple: analyze incoming microphone data and produce fun
			doodles from it. It also has optional music service integration features,
			but that stuff isn't required if you just want a
			<strong class="text-primary-500">pure</strong>,
			<strong class="text-warning-500">organic</strong>,
			<strong class="text-success-500">regenerative</strong> experience.
		</p>

		<div class="flex gap-2">
			<a
				class="btn btn-sm variant-gradient-warning-error flex items-center gap-1 bg-linear-to-br"
				href={resolve('/')}
			>
				<span class="text-xs">←</span>
			</a>
			<a
				class="btn btn-sm variant-gradient-warning-error flex items-center gap-1 bg-linear-to-br"
				href={resolve('/is/lines')}
			>
				<span class="text-xs">get zesty</span> 🤌
			</a>
		</div>

		<div class="flex flex-col gap-2 pt-12 text-sm">
			<div>
				Emojis by <a
					class="code"
					href="https://emojikitchen.dev/"
					target="_blank">Emoji Kitchen</a
				>
			</div>
			<div>
				Hot dog model by <a
					class="code"
					href="https://skfb.ly/oqMWM"
					target="_blank">TadenStar</a
				>
			</div>
			<div>
				Powered by <a
					class="code"
					target="_blank"
					href="https://svelte.dev">Svelte</a
				>
				and
				<a
					class="code"
					target="_blank"
					href="https://threlte.xyz">Threlte</a
				>
			</div>
		</div>
	</div>
</div>
