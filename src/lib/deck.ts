import arrayShuffle from 'array-shuffle';
import { cardTypes, type CardType } from '$lib/components/FiascoCard/card-type';
import type { PlaysetData, TableIndex } from '$lib/storage/playset';
import { getTable } from './playset';

export interface CardDetails {
	table: CardType | undefined;
	category: TableIndex | undefined;
	element: TableIndex | undefined;
}

export function deck(playset: PlaysetData) {
	const allCards: CardDetails[] = Array.from(cardTypes).flatMap((cardType) => {
		const table = getTable(playset, cardType);
		return table.categories.flatMap((categoryData, category) =>
			categoryData.elements.map((_, element) => ({
				table: cardType,
				category: category as TableIndex,
				element: element as TableIndex
			}))
		);
	});

	let cards = arrayShuffle(allCards);

	return {
		draw() {
			return cards.pop();
		},
		reset() {
			cards = allCards;
		},
		shuffle() {
			cards = arrayShuffle(cards);
		}
	};
}
