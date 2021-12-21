import { emptySession, type Session } from '$lib/storage/session';
import type { Unsubscriber } from 'svelte/store';
import { createReducerStore } from './reducers/create-store';
import { connectToDb } from './reducers/db-store';
import { sessionReducer } from './reducers/session-reducer';

let lastSubscription: Unsubscriber;
export function createSessionStore(initialState = emptySession()) {
	const sessionStore = createReducerStore(sessionReducer, initialState);

	lastSubscription?.();
	lastSubscription = connectToDb({
		store: sessionStore,
		objectStoreName: 'sessions',
		validate: (session): session is Session => session.playset != undefined
	});

	return sessionStore;
}
