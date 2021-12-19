import type { Category } from '$lib/storage/playset';

export interface PartialPlaysetTable {
	categories: readonly Category[];
	title: string;
	subtitle?: string;
}

export interface Pages<Value> {
	cover: Value;
	relationship: [Value, Value];
	need: [Value, Value];
	location: [Value, Value];
	object: [Value, Value];
	title?: Value;
	score?: Value;
}

export async function processPages<Item, Result>(
	pageNums: Pages<Item>,
	loadPage: (item: Item) => Promise<Result>
) {
	const pages: Partial<Pages<Result>> = {};
	await Promise.all(
		Object.entries(pageNums).map(async (entry) => {
			const [name, values] = entry as [keyof Pages<Item>, Item | [Item, Item]];
			const pdfPages = Array.isArray(values) ? Promise.all(values.map(loadPage)) : loadPage(values);
			pages[name] = (await pdfPages) as any;
		})
	);
	return pages as Pages<Result>;
}
