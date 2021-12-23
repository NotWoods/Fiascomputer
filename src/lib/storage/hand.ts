import type { CardType } from '$lib/components/FiascoCard/card-type';
import { buildDeck, playsetToCards } from '$lib/deck';
import type { PlaysetData } from './playset';
import type { CardDetails } from './session';

const cardTypeOrder: Record<CardType, number> = {
	relationship: 1,
	need: 2,
	location: 3,
	object: 4
};

function sortCards(a: CardDetails, b: CardDetails) {
	return cardTypeOrder[a.table] - cardTypeOrder[b.table];
}

export function dealHands(playset: Pick<PlaysetData, 'tables'>, count: number) {
	const { relationshipCards, detailCards } = playsetToCards(playset);
	const cards = (relationshipCards as CardDetails[]).concat(detailCards);
	return buildDeck(cards)
		.deal(count)
		.map((hand) => hand.sort(sortCards));
}
