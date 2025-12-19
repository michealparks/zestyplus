import { getContext, setContext } from 'svelte'

// Types for what we return
interface YearEvent {
	date: string // e.g. "January 1"
	description: string // e.g. "Something important happened…"
}

interface Context {
	current: YearEvent[]
}

const WIKI_2025_URL =
	'https://en.wikipedia.org/w/api.php?action=parse&page=2025&prop=text&format=json&formatversion=2&origin=*'

export async function fetch2025Events(): Promise<YearEvent[]> {
	const res = await fetch(WIKI_2025_URL)
	if (!res.ok) {
		throw new Error(`Wikipedia fetch failed: ${res.status}`)
	}

	const data = (await res.json()) as any

	// formatversion=2 → parse.text is a string
	// formatversion=1 → parse.text["*"]
	const html: string =
		typeof data?.parse?.text === 'string'
			? data.parse.text
			: data?.parse?.text?.['*']

	if (!html) return []

	return extract2025EventsFromHtml(html)
}

export async function fetchRandom2025Event(): Promise<YearEvent | null> {
	const events = await fetch2025Events()
	if (!events.length) return null
	const idx = Math.floor(Math.random() * events.length)
	return events[idx]
}

// ---------------------- CORE PARSING ----------------------

export function extract2025EventsFromHtml(html: string): YearEvent[] {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const body = doc.body
	if (!body) return []

	const walker = doc.createNodeIterator(body, NodeFilter.SHOW_ELEMENT)

	let node = walker.nextNode() as Element | null
	let inEventsSection = false
	let events: YearEvent[] = []
	let currentDate = 'Unknown date'

	while (node) {
		if (node.tagName === 'H2') {
			const headingText = normalizeHeadingText(node.textContent || '')

			if (headingText.includes('events')) {
				inEventsSection = true
			} else if (inEventsSection) {
				// we hit the next H2 after Events → leave section
				inEventsSection = false
			}
		} else if (inEventsSection && node.tagName === 'LI') {
			const text = cleanText(node)
			if (text) {
				// First try: clean split "date – description"
				const split = splitDateAndDescription(text)

				if (split.date && split.description) {
					// "October 9 – Something…"
					currentDate = split.date
					events.push({
						date: currentDate,
						description: split.description,
					})
				} else if (isLikelyDateOnly(text)) {
					// Just a date bullet like "October 7"
					currentDate = text
				} else {
					// Description-only bullet... but it might *start* with a date
					const leading = extractLeadingDate(text)

					if (leading) {
						currentDate = leading.date
						if (leading.rest) {
							events.push({
								date: currentDate,
								description: leading.rest,
							})
						}
					} else {
						// Truly date-less description, inherit last date
						events.push({
							date: currentDate,
							description: text,
						})
					}
				}
			}
		}

		node = walker.nextNode() as Element | null
	}

	return events
}

// ---------------------- HELPERS ----------------------

function normalizeHeadingText(text: string): string {
	return text
		.replace(/\[.*?\]/g, '') // strip [edit] etc.
		.trim()
		.toLowerCase()
}

function cleanText(node: Element): string {
	const clone = node.cloneNode(true) as Element

	// Strip footnote refs like [1]
	clone.querySelectorAll('sup.reference').forEach((sup) => sup.remove())

	return (clone.textContent || '').replace(/\s+/g, ' ').trim()
}

/**
 * Split “Date — Description” in a reasonably flexible way.
 * Handles:
 *   "October 9 – Something…"
 *   "October 9 - Something…"
 *   "October 9: Something…"
 */
function splitDateAndDescription(text: string): {
	date: string
	description: string
} {
	const m = text.match(/^(.+?)\s+[–—\-:]\s+(.*)$/)
	if (!m) {
		return { date: '', description: '' }
	}
	return {
		date: m[1].trim(),
		description: m[2].trim(),
	}
}

const MONTHS = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december',
]

function isLikelyDateOnly(text: string): boolean {
	const lower = text.toLowerCase()
	const hasMonth = MONTHS.some((m) => lower.includes(m))
	if (!hasMonth) return false

	// Dates tend to be short; filter out long sentences
	return text.length <= 25
}

/**
 * If a string *starts* with a date, pull it out:
 *   "October 9 Something..."      => { date: "October 9", rest: "Something..." }
 *   "October 9 – Something..."    => { date: "October 9", rest: "Something..." }
 *   "9 October - Something..."    => { date: "9 October", rest: "Something..." }
 */
function extractLeadingDate(
	text: string
): { date: string; rest: string } | null {
	// Try "Month D ..." first
	let m =
		text.match(
			/^(\w+\s+\d{1,2})(?:\s*[–—\-:]\s*|\s+)(.*)$/ // "October 9 – foo" or "October 9 foo"
		) ||
		text.match(
			/^(\d{1,2}\s+\w+)(?:\s*[–—\-:]\s*|\s+)(.*)$/ // "9 October – foo" or "9 October foo"
		)

	if (!m) return null

	const maybeDate = m[1].trim()
	const rest = m[2].trim()

	const lower = maybeDate.toLowerCase()
	const hasMonth = MONTHS.some((month) => lower.includes(month))
	if (!hasMonth) return null

	return {
		date: maybeDate,
		rest,
	}
}

const key = Symbol('wikipedia-context')

export const provideWikipedia = () => {
	let current = $state<YearEvent[]>([])

	$effect(() => {
		fetch2025Events().then((value) => {
			current = value
		})
	})

	const context: Context = {
		get current() {
			return current
		},
	}

	setContext<Context>(key, context)

	return context
}

export const useWikipedia = (): Context => {
	return getContext<Context>(key)
}
