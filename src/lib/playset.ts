import { loadPlayset } from './actions';
import { loadBundledPlayset } from './storage/playset';
import type { Playset, PlaysetData } from './storage/playset';
import { playsetStore } from './store';

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

export async function loadKnownPlayset(id: string, fetch = globalThis.fetch): Promise<Playset> {
	const result = await loadBundledPlayset(id, fetch);
	const { cover, pages, ...playset } = result;
	playsetStore.dispatch(loadPlayset(playset));
	return result;
}
