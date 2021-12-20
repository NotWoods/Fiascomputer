import type { CardType } from '$lib/components/FiascoCard/card-type';
import type { PlaysetDataWithId } from '$lib/playset';

export function loadPlayset(playset: PlaysetDataWithId) {
	return {
		type: 'playset',
		playset
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
