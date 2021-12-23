import { writable, type Readable } from 'svelte/store';

export interface ReducerStore<State, Action> extends Readable<State> {
	dispatch(action: Action): Promise<void>;
}

export function createReducerStore<State, Action>(
	reducer: (state: State, action: Action) => State,
	options: {
		initialState: State;
		afterUpdate?: (state: State) => void | PromiseLike<void>;
	}
): ReducerStore<State, Action> {
	const { initialState, afterUpdate } = options;
	const store = writable(initialState);
	return {
		subscribe: store.subscribe,
		dispatch(action) {
			let lastUpdate: State | undefined;
			store.update((state) => {
				const newState = reducer(state, action);
				lastUpdate = newState;
				return newState;
			});
			return Promise.resolve(afterUpdate?.(lastUpdate!));
		}
	};
}
