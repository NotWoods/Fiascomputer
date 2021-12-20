import { dbReady } from '$lib/storage/db';
import { emptySession, type Session } from '$lib/storage/session';
import type { Unsubscriber } from 'svelte/store';
import { debounce } from './helpers';
import { createReducerStore } from './reducers/create-store';
import { sessionReducer } from './reducers/session-reducer';

let lastSubscription: Unsubscriber;
export function createSessionStore(initialState = emptySession()) {
	const sessionStore = createReducerStore(sessionReducer, initialState);

	lastSubscription?.();
	lastSubscription = sessionStore.subscribe(
		debounce(
			async (session: Session) => {
				try {
					const db = await dbReady;
					if (session.playset) {
						db?.put('sessions', session);
					}
				} catch (err) {
					console.warn('Session update failure', err);
				}
			},
			10_000,
			true
		)
	);

	return sessionStore;
}
