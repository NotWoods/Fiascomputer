import arrayShuffle from 'array-shuffle';
import {
	detailTypes,
	type CardType,
	type CardOrEngineType
} from '$lib/components/FiascoCard/card-type';
import type { PlaysetData, PlaysetTable, TableIndex } from '$lib/storage/playset';
import { getTable } from './playset';

export interface CardDetails<Type extends CardOrEngineType | undefined = CardType> {
	table: Type;
	category: TableIndex | undefined;
	element: TableIndex | undefined;
}

export function cardDetailsTableDefined<T extends CardType>(
	cardDetails: CardDetails<T | undefined>
): cardDetails is CardDetails<T> {
	return cardDetails.table !== undefined;
}

export function playsetToCards(playset: PlaysetData) {
	const table = getTable(playset, 'relationship');
	const relationshipCards = tableToCards(table, 'relationship');
	const detailCards = detailTypes.flatMap((cardType) => {
		const table = getTable(playset, cardType);
		return tableToCards(table, cardType);
	});

	return { relationshipCards, detailCards };
}

export function tableToCards<Type extends CardType>(
	table: PlaysetTable,
	cardType: Type
): CardDetails<Type>[] {
	return table.categories.flatMap((categoryData, category) =>
		categoryData.elements.map((_, element) => ({
			table: cardType,
			category: category as TableIndex,
			element: element as TableIndex
		}))
	);
}

export function buildDeck<Card>(allCards: readonly Card[]) {
	let cards = arrayShuffle(allCards);

	return {
		draw() {
			return cards.pop();
		},
		reset() {
			cards = allCards.slice();
		},
		shuffle() {
			cards = arrayShuffle(cards);
		},
		cards() {
			return cards;
		}
	};
}
