import type { PlaysetAction, SessionAction } from '$lib/actions';
import type { PlaysetDataWithId } from '$lib/playset';
import { emptySession, type Session } from '$lib/storage/session';
import { getContext, setContext } from 'svelte';
import { createPlaysetStore } from './playset';
import type { ReducerStore } from './reducers/create-store';
import { createSessionStore } from './session';

const storeKey = Symbol('stores');

interface StoreContext {
	playset: ReducerStore<PlaysetDataWithId, PlaysetAction>;
	session: ReducerStore<Session, SessionAction>;
}

export function getStoreContext() {
	return getContext(storeKey) as StoreContext;
}

export function setStoreContext(initialState: PlaysetDataWithId, existingSession?: Session) {
	const playsetStore = createPlaysetStore(initialState);
	const sessionStore = createSessionStore(existingSession ?? emptySession(initialState.id));

	const context: StoreContext = { playset: playsetStore, session: sessionStore };
	setContext(storeKey, context);

	return context;
}
