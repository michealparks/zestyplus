import { getContext, setContext } from 'svelte'
import {
	authorizationEndpoint,
	tokenEndpoint,
	clientId,
	scope,
	redirectUrl,
} from './env'
import { token, type Token } from './token'

interface LoggedInState {
	state: 'logged-in'
	userData: unknown
}

interface LoggedOutState {
	state: 'logged-out'
}

const sleep = async (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms)
	})

const sha256 = async (plain: string) => {
	const encoder = new TextEncoder()
	const data = encoder.encode(plain)
	return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input: ArrayBuffer) => {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}

const generateRandomString = (length: number) => {
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const values = crypto.getRandomValues(new Uint8Array(length))
	return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

const redirectToSpotifyAuthorize = async () => {
	const codeVerifier = generateRandomString(64)

	const hashed = await sha256(codeVerifier)
	const codeChallenge = base64encode(hashed)

	const authUrl = new URL(authorizationEndpoint)

	window.localStorage.setItem('code_verifier', codeVerifier)

	const params = {
		response_type: 'code',
		client_id: clientId,
		scope,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
		redirect_uri: redirectUrl,
	}

	authUrl.search = new URLSearchParams(params).toString()

	// Redirect the user to the authorization server for login
	window.location.href = authUrl.toString()
}

// Soptify API Calls
export const getToken = async (code: string) => {
	const code_verifier = localStorage.getItem('code_verifier')

	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirectUrl ?? '',
			code_verifier: code_verifier ?? '',
		}),
	})

	const token = await response.json()

	return token
}

const refreshToken = async () => {
	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: 'refresh_token',
			refresh_token: token.refresh ?? '',
		}),
	})

	const nextToken = await response.json()

	if (nextToken.error) {
		return true
	}

	token.save(nextToken)
}

const getUserData = async () => {
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${token.access}` },
	})

	return response.json()
}

export const fetchAuthCode = async (): Promise<
	LoggedInState | LoggedOutState
> => {
	// On page load, try to fetch auth code from current browser search URL
	const args = new URLSearchParams(window.location.search)
	const code = args.get('code')

	// If we find a code, we're in a callback, do a token exchange
	if (code) {
		const nextToken = await getToken(code)
		token.save(nextToken)

		// Remove code from URL so we can refresh correctly.
		const url = new URL(window.location.href)
		url.searchParams.delete('code')

		const updatedUrl = url.search ? url.href : url.href.replace('?', '')
		window.history.replaceState({}, document.title, updatedUrl)
	}

	// If we have a token, we're logged in
	if (token.access) {
		const userData = await getUserData()

		// Handle expired
		if (userData.error?.status === 401) {
			const error = await refreshToken()

			if (error) {
				return { state: 'logged-out' } as const
			}

			await sleep(2000)
			return fetchAuthCode()
		}

		return { state: 'logged-in', userData } as const
	}

	// Otherwise we're not logged in
	return { state: 'logged-out' } as const
}

// Click handlers
export const login = () => {
	return redirectToSpotifyAuthorize()
}

export const logout = async () => {
	localStorage.clear()
	window.location.href = redirectUrl
}

const key = Symbol('spotify-context-key')

interface Context {
	token: Token
	login: () => Promise<void>
	logout: () => Promise<void>
	authState: 'pending' | 'logged-in' | 'logged-out'
}

export const provideSpotify = () => {
	let authState = $state<Context['authState']>('pending')

	$effect(() => {
		fetchAuthCode().then(({ state }) => {
			authState = state
		})
	})

	const context: Context = {
		token,
		login,
		logout,
		get authState() {
			return authState
		},
	}

	setContext<Context>(key, context)

	return context
}

export const useSpotify = (): Context => {
	return getContext<Context>(key)
}
