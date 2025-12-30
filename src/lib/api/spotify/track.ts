import { token } from './token'

const statuses = {
	NO_TRACK_PLAYING: 204,
} as const

export interface TrackInfo {
	context?: {
		external_urls?: { spotify?: string }
		href: string
		type: string
		uri: string
	}
	item: {
		id: string
		name: string
		album: {
			name: string
			images: [
				{
					height: number
					width: number
					url: string
				},
			]
			external_urls: { spotify: string }
		}
		artists: [
			{
				name: string
				external_urls: { spotify: string }
			},
		]
		duration_ms: number
		external_urls: { spotify: string }
	}
	progress_ms: number
}

export const fetchCurrentlyPlayingTrack = async (): Promise<
	TrackInfo | undefined
> => {
	const url = 'https://api.spotify.com/v1/me/player/currently-playing'

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token.access}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.status === statuses.NO_TRACK_PLAYING) {
			console.log('No track is currently playing.')
			return
		}

		if (!response.ok) {
			console.error(
				`fetchCurrentlyPlayingTrack: ${response.status} - ${response.statusText}`
			)
			return
		}

		return response.json()
	} catch (error) {
		console.error('Error fetching currently playing track:', error)
	}
}
