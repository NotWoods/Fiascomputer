import type { DetailType } from '$lib/components/FiascoCard/card-type';
import type { CardDetails } from '$lib/deck';
import type { OutcomeDetails } from '$lib/outcome';

export function range<T>(length: number, map: (index: number) => T): T[] {
	return Array.from({ length }, (_, index) => map(index));
}

export type { CardDetails };

export interface Pair {
	relationship: CardDetails<'relationship' | undefined>;
	detail: CardDetails<DetailType | undefined>;
}

export interface Player {
	name: string;
	outcomes: readonly OutcomeDetails[];
}

export interface Session {
	playset: string | undefined;
	players: readonly Player[];
	pairs: readonly Pair[];
}

const MIN_PLAYERS = 5;
const MAX_PLAYERS = 5;

export function emptyPlayer(num: number): Player {
	return {
		name: `Player ${num}`,
		outcomes: []
	};
}

export function emptySession(playset?: string): Session {
	return {
		playset,
		players: range(MIN_PLAYERS, (i) => emptyPlayer(i + 1)),
		pairs: range(MAX_PLAYERS, () => {
			return {
				relationship: {
					table: 'relationship',
					category: undefined,
					element: undefined
				},
				detail: {
					table: undefined,
					category: undefined,
					element: undefined
				}
			};
		})
	};
}
