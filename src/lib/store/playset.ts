import type { PlaysetDataWithId } from '$lib/playset';
import { dbReady } from '$lib/storage/db';
import { debounce } from './helpers';
import { createReducerStore } from './reducers/create-store';
import { playsetReducer } from './reducers/playset';

/**
 * Current open playset
 */
export const playsetStore = createReducerStore(playsetReducer, undefined);

playsetStore.subscribe(
	debounce(
		async (playset: PlaysetDataWithId | undefined) => {
			try {
				const db = await dbReady;
				if (playset) {
					db?.put('playsets', playset);
				}
			} catch (err) {
				console.warn('Playset update failure', err);
			}
		},
		10_000,
		true
	)
);
