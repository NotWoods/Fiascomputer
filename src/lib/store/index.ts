import type { ReducerStore } from './reducers/create-store';

export { getStoreContext } from './context';

export function bindDispatch<Action, ActionCreator extends (...args: any[]) => Action>(
	store: ReducerStore<unknown, Action>,
	actionCreator: ActionCreator
) {
	return (...args: Parameters<ActionCreator>) => store.dispatch(actionCreator(...args));
}
