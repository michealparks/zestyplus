<script lang="ts">
	import {
		fetchAuthCode,
		fetchCurrentlyPlayingTrack,
		loginWithSpotifyClick,
		logoutClick,
	} from '$lib/auth'
	import { startAudioAnalyser } from '$lib/visualizer'
	import { Canvas } from '@threlte/core'
	import '../app.css'
	import Scene from './Scene.svelte'
	let { children } = $props()

	let loginState = $state<'fetching' | 'logged-in' | 'logged-out'>('fetching')

	const getLoginState = async () => {
		const response = await fetchAuthCode()
		console.log(response)

		loginState = response.state ?? 'unknown'

		if (response?.state === 'logged-in') {
			const response = await fetchCurrentlyPlayingTrack()
			song = response?.item.name
			artist = response?.item.artists[0].name
		}
	}

	let canvas: HTMLCanvasElement

	let song = $state('')
	let artist = $state('')

	$effect(() => void getLoginState())

	$effect(() => {
		void startAudioAnalyser(canvas)
	})
</script>

{@render children()}

<canvas
	height="50"
	width="50"
	bind:this={canvas}
></canvas>

<div class="absolute left-0 top-0 h-screen w-screen">
	<Canvas>
		<Scene
			{song}
			{artist}
		/>
	</Canvas>
</div>

{#snippet Button(text: string, onclick: () => void)}
	<button
		class="bg-slate-600 px-2 py-0.5 text-slate-100"
		{onclick}
	>
		{text}
	</button>
{/snippet}

<div class="absolute bottom-0 left-0">
	{#if loginState === 'fetching'}
		...
	{:else if loginState === 'logged-in'}
		{@render Button('Logout', () => logoutClick())}
	{:else if loginState === 'logged-out'}
		{@render Button('Login', () => loginWithSpotifyClick())}
	{/if}
</div>
