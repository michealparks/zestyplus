export const modules = import.meta.glob('../routes/**/*.*')

export const pages = Object.keys(modules)
	.map((path) => {
		return path.split('/')[2]
	})
	.filter((path) => {
		return !path.startsWith('+')
	})
