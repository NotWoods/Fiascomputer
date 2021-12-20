import type { PlaysetDataWithId } from '$lib/playset';
import { dbReady } from '$lib/storage/db';
import type { Unsubscriber } from 'svelte/store';
import { debounce } from './helpers';
import { createReducerStore } from './reducers/create-store';
import { playsetReducer } from './reducers/playset-reducer';

let lastSubscription: Unsubscriber;
export function createPlaysetStore(basePlayset: PlaysetDataWithId) {
	const playsetStore = createReducerStore(playsetReducer, basePlayset);

	lastSubscription?.();
	lastSubscription = playsetStore.subscribe(
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

	return playsetStore;
}
