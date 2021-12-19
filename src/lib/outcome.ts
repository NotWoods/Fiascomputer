export enum OutcomeType {
	POSITIVE = 'positive',
	NEGATIVE = 'negative'
}

export interface OutcomeDetails {
	type: OutcomeType;
	value?: number;
}

export function outcomeName(type: OutcomeType) {
	return type.charAt(0).toLocaleUpperCase() + type.slice(1);
}
