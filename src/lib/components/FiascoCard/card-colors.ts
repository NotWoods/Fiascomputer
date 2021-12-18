import type { OutcomeType } from '$lib/outcome';
import type { CardType } from './card-type';
export * from './card-type';

export interface FiascoCardColors {
	top: string;
	left: string;
	bottom: string;
}

export const icons = {
	relationship:
		'm118 25-12 10-10 36 21 10-11 26 2-22-19-7 3-32-1 1-24-19-31 21-4 40 80 67 46-78-5-42-35-11Z',
	location:
		'm71 105-5-18 9-3 7 18-11 3Zm4 16-3-12 10-4 4 12-11 4Zm-20-11-4-19 9-2 7 18-12 3Zm16 12-12 3-3-12 11-3 4 12Zm89-60-42-12V38h-15l1 8-32-9-54 57 16-1 16 47 55-9-13-47 28-7 8 50 27-5-20-54 25-6Z',
	need: 'M112 24 43 51 28 93l81 57 40-92-37-34Zm26 33-26 4 1-21 25 17Zm-30-22-6 24-16-14 22-10ZM96 64l-19 9 2-23 17 14ZM71 53l-7 24-13-22 20-2ZM45 64l11 15-20 4 9-19Zm-7 28 28-6 34 50-62-44Zm35-8 28-10 7 58-35-48Zm40 39-2-49 23-12-21 61Z',
	object:
		'm103 77 2 12-23 15-4-14 9 7 6-3-10-13 17-10 3 6Zm54-31 12-5-9-19-11 4-5-4-7 3 1 6-80 33-3-5-8 5 2 4-8 4 3 23-4 5 14 5-3 46 40-15-7-26 29-16-6-22 52-20-2-6Z'
};

export const cardColors: Record<CardType | OutcomeType, FiascoCardColors> = {
	relationship: {
		top: '#E92F26',
		left: '#AA2F54',
		bottom: '#913821'
	},
	location: {
		top: '#39AE68',
		left: '#D7DF23',
		bottom: '#8CC63F'
	},
	need: {
		top: '#F47541',
		left: '#D3B92A',
		bottom: '#FFCD04'
	},
	object: {
		top: '#51908E',
		left: '#2A4D60',
		bottom: '#88A59B'
	},
	positive: {
		top: '#2c4e5f',
		left: '#fff',
		bottom: '#fff'
	},
	negative: {
		top: '#b72026',
		left: '#fff',
		bottom: '#fff'
	},
};
