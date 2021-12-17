import { loadSession } from '$lib/actions';
import { dbReady } from '$lib/storage/db';
import { emptySession } from '$lib/storage/session';
import { playsetStore } from './playset';
import type { ReducerStore } from './reducers/create-store';
import { sessionStore } from './session';

async function loadSessionFromDb(id: string) {
	try {
		const db = await dbReady;
		const session = await db?.get('sessions', id);
		if (session) {
			return session;
		}
	} catch (err) {
		// fall down to default
	}
	return emptySession(id);
}

/**
 * Auto-load a new session when the playset changes.
 */
export function connectReducers() {
	let lastPlaysetId: string | undefined;
	playsetStore.subscribe(async (playset) => {
		if (playset && playset.id !== lastPlaysetId) {
			lastPlaysetId = playset.id;

			const session = await loadSessionFromDb(playset.id);
			sessionStore.dispatch(loadSession(session));
		}
	});

	Object.assign(globalThis as any, { sessionStore, playsetStore });
}

export function bindDispatch<Action, ActionCreator extends (...args: any[]) => Action>(
	store: ReducerStore<unknown, Action>,
	actionCreator: ActionCreator
) {
	return (...args: Parameters<ActionCreator>) => store.dispatch(actionCreator(...args));
}

connectReducers();
export { playsetStore, sessionStore };
