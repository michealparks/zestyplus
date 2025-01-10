export const Keybindings = {
	CostcoMode: 'c',
	Debug: 'd',
	QRCode: 'q',
	Settings: 's',
	TrackInfo: 't',
	Studio: '`',
	Fullscreen: 'f',
	PreviousPage: 'arrowleft',
	NextPage: 'arrowright',
} as const

const keybindingCallbacks = new Map<string, () => void>()

let hasKeyListener = false

export const useKeybinding = (binding: string, callback: () => void) => {
	if (hasKeyListener === false) {
		const triggerCallbacks = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase()
			keybindingCallbacks.get(key)?.()
		}

		$effect(() => {
			hasKeyListener = true
			window.addEventListener('keydown', triggerCallbacks, { passive: true })
			return () => {
				hasKeyListener = false
				window.addEventListener('keydown', triggerCallbacks)
			}
		})
	}

	$effect(() => {
		keybindingCallbacks.set(binding, callback)
		return () => keybindingCallbacks.delete(binding)
	})
}
