export interface Token {
	access: string
	refresh: string
	expiresIn: string
	expires: string
	save: (nextToken: {
		access_token: string
		refresh_token: string
		expires_in: string
	}) => void
}

const save = (nextToken: {
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

export const token: Token = {
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
	save,
}
