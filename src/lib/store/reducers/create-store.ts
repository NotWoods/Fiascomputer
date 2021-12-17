import { writable, type Readable } from 'svelte/store';

export interface ReducerStore<State, Action> extends Readable<State> {
	dispatch(action: Action): void;
}

export function createReducerStore<State, Action>(
	reducer: (state: State, action: Action) => State,
	initialState: State
): ReducerStore<State, Action> {
	const store = writable(initialState);
	return {
		subscribe: store.subscribe,
		dispatch(action) {
			store.update((state) => reducer(state, action));
			console.info(action)
		}
	};
}
