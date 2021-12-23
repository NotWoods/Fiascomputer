import { emptySession, type Session } from '$lib/storage/session';
import { createReducerStore } from './reducers/create-store';
import { connectToDb } from './reducers/db-store';
import { sessionReducer } from './reducers/session-reducer';

export function createSessionStore(initialState = emptySession()) {
	const afterUpdate = connectToDb({
		objectStoreName: 'sessions',
		validate: (session: Session): session is Session => session.playset != undefined
	});
	return createReducerStore(sessionReducer, { initialState, afterUpdate });
}
