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

export function playsetToCards(playset: Pick<PlaysetData, 'tables'>) {
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
		/**
		 * Draw the card from the top of the deck
		 */
		draw() {
			return cards.pop();
		},
		/**
		 * Divide the deck into even hands
		 */
		deal<Count extends number>(hands: Count): Array<Card[]> & { length: Count } {
			const minHandSize = Math.min(cards.length / hands);
			const buckets: Array<Card[]> = Array.from({ length: hands }, (_, i) => {
				const start = i * minHandSize;
				const end = (i + 1) * minHandSize;
				return cards.slice(start, end);
			});

			const remainingCards = cards.slice(buckets.length * minHandSize);
			for (const [i, card] of remainingCards.entries()) {
				buckets[i % buckets.length].push(card);
			}

			return buckets as Array<Card[]> & { length: Count };
		},
		/**
		 * Reset the deck to the original unshuffled state
		 */
		reset() {
			cards = allCards.slice();
		},
		/**
		 * Shuffle all the cards in the deck again
		 */
		shuffle() {
			cards = arrayShuffle(cards);
		},
		cards() {
			return cards;
		}
	};
}
