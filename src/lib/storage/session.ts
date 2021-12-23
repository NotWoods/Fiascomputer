import type { CardOrEngineType, DetailType } from '$lib/components/FiascoCard/card-type';
import type { CardDetails } from '$lib/deck';
import type { OutcomeDetails } from '$lib/outcome';
import { dbReady } from './db';

export function range<T>(length: number, map: (index: number) => T): T[] {
	return Array.from({ length }, (_, index) => map(index));
}

export type { CardDetails };

export interface Pair {
	relationship: CardDetails<'relationship'>;
	detail: CardDetails<DetailType | undefined>;
}

export interface Player {
	name: string;
	character: string;
	outcomes: readonly OutcomeDetails[];
	hand: ReadonlySet<CardDetails>;
}

export interface Session {
	playset: string | undefined;
	players: readonly Player[];
	pairs: readonly Pair[];
	tilts: {
		positive: CardDetails<'tilt'>;
		negative: CardDetails<'tilt'>;
	};
}

const MIN_PLAYERS = 5;
const MAX_PLAYERS = 5;

export function emptyPlayer(num: number): Player {
	return {
		name: `Player ${num}`,
		character: '',
		outcomes: [],
		hand: new Set()
	};
}

export function emptyCardDetails<Type extends CardOrEngineType | undefined>(
	table: Type
): CardDetails<Type> {
	return {
		table,
		category: undefined,
		element: undefined
	};
}

export function emptySession(playset?: string): Session {
	return {
		playset,
		players: range(MIN_PLAYERS, (i) => emptyPlayer(i + 1)),
		pairs: range(MAX_PLAYERS, () => {
			return {
				relationship: emptyCardDetails('relationship'),
				detail: emptyCardDetails(undefined)
			};
		}),
		tilts: {
			positive: emptyCardDetails('tilt'),
			negative: emptyCardDetails('tilt')
		}
	};
}

export async function sessionStarted(id: string) {
	const db = await dbReady;
	if (db) {
		const key = await db.getKey('sessions', id);
		return Boolean(key);
	}
	return false;
}

export function usedCards(pairs: Session['pairs'], tilts?: Session['tilts']) {
	const used: Record<CardOrEngineType, Set<`${number}-${number}`>> = {
		relationship: new Set(),
		need: new Set(),
		location: new Set(),
		object: new Set(),
		tilt: new Set()
	};

	function addToUsed({ table, category, element }: CardDetails<CardOrEngineType | undefined>) {
		if (table != undefined && category != undefined && element != undefined) {
			used[table].add(`${category}-${element}`);
		}
	}

	for (const pair of pairs) {
		addToUsed(pair.relationship);
		addToUsed(pair.detail);
	}
	if (tilts) {
		addToUsed(tilts.positive);
		addToUsed(tilts.negative);
	}

	return (cardToCheck: CardDetails<CardOrEngineType>) => {
		const { table, category, element } = cardToCheck;
		return (
			category != undefined && element != undefined && used[table].has(`${category}-${element}`)
		);
	};
}
