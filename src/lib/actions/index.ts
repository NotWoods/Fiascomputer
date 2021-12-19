import type * as playsetActions from './playset-actions';
import type * as sessionActions from './session-actions';

type ActionsFromModule<StarModule extends Record<string, (...args: any) => any>> =
	StarModule extends Record<string, infer Value>
		? Value extends (...args: any) => infer ReturnValue
			? ReturnValue
			: never
		: never;

export type PlaysetAction = ActionsFromModule<typeof playsetActions>;
export type SessionAction = ActionsFromModule<typeof sessionActions>;
export type FiascoAction = PlaysetAction | SessionAction;

export * from './playset-actions';
export * from './session-actions';
