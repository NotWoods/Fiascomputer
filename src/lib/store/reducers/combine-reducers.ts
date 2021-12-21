type Reducer<State, Action> = (state: State, action: Action) => State;

type ReducersMapObject<State = any, Action = any> = {
	[Key in keyof State]: Reducer<State[Key], Action>;
};

type StateFromReducersMapObject<Map> = Map extends ReducersMapObject
	? { [Key in keyof Map]: Map[Key] extends Reducer<infer State, any> ? State : never }
	: never;

export function combineReducers<Action, Reducers extends ReducersMapObject<any, Action>>(
	reducers: Reducers
): Reducer<StateFromReducersMapObject<Reducers>, Action> {
	return function combinedReducer(state, action) {
		const nextState: any = {};
		let anyChanged = false;
		for (const [key, subState] of Object.entries(state)) {
			const nextSubState = reducers[key](subState, action);
			anyChanged ||= nextSubState !== subState;
			nextState[key] = nextState;
		}
		return nextState as StateFromReducersMapObject<Reducers>;
	};
}
