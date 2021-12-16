export type DetailType = 'location' | 'need' | 'object';
export type CardType = 'relationship' | DetailType;

export function cardName(type: CardType) {
	return type.charAt(0).toLocaleUpperCase() + type.slice(1);
}

export const detailTypes: readonly DetailType[] = ['need', 'location', 'object'];
export const cardTypes: ReadonlySet<CardType> = new Set<CardType>(detailTypes).add('relationship');

export function assertInSet<Item, SetItem extends Item>(
	item: Item,
	set: ReadonlySet<SetItem>
): asserts item is SetItem {
	if (!set.has(item as SetItem)) {
		throw new Error(`Invalid item ${item}`);
	}
}
