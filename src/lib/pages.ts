export const omit = ['tubeman']

export const modules = import.meta.glob('../routes/**/*.*')

export const pages = Object.keys(modules)
	.map((path) => path.split('/')[2])
	.filter((path) => !path.startsWith('+'))
	.filter((path) => !omit.includes(path))
