export enum OutcomeType {
	POSITIVE = 'positive',
	NEGATIVE = 'negative'
}

export interface OutcomeDetails {
  type: OutcomeType;
  value?: number;
}
