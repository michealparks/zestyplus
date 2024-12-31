import { preloadCode } from '$app/navigation'
import { pages } from './pages.svelte'

export const preload = () => {
	const toLoad = [...pages]

	const preloadPage = (page: string) => {
		preloadCode(page)

		const nextPage = toLoad.pop()

		if (nextPage !== undefined) {
			setTimeout(preloadPage, 1000, nextPage)
		}
	}

	setTimeout(preloadPage, 1000, toLoad.pop())
}
