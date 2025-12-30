import { token } from './token'

// https://api.spotify.com/v1/playlists/{playlist_id}
export const fetchPlaylistDetails = async (playlistID: string) => {
	const url = `https://api.spotify.com/v1/playlists/${playlistID}`

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token.access}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			console.error(
				`fetchPlaylistDetails: ${response.status} - ${response.statusText}`
			)
			return
		}

		return response.json()
	} catch (error) {
		console.error(error)
	}
}
