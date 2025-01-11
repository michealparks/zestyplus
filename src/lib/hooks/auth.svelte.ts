import { browser } from '$app/environment'

// your clientId
const clientId = 'c80e549f03864691a94b026c06619501'

// your redirect URL - must be localhost URL and/or HTTPS
const redirectUrl = import.meta.env.DEV
	? 'http://localhost:5173'
	: 'https://zesty.plus'

const authorizationEndpoint = 'https://accounts.spotify.com/authorize'
const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const scope = [
	'user-read-private',
	'user-read-email',
	'user-read-playback-state',
	'user-read-currently-playing',
].join(' ')

export interface Token {
	access: string
	refresh: string
	expiresIn: string
	expires: string
}

const token: Token = {
	get access() {
		return localStorage.getItem('access_token') ?? ''
	},
	get refresh() {
		return localStorage.getItem('refresh_token') ?? ''
	},
	get expiresIn() {
		return localStorage.getItem('refresh_in') ?? ''
	},
	get expires() {
		return localStorage.getItem('expires') ?? ''
	},
}

const saveToken = (nextToken: {
	access_token: string
	refresh_token: string
	expires_in: string
}) => {
	const { access_token, refresh_token, expires_in } = nextToken
	localStorage.setItem('access_token', access_token)
	localStorage.setItem('refresh_token', refresh_token)
	localStorage.setItem('expires_in', expires_in)

	const now = Date.now()
	const expiry = new Date(now + Number(expires_in) * 1000)
	localStorage.setItem('expires', expiry.toString())
}

const redirectToSpotifyAuthorize = async () => {
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const randomValues = crypto.getRandomValues(new Uint8Array(64))
	const randomString = randomValues.reduce(
		(acc, x) => acc + possible[x % possible.length],
		''
	)
	const codeVerifier = randomString
	const data = new TextEncoder().encode(codeVerifier)
	const hashed = await crypto.subtle.digest('SHA-256', data)

	const code_challenge_base64 = btoa(
		String.fromCharCode(...new Uint8Array(hashed))
	)
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')

	window.localStorage.setItem('code_verifier', codeVerifier)

	const authUrl = new URL(authorizationEndpoint)
	const params = {
		response_type: 'code',
		client_id: clientId,
		scope: scope,
		code_challenge_method: 'S256',
		code_challenge: code_challenge_base64,
		redirect_uri: redirectUrl,
	}

	authUrl.search = new URLSearchParams(params).toString()

	// Redirect the user to the authorization server for login
	window.location.href = authUrl.toString()
}

// Soptify API Calls
const getToken = async (code: string) => {
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

	saveToken(nextToken)
}

const getUserData = async () => {
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${token.access}` },
	})

	return response.json()
}

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

export const fetchAuthCode = async (): Promise<
	LoggedInState | LoggedOutState
> => {
	// On page load, try to fetch auth code from current browser search URL
	const args = new URLSearchParams(window.location.search)
	const code = args.get('code')

	// If we find a code, we're in a callback, do a token exchange
	if (code) {
		const nextToken = await getToken(code)
		saveToken(nextToken)

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

class Authenticated {
	current = $state<'pending' | 'logged-in' | 'logged-out'>('pending')
}

const authenticated = new Authenticated()

if (browser) {
	fetchAuthCode().then(({ state }) => {
		authenticated.current = state
	})
}

const context = {
	token,
	authenticated,
	login,
	logout,
}

export const useAuth = () => {
	return context
}
