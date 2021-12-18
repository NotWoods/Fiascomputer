import type { CardType, DetailType } from '$lib/components/FiascoCard/card-type';
import type { OutcomeType } from '$lib/outcome';
import type { CardDetails, Pair, Session } from '$lib/storage/session';

export function loadSession(session: Session) {
	return {
		type: 'session',
		session
	} as const;
}

export function changePair(index: number, pair: Pair) {
	return {
		type: 'pair',
		index,
		pair
	} as const;
}

export function changeDetailType(table: DetailType, pairIndex: number) {
	return {
		type: 'detail-type',
		table,
		pairIndex
	} as const;
}

export function clearDetailType(pairIndex: number) {
	return {
		type: 'clear-detail-type',
		pairIndex
	} as const;
}

export function changeCard(
	table: CardType,
	pairIndex: number,
	cardDetails: Omit<CardDetails, 'table'>
) {
	return {
		type: table,
		pairIndex,
		cardDetails
	} as const;
}

export function renamePlayer(playerIndex: number, name: string) {
	return {
		type: 'player',
		playerIndex,
		name
	} as const;
}

export function changeActivePlayers(count: number) {
	return {
		type: 'activePlayers',
		count
	} as const;
}

export function addOutcome(outcomeType: OutcomeType, playerIndex: number) {
	return {
		type: 'add-outcome',
		outcomeType,
		playerIndex
	} as const;
}

export function removeOutcome(playerIndex: number, outcomeIndex: number) {
	return {
		type: 'remove-outcome',
		playerIndex,
		outcomeIndex,
	} as const;
}

export function changeOutcomeValue(playerIndex: number, outcomeIndex: number, value: number) {
	return {
		type: 'change-outcome-value',
		playerIndex,
		outcomeIndex,
		value
	} as const;
}

export function randomSetup(relationshipCards: readonly CardDetails<'relationship'>[], detailCards: readonly CardDetails<DetailType>[]) {
	return { type: 'random', relationshipCards, detailCards } as const;
}
