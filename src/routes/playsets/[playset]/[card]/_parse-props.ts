import { cardTypes } from '$lib/components/FiascoCard/card-type';
import type { Page } from '@sveltejs/kit';
import { setHas } from 'ts-extras';

/**
 * Cast a string representing an integer into a number within the given range.
 * @param index String to cast
 * @param max Max value for the number, exclusive.
 * @param def Default value returned if the number is out of bounds.
 * If not provided, an error is thrown instead.
 */
export function castIndex<T extends number>(
	index: string | null | undefined,
	max: number,
	def: T | undefined = undefined
) {
	const parsed = Math.floor(Number(index));
	if (Number.isNaN(parsed) || parsed < 0 || parsed >= max) {
		if (def !== undefined) {
			return def;
		} else {
			throw new Error(`Invalid index ${index}, should be within [0, ${max})`);
		}
	}

	return parsed as T;
}

export async function parseProps(page: Page) {
	const { card } = page.params;
	setHas(cardTypes, card);

	const pairIndex = castIndex(page.query.get('pair'), 5);
	return {
		tableType: card,
		pairIndex
	};
}
