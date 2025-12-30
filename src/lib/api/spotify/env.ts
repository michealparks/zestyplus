// your clientId
export const clientId = 'c80e549f03864691a94b026c06619501'

// your redirect URL - must be localhost URL and/or HTTPS
export const redirectUrl = import.meta.env.DEV
	? 'https://0.0.0.0:3000/'
	: 'https://zesty.plus'

export const authorizationEndpoint = 'https://accounts.spotify.com/authorize'
export const tokenEndpoint = 'https://accounts.spotify.com/api/token'

export const scope = [
	'user-read-private',
	'user-read-email',
	'user-read-playback-state',
	'user-read-currently-playing',
].join(' ')
