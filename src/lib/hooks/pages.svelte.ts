import { goto } from '$app/navigation'
import { shuffle } from '../array'
import { modules } from '../../modules'

export const omit: string[] = []

export const pages = [
	...new Set(
		Object.keys(modules)
			.map((path) => path.split('/')[3])
			.filter((path) => path !== undefined && !path.startsWith('+'))
			.filter((path) => !omit.includes(path))
	),
]
console.log(pages)
shuffle(pages)

export const transitionPage = (direction: 1 | -1) => {
	const currentPage = window.location.pathname.replace('/is/', '')
	const currentIndex = pages.findIndex((page) => page === currentPage)

	let nextIndex = currentIndex + direction

	if (nextIndex === -1) {
		nextIndex = pages.length - 1
	} else if (nextIndex === pages.length) {
		nextIndex = 0
	}

	let nextPage = `/is/${pages[nextIndex]}`

	if (nextPage === undefined) {
		nextPage = pages[0]
	}

	goto(nextPage)
}

export const schedulePageCycle = () => {
	const fiveMinutes = 1000 * 60 * 5
	const duration = fiveMinutes + (Math.random() - 0.5) * 2
	return setTimeout(transitionPage, duration, -1)
}
