import type { UndoAction } from '$lib/actions';

interface UndoState<Base> {
	past: readonly Base[];
	present: Base;
	future: readonly Base[];
}

export function undoable<State, Action>(
	reducer: (state: State, action: Action) => State,
	initialBaseState: State
) {
	const initialState: UndoState<State> = {
		past: [],
		present: initialBaseState,
		future: []
	};

	return function undoReducer(
		state: UndoState<State> = initialState,
		action: Action & UndoAction
	): UndoState<State> {
		switch (action.type) {
			case 'undo': {
				const newPast = state.past.slice();
				const last = newPast.pop();
				if (!last) {
					return state;
				}

				return {
					past: newPast,
					present: last,
					future: [state.present, ...state.future]
				};
			}
			case 'redo': {
				const [next, ...newFuture] = state.future;
				if (!next) {
					return state;
				}

				return {
					past: [...state.past, state.present],
					present: next,
					future: newFuture
				};
			}

			default: {
				const newPresent = reducer(state.present, action);
				if (state.present === newPresent) {
					return state;
				}
				return {
					past: [...state.past, state.present],
					present: newPresent,
					future: []
				};
			}
		}
	};
}
