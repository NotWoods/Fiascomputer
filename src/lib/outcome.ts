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

function sum(a: number, b: number) {
	return a + b;
}

function getOutcomeValue(details: OutcomeDetails) {
	return details.value ?? 0;
}

export function sumOutcomes(outcomes: readonly OutcomeDetails[] = []) {
	const positiveTotal = outcomes
		.filter((outcome) => outcome.type === OutcomeType.POSITIVE)
		.map(getOutcomeValue)
		.reduce(sum, 0);
	const negativeTotal = outcomes
		.filter((outcome) => outcome.type === OutcomeType.NEGATIVE)
		.map(getOutcomeValue)
		.reduce(sum, 0);

	if (positiveTotal >= negativeTotal) {
		return {
			type: OutcomeType.POSITIVE,
			value: positiveTotal - negativeTotal
		};
	} else {
		return {
			type: OutcomeType.NEGATIVE,
			value: negativeTotal - positiveTotal
		};
	}
}
