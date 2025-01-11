export const useDocumentTitle = () => {
	$effect(() => {
		let pattern = 0

		const emptyTitle = '_______________'.split('')
		const title1 = '_____zesty_____'.split('')
		const title2 = '____p_l_u_s____'.split('')

		const pattern1 = () => {
			const last = title1.pop()
			title1.unshift(last!)
			document.title = title1.join('')
		}

		const pattern2 = () => {
			document.title =
				document.title === emptyTitle.join('')
					? title2.join('')
					: emptyTitle.join('')
		}

		const patterns = [pattern1, pattern2]

		const id1 = setInterval(() => {
			patterns[pattern]()
		}, 300)

		const id2 = setInterval(() => {
			pattern = pattern === 0 ? 1 : 0
		}, 2000)

		return () => {
			clearInterval(id1)
			clearInterval(id2)
		}
	})
}
