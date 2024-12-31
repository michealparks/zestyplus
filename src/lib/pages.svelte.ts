import { goto } from '$app/navigation'

export const modules = import.meta.glob('../routes/**/*.*')
export const omit = ['just4jon', 'tubeman']

export const pages = [
	...new Set(
		Object.keys(modules)
			.map((path) => path.split('/')[2])
			.filter((path) => !path.startsWith('+'))
			.filter((path) => !omit.includes(path))
	),
]

export const transitionPage = (direction: 1 | -1) => {
	const currentPage = window.location.pathname.replace('/', '')
	const currentIndex = pages.findIndex((page) => page === currentPage)

	let nextIndex = currentIndex + direction

	if (nextIndex === -1) {
		nextIndex = pages.length - 1
	} else if (nextIndex === pages.length) {
		nextIndex = 0
	}

	let nextPage = `/${pages[nextIndex]}`

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
