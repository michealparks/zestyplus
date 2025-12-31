import { PersistedState } from 'runed'
import { getContext, setContext } from 'svelte'
import { Keybindings, useKeybinding } from './keybindings.svelte'

const key = Symbol('settings-context')

interface Context {
	showTrackInfo: PersistedState<boolean>
	showQR: PersistedState<boolean>
	showFacts: PersistedState<boolean>
	showDebug: PersistedState<boolean>
	showCostco: PersistedState<boolean>
	showWikipedia: PersistedState<boolean>
}

export const provideSettings = () => {
	const showTrackInfo = new PersistedState('trackinfo-visible', true)
	const showQR = new PersistedState('show-playlist-qr-code', false)
	const showFacts = new PersistedState('show-facts', false)
	const showDebug = new PersistedState('show-debug', false)
	const showCostco = new PersistedState('show-costco', false)
	const showWikipedia = new PersistedState('show-wikipedia', false)

	useKeybinding(Keybindings.QRCode, () => {
		showQR.current = !showQR.current
	})

	useKeybinding(
		Keybindings.TrackInfo,
		() => (showTrackInfo.current = !showTrackInfo.current)
	)

	useKeybinding(
		Keybindings.CostcoMode,
		() => (showCostco.current = !showCostco.current)
	)

	useKeybinding(
		Keybindings.Debug,
		() => (showDebug.current = !showDebug.current)
	)

	useKeybinding(
		Keybindings.Wikipedia,
		() => (showWikipedia.current = !showWikipedia.current)
	)

	setContext<Context>(key, {
		showTrackInfo,
		showQR,
		showFacts,
		showDebug,
		showCostco,
		showWikipedia,
	})
}

export const useSettings = (): Context => {
	return getContext<Context>(key)
}
