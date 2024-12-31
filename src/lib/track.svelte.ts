import { useAuth, type Token } from './auth.svelte'

export interface TrackInfo {
	context?: {
		external_urls?: {
			spotify?: string
		}
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
		}
		artists: [{ name: string }]
		duration_ms: number
	}
	progress_ms: number
}

class Track {
	current = $state<TrackInfo>()
}

const track = new Track()

let effectCreated = false

const statuses = {
	NO_TRACK_PLAYING: 204,
}

const fetchCurrentlyPlayingTrack = async (
	token: Token
): Promise<TrackInfo | undefined> => {
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

const startTrackFetchLoop = async (token: Token) => {
	const response = await fetchCurrentlyPlayingTrack(token)
	track.current = response

	if (response === undefined) {
		setTimeout(startTrackFetchLoop, 3000, token)
		return
	}

	const timeLeft = response.item.duration_ms - response.progress_ms + 1000

	setTimeout(startTrackFetchLoop, timeLeft, token)
}

export const useTrack = () => {
	const { token, authenticated } = useAuth()

	if (!effectCreated) {
		$effect(() => {
			if (authenticated.current === 'logged-in') {
				startTrackFetchLoop(token)
			}
		})

		effectCreated = true
	}

	return {
		track,
	}
}
