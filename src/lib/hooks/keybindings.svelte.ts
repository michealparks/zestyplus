export const Keybindings = {
	CostcoMode: 'c',
	Wikipedia: 'w',
	Debug: 'd',
	QRCode: 'q',
	Settings: 's',
	TrackInfo: 't',
	Fullscreen: 'f',
	PreviousPage: 'arrowleft',
	NextPage: 'arrowright',
} as const

const keybindingCallbacks = new Map<string, () => void>()

export const provideKeybinding = () => {
	const triggerCallbacks = (event: KeyboardEvent) => {
		const key = event.key.toLowerCase()
		keybindingCallbacks.get(key)?.()
	}

	$effect(() => {
		window.addEventListener('keydown', triggerCallbacks, { passive: true })
		return () => {
			window.addEventListener('keydown', triggerCallbacks)
		}
	})
}

export const useKeybinding = (binding: string, callback: () => void) => {
	$effect(() => {
		keybindingCallbacks.set(binding, callback)
		return () => keybindingCallbacks.delete(binding)
	})
}
