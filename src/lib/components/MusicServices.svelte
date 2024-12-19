<script lang="ts">
	import { useAuth } from '$lib'

	const { authenticated, login, logout } = useAuth()
</script>

{#snippet Button(text: string, onclick: () => void)}
	<button
		class="bg-slate-600 px-2 py-0.5 text-xs text-slate-100"
		{onclick}
	>
		{text}
	</button>
{/snippet}

<div class="absolute bottom-0 left-0">
	{#if authenticated.current === 'pending'}
		...
	{:else if authenticated.current === 'logged-in'}
		{@render Button('Logout', () => logout())}
	{:else if authenticated.current === 'logged-out'}
		{@render Button('Login', () => login())}
	{/if}
</div>
