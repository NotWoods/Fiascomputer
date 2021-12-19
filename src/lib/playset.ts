import { loadPlayset } from './actions';
import { loadStoredPlayset, loadBundledPlayset } from './storage/playset';
import type { Playset, PlaysetData } from './storage/playset';
import { playsetStore } from './store';
import { dbReady } from './storage/db';

export function playsetLink(playset: Playset) {
	return `/playsets/${encodeURIComponent(playset.id)}`;
}

export function playsetShortCode(playset: PlaysetData) {
	return playset.title
		.split(/\s+/g)
		.map((word) => word.charAt(0).toLocaleUpperCase())
		.join('');
}

export function getTable(playset: PlaysetData, type: string) {
	return playset.tables[type] || playset.tables[`${type}s`];
}

export * from './storage/playset';

interface LoadKnownPlaysetOptions {
	fetch?: typeof fetch;
	loadPages?: boolean;
}

let lastLoadedId: string | undefined;
let lastLoadedSet: Playset | undefined;
export async function loadKnownPlayset(
	id: string,
	options: LoadKnownPlaysetOptions = {}
): Promise<Playset> {
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
	const { thumbnail, pages, ...playset } = loaded;
	playsetStore.dispatch(loadPlayset(playset));
	lastLoadedId = id;
	lastLoadedSet = loaded;
	return loaded;
}
