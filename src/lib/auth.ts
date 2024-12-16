import { get, set, clear } from 'idb-keyval'

const clientId = 'c80e549f03864691a94b026c06619501' // your clientId
const redirectUrl = 'http://localhost:5173' // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = 'https://accounts.spotify.com/authorize'
const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const scope =
	'user-read-private user-read-email user-read-playback-state user-read-currently-playing'

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
	get access_token() {
		return localStorage.getItem('access_token') || null
	},
	get refresh_token() {
		return localStorage.getItem('refresh_token') || null
	},
	get expires_in() {
		return localStorage.getItem('refresh_in') || null
	},
	get expires() {
		return localStorage.getItem('expires') || null
	},

	save: function (response: { access_token: string; refresh_token: string; expires_in: string }) {
		const { access_token, refresh_token, expires_in } = response
		localStorage.setItem('access_token', access_token)
		localStorage.setItem('refresh_token', refresh_token)
		localStorage.setItem('expires_in', expires_in)

		const now = new Date()
		const expiry = new Date(now.getTime() + expires_in * 1000)
		localStorage.setItem('expires', expiry.toString())
	},
}

async function redirectToSpotifyAuthorize() {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const randomValues = crypto.getRandomValues(new Uint8Array(64))
	const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], '')
	const code_verifier = randomString
	const data = new TextEncoder().encode(code_verifier)
	const hashed = await crypto.subtle.digest('SHA-256', data)

	const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')

	window.localStorage.setItem('code_verifier', code_verifier)

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
	window.location.href = authUrl.toString() // Redirect the user to the authorization server for login
}

// Soptify API Calls
const getToken = async (code: string) => {
	const code_verifier = localStorage.getItem('code_verifier')

	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirectUrl ?? '',
			code_verifier: code_verifier ?? '',
		}),
	})

	const token = await response.json()

	console.log('token', token)

	return token
}

const refreshToken = async () => {
	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: 'refresh_token',
			refresh_token: currentToken.refresh_token ?? '',
		}),
	})

	return await response.json()
}

async function getUserData() {
	const response = await fetch('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${currentToken.access_token}`,
		},
	})

	return await response.json()
}

export const fetchAuthCode = async () => {
	// On page load, try to fetch auth code from current browser search URL
	const args = new URLSearchParams(window.location.search)
	const code = args.get('code')

	// If we find a code, we're in a callback, do a token exchange
	if (code) {
		const token = await getToken(code)
		currentToken.save(token)

		// Remove code from URL so we can refresh correctly.
		const url = new URL(window.location.href)
		url.searchParams.delete('code')

		const updatedUrl = url.search ? url.href : url.href.replace('?', '')
		window.history.replaceState({}, document.title, updatedUrl)
	}

	// If we have a token, we're logged in, so fetch user data and render logged in template
	if (currentToken.access_token) {
		const userData = await getUserData()
		return { state: 'logged-in', userData } as const
	}

	// Otherwise we're not logged in, so render the login template
	return { state: 'logged-out' } as const
}

export async function fetchCurrentlyPlayingTrack() {
	const url = 'https://api.spotify.com/v1/me/player/currently-playing'

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${currentToken.access_token}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.status === 204) {
			console.log('No track is currently playing.')
			return null
		}

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`)
		}

		const data = await response.json()
		console.log('Currently Playing:', data)

		// Extract the track ID
		const trackId = data.item.id
		console.log('Track ID:', trackId)

		return data as {
			item: {
				id: string
				name: string
				album: {
					images: [
						{
							height: number
							width: number
							url: string
						},
					]
				}
				artists: [{ name: string }]
				duration_ms: number
			}
			progress_ms: number
		}
	} catch (error) {
		console.error('Error fetching currently playing track:', error)
	}
}

export async function fetchAudioAnalysis(trackId: string) {
	const cachedResult = await get(`trackid:${trackId}`)

	if (cachedResult) {
		return cachedResult
	}

	const url = `https://api.spotify.com/v1/audio-analysis/${trackId}`

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${currentToken.access_token}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			console.log(response)
			throw new Error(`Error: ${response.status} - ${response.statusText}`)
		}

		const audioAnalysis = await response.json()
		console.log(audioAnalysis)
		set(`trackid:${trackId}`, audioAnalysis)
		return audioAnalysis
	} catch (error) {
		console.error('Error fetching audio analysis:', error)
	}
}

// Click handlers
export async function loginWithSpotifyClick() {
	await redirectToSpotifyAuthorize()
}

export async function logoutClick() {
	localStorage.clear()
	window.location.href = redirectUrl
}

export async function refreshTokenClick() {
	const token = await refreshToken()
	currentToken.save(token)
	console.log('oauth', 'oauth-template', currentToken)
}
