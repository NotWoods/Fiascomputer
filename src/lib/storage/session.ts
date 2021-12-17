import type { CardType } from '$lib/components/FiascoCard/card-type';
import type { TableIndex } from './playset';

export function range<T>(length: number, map: (index: number) => T): T[] {
	return Array.from({ length }, (_, index) => map(index));
}

export interface CardDetails {
	table: CardType | undefined;
	category: TableIndex | undefined;
	element: TableIndex | undefined;
}

export interface Pair {
	relationship: CardDetails & { table: 'relationship' };
	detail: CardDetails;
}

export interface Player {
	name: string;
}

export interface Session {
	playset: string | undefined;
	players: readonly Player[];
	pairs: readonly Pair[];
}

const MAX_PLAYERS = 5;

export function emptyPlayer(num: number): Player {
	return {
		name: `Player ${num}`
	};
}

export function emptySession(playset?: string): Session {
	return {
		playset,
		players: range(MAX_PLAYERS, (i) => emptyPlayer(i + 1)),
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
