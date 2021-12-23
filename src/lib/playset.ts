import {
	loadStoredPlayset,
	loadBundledPlayset,
	loadStoredPages,
	type PlaysetDataWithId
} from './storage/playset';
import type { Playset, PlaysetData } from './storage/playset';
import type { CardOrEngineType, CardType } from './components/FiascoCard/card-type';
import type { Engine } from './storage/engine';

export function playsetLink(playset: Playset) {
	return `/playsets/${encodeURIComponent(playset.id)}`;
}

export function playsetShortCode(playset: PlaysetData) {
	return playset.title
		.split(/\s+/g)
		.map((word) => word.charAt(0).toLocaleUpperCase())
		.join('');
}

export function getTable(playset: Pick<PlaysetData, 'tables'>, type: CardType) {
	return playset.tables[type] || playset.tables[`${type}s`];
}

export function getPlaysetOrEngineTable(
	playset: PlaysetData,
	engine: Engine | undefined,
	type: CardOrEngineType
) {
	if (type === 'tilt') {
		return engine?.tilt;
	} else {
		return getTable(playset, type);
	}
}

export * from './storage/playset';

interface LoadKnownPlaysetOptions {
	fetch?: typeof fetch;
	loadPages?: boolean;
}

let lastLoadedId: string | undefined;
let lastLoadedSet: PlaysetDataWithId | undefined;
export async function loadKnownPlayset(
	id: string,
	options: LoadKnownPlaysetOptions = {}
): Promise<PlaysetDataWithId | undefined> {
	if (id === lastLoadedId) {
		return lastLoadedSet!;
	}
	const { loadPages = false, fetch = globalThis.fetch } = options;
	const stored = await loadStoredPlayset(id, loadPages);
	if (stored) {
		lastLoadedId = id;
		lastLoadedSet = stored;
		return stored;
	}

	const loaded = await loadBundledPlayset(id, fetch);
	if (!loaded) return undefined;
	const { thumbnail, pages, ...playset } = loaded;
	lastLoadedId = id;
	lastLoadedSet = playset;
	return playset;
}

let lastLoadedPagesId: string | undefined;
let lastLoadedPages: Playset['pages'] | undefined;
export async function loadKnownPages(id: string, options: LoadKnownPlaysetOptions = {}) {
	if (id === lastLoadedPagesId) {
		return lastLoadedPages!;
	}
	const { fetch = globalThis.fetch } = options;
	const stored = await loadStoredPages(id);
	if (stored) {
		lastLoadedPagesId = id;
		lastLoadedPages = stored;
		return stored;
	}

	const loaded = await loadBundledPlayset(id, fetch);
	if (!loaded) return undefined;
	const { pages } = loaded;
	lastLoadedPagesId = id;
	lastLoadedPages = pages;
	return pages;
}
