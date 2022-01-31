import type { PlaysetData } from '$lib/storage/playset';
import type {
	PDFPageProxy,
	TextContent,
	TextItem,
	TextStyle
} from 'pdfjs-dist/types/src/display/api';
import * as R from 'ramda';
import { type Pages, type PartialPlaysetTable, processPages } from './pages';

function even(number: number) {
	return number % 2 === 0;
}

interface TextContentUnmarked extends TextContent {
	items: TextItem[];
}

interface TextItemWithStyle extends TextItem {
	style: TextStyle;
}

// This parser was originally written before the external interface was
// finalized and it has not been completely updated to reflect this internally,
// so some of the internal logic does not match the external interface.
export default async function parsePlayset(pdfPages: Pages<PDFPageProxy>) {
	const pages = await processPages(
		pdfPages,
		(p) => p.getTextContent() as Promise<TextContentUnmarked>
	);

	const tables = extractTables(
		[pages.relationship, pages.need, pages.location, pages.object].flat()
	);
	const playset = {
		tables: {
			relationship: tables[0],
			need: tables[1],
			location: tables[2],
			object: tables[3]
		},
		title: undefined as string | undefined,
		subtitle: undefined as string | undefined
	};

	if ('title' in pages) {
		playset.title = extractTitle(pages.title!);
	}

	// We need to return a single subtitle, not one per spread, so simply
	// use the first one; they should be identical, and if they aren't, we
	// don't necessarily have a good way of finding out which is the correct
	// one.
	const subtitle = playset.tables.relationship.subtitle;
	Object.values(playset.tables).forEach((table) => {
		delete table.subtitle;
	});
	playset.subtitle = subtitle;

	return playset as PlaysetData;

	function extractTitle(page: TextContentUnmarked) {
		const tokens = page.items.map((i) => i.str);
		return R.takeWhile((s) => s.toLowerCase() != 'credits', tokens)
			.join('')
			.trim();
	}

	function extractTables(tablePages: readonly TextContentUnmarked[]) {
		const pageItems = tablePages.map(mergeItemsWithStyles);
		const pageClasses = pageItems.map(findClasses);
		const tables = R.range(0, tablePages.length)
			.filter(even)
			.map((num) => {
				const items = R.concat(pageItems[num], pageItems[num + 1]);
				const classes = mergeClasses(pageClasses[num], pageClasses[num + 1]);
				try {
					return tableFromItems(items, classes);
				} catch (e) {
					const message = e instanceof Error ? e.message : e;
					throw new Error(message + ', pages ' + (num + 1) + '-' + (num + 2));
				}
			});
		return tables;
	}

	function mergeItemsWithStyles(page: TextContentUnmarked) {
		return page.items.map((i1) => {
			const i2 = R.clone(i1) as TextItemWithStyle;
			i2.style = page.styles[i2.fontName];
			return i2;
		});
	}

	interface Essense {
		height: TextItem['height'];
		style: Pick<TextStyle, 'fontFamily'>;
	}

	function essence(item: Essense): Essense {
		return {
			height: item.height,
			style: {
				fontFamily: item.style.fontFamily
			}
		};
	}

	function match(a: Essense, b: Essense) {
		return R.equals(essence(a), essence(b));
	}

	// Given a set of uncategorized items and a set of items grouped into
	// equivalence classes, add the uncategorized items to the existing classes
	// and/or create new classes for them.
	function findClasses(items: readonly TextItemWithStyle[]) {
		const classes: Essense[] = [];
		for (const item of items) {
			// Find the class containing the current item. Assuming the classes
			// have been correctly defined, at most one will match.
			const matching = R.findIndex((c) => match(c, item), classes);
			if (matching === -1) {
				// If there is no matching class, create a new one.
				classes.push(essence(item));
			}
			// If there is a matching class, we don't need to add anything.
		}
		return classes;
	}

	function mergeClasses(c1: Essense[], c2: Essense[]) {
		return R.uniq(R.concat(c1, c2));
	}

	function mergeItems(i1: TextItemWithStyle, i2: TextItem) {
		var i3 = R.clone(i1);
		i3.str += i2.str;
		return i3;
	}

	function tableFromItems(items: TextItemWithStyle[], classes: Essense[]): PartialPlaysetTable {
		const mergedItems = items.reduce((merged, current) => {
			if (merged.length > 0 && match(current, R.last(merged)!)) {
				return R.adjust(merged.length - 1, (previous) => mergeItems(previous, current), merged);
			} else {
				return R.append(current, merged);
			}
		}, [] as TextItemWithStyle[]);
		const itemsByClass = classes.map((c) => mergedItems.filter((i) => match(c, i)));

		const titleClasses = itemsByClass.filter((c) => c.length === 2);
		const title = titleClasses.length === 1 ? titleClasses[0][0].str : '';
		const subtitle = titleClasses.length === 1 ? titleClasses[0][1].str : '';

		const categoryClass = R.find((c) => c.length === 6, itemsByClass);
		if (!categoryClass) {
			error('NOT_6_CATEGORIES');
		}

		const elementClass = findElementClass(itemsByClass);
		if (!elementClass) {
			error('NOT_36_ELEMENTS');
		}

		const elements = elementClass.map((i) => i.str);
		return {
			title: title,
			subtitle: subtitle,
			categories: [
				{ name: formatCategory(categoryClass[0].str), elements: elements.slice(0, 6) },
				{ name: formatCategory(categoryClass[1].str), elements: elements.slice(6, 12) },
				{ name: formatCategory(categoryClass[2].str), elements: elements.slice(12, 18) },
				{ name: formatCategory(categoryClass[3].str), elements: elements.slice(18, 24) },
				{ name: formatCategory(categoryClass[4].str), elements: elements.slice(24, 30) },
				{ name: formatCategory(categoryClass[5].str), elements: elements.slice(30, 36) }
			]
		};
	}

	function formatCategory(string: string) {
		return string.replace(/^\s*\d/, '').trim();
	}

	function findElementClass(itemsByClass: TextItem[][]) {
		const largeClasses = itemsByClass.filter((items) => items.length === 6 * 6);
		return largeClasses.filter((c) => !c.every(isOneCharacter))[0];
	}

	function isOneCharacter(item: TextItem) {
		return item.str.trim().length === 1;
	}

	function error(message: string): never {
		throw new Error(message);
	}
}
