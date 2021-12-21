import type { PlaysetDataWithId } from '$lib/playset';
import type { Unsubscriber } from 'svelte/store';
import { createReducerStore } from './reducers/create-store';
import { connectToDb } from './reducers/db-store';
import { playsetReducer } from './reducers/playset-reducer';

let lastSubscription: Unsubscriber;
export function createPlaysetStore(basePlayset: PlaysetDataWithId) {
	const playsetStore = createReducerStore(playsetReducer, basePlayset);

	lastSubscription?.();
	lastSubscription = connectToDb({
		store: playsetStore,
		objectStoreName: 'playsets',
		validate: (playset): playset is PlaysetDataWithId => playset != undefined
	});

	return playsetStore;
}
