import type { CardType, DetailType } from '$lib/components/FiascoCard/card-type';
import type { PlaysetDataWithId } from '$lib/playset';
import type { CardDetails, Pair, Session } from '$lib/storage/session';

export function loadPlayset(playset: PlaysetDataWithId | undefined) {
	return {
		type: 'playset',
		playset
	} as const;
}

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

export function changeDetailType(table: DetailType | undefined, pairIndex: number) {
	return {
		type: 'detail-type',
		table,
		pairIndex,
	}
}

export function changeCard(table: CardType, pairIndex: number, cardDetails: Omit<CardDetails, 'table'>) {
	return {
		type: table,
		pairIndex,
		cardDetails
	} as const;
}

export function renameCategory(table: CardType, category: number, text: string) {
	return {
		type: 'category',
		table,
		category,
		text
	} as const;
}

export function renameElement(table: CardType, category: number, element: number, text: string) {
	return {
		type: 'element',
		table,
		category,
		element,
		text
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

export function renameTitle(title: string) {
	return {
		type: 'title',
		title
	} as const;
}

export function renameSubtitle(subtitle: string) {
	return {
		type: 'subtitle',
		subtitle
	} as const;
}
