import { getContext, setContext } from 'svelte'
import { useSpotify } from '$lib/api/spotify/auth.svelte'
import {
	type TrackInfo,
	fetchCurrentlyPlayingTrack,
} from '$lib/api/spotify/track'
import { fetchPlaylistDetails } from '$lib/api/spotify/playlist'

interface Context {
	current: TrackInfo | undefined
}

const key = Symbol('current-track-context')

const fetchPlaylistMetadata = true

export const provideTrack = () => {
	let timerID = 0
	let current = $state.raw<TrackInfo>()
	let playlistID = $state<string>()

	const fetchTrack = async () => {
		try {
			const response = await fetchCurrentlyPlayingTrack()
			current = response
		} catch {
			current = undefined
		}

		if (current === undefined) {
			timerID = setTimeout(fetchTrack, 3000)
			return
		}

		if (current.context?.type === 'playlist') {
			const id = current.context.uri.split(':').at(-1)

			if (id !== playlistID) {
				playlistID
			}
			playlistID = current.context.uri.split(':').at(-1)
		}

		const timeLeft = current.item.duration_ms - current.progress_ms + 1000

		timerID = setTimeout(fetchTrack, timeLeft)
	}

	const spotify = useSpotify()

	$effect(() => {
		if (spotify.authState !== 'logged-in') {
			return
		}

		fetchTrack()
		return () => clearTimeout(timerID)
	})

	if (fetchPlaylistMetadata) {
		$effect(() => {
			if (playlistID) {
				fetchPlaylistDetails(playlistID).then((playlist) => {
					let elapsed = 0

					const results = []
					for (const { track } of playlist.tracks.items) {
						const result = {
							name: track.name,
							startTime: elapsed / 1000 / 60,
						}

						elapsed += track.duration_ms

						results.push(result)
					}

					console.log(results)
				})
			}
		})
	}

	setContext<Context>(key, {
		get current() {
			return current
		},
	})
}

export const useTrack = (): Context => {
	return getContext<Context>(key)
}
