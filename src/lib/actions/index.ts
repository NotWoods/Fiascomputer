import type * as actions from './actions';

type ActionsFromModule<StarModule extends Record<string, (...args: any) => any>> =
	StarModule extends Record<string, infer Value>
		? Value extends (...args: any) => infer ReturnValue
			? ReturnValue
			: never
		: never;

export type FiascoAction = ActionsFromModule<typeof actions>;

export * from './actions';
