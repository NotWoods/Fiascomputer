import type { PlaysetTable } from '$lib/playset';

export type DetailType = 'location' | 'need' | 'object';
export type CardType = 'relationship' | DetailType;
export type CardOrEngineType = 'tilt' | CardType;

export function cardName(type: CardOrEngineType) {
	return type.charAt(0).toLocaleUpperCase() + type.slice(1);
}

export function tableName(table: PlaysetTable, cardType: CardOrEngineType) {
	return table.title ?? `${cardName(cardType)}s...`;
}

export const detailTypes: readonly DetailType[] = ['need', 'location', 'object'];
export const cardTypes: ReadonlySet<CardType> = new Set<CardType>(detailTypes).add('relationship');
export const cardAndEngineTypes: ReadonlySet<CardOrEngineType> = new Set<CardOrEngineType>(
	cardTypes
).add('tilt');
