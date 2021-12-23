import type { PlaysetDataWithId } from '$lib/playset';
import { createReducerStore } from './reducers/create-store';
import { connectToDb } from './reducers/db-store';
import { playsetReducer } from './reducers/playset-reducer';

export function createPlaysetStore(basePlayset: PlaysetDataWithId) {
	const afterUpdate = connectToDb({
		objectStoreName: 'playsets',
		validate: (playset: PlaysetDataWithId | undefined): playset is PlaysetDataWithId =>
			playset != undefined
	});
	return createReducerStore(playsetReducer, { initialState: basePlayset, afterUpdate });
}
