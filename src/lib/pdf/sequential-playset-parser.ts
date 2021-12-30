import type { PlaysetData } from '$lib/storage/playset';
import type { PDFPageProxy, TextItem } from 'pdfjs-dist/types/src/display/api';
import * as R from 'ramda';
import { type Pages, type PartialPlaysetTable, processPages } from './pages';

export default async function parsePlayset(pdfPages: Pages<PDFPageProxy>) {
	const pages = await processPages(pdfPages, loadPageTokens);
	const playset = {
		tables: {
			relationship: parseSpread(pages.relationship[0], pages.relationship[1]),
			need: parseSpread(pages.need[0], pages.need[1]),
			location: parseSpread(pages.location[0], pages.location[1]),
			object: parseSpread(pages.object[0], pages.object[1])
		},
		title: undefined as string | undefined,
		subtitle: undefined as string | undefined
	};

	if ('title' in pages) {
		playset.title = parseTitlePage(pages.title!);
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
}

async function loadPageTokens(page: PDFPageProxy) {
	const text = await page.getTextContent();
	return text.items.map((i) => (i as TextItem).str);
}

function parseSpread(
	pageOneTokens: string[],
	pageTwoTokens: string[],
	options = { categories: 6, elements: 6 }
): PartialPlaysetTable {
	const pageOne = splitPage(pageOneTokens, 1);
	const pageTwo = splitPage(pageTwoTokens, options.categories / 2 + 1);

	const title = pageOne.titleTokens.join('').trim();
	const subtitle = pageTwo.titleTokens.join('').trim();

	const tableTokens = pageOne.tableTokens.concat(pageTwo.tableTokens);
	const categories = parseCategories(tableTokens, options);

	return {
		title,
		subtitle,
		categories
	};
}

function parseCategories(tokens: string[], options: { categories: number; elements: number }) {
	tokens = tokens.slice(); // Copy
	takeUntil((t) => isBoundary(t, 1));

	const categories = R.range(1, options.categories + 1).map((category) => {
		// We take one token (because the next one starts with the category
		// number 1 and we need that one regardless), then take tokens until we
		// find the next number 1, which this time denotes the first element.
		const nameTokens = [takeOne()].concat(takeUntil((t) => isBoundary(t, 1)));
		const name = formatName(nameTokens, category);
		const elements = parseElements(category);
		return {
			name: name,
			elements: elements
		};
	});

	return categories;

	function parseElements(category: number) {
		const nextCategory = category + 1;
		return R.range(1, options.elements + 1).map((element) => {
			const nextElement = element + 1;
			// Similar to above, we need the first token regardless. Provide the
			// empty string as a fallback to avoid errors in playsets with
			// incorrect numbering.
			const firstNameToken = takeOne() || '';
			const nextNumber = nextElement === options.elements + 1 ? nextCategory : nextElement;
			// If the first name token contains only the element number, we know
			// that we must take the next token as well regardless of how it
			// starts. This avoids the edge case of an element name starting
			// with the number of the next element. TODO: Possibly apply this to
			// category names as well.
			const otherNameTokens =
				firstNameToken.trim() === String(element)
					? [takeOne()].concat(takeUntil((t) => isBoundary(t, nextNumber)))
					: takeUntil((t) => isBoundary(t, nextNumber));
			const nameTokens = [firstNameToken].concat(otherNameTokens);
			const name = formatName(nameTokens, element);
			return name;
		});
	}

	function takeOne() {
		// If there are no tokens left, return the empty string rather than a
		// null value, to remove edge cases caused by too few available
		// categories/elements (specifically due to incorrect numbering).
		if (tokens.length === 0) {
			return '';
		} else {
			const t = tokens[0];
			tokens = tokens.slice(1);
			return t;
		}
	}

	function takeUntil(predicate: (t: string) => boolean) {
		const ts = R.takeWhile((t) => !predicate(t), tokens);
		tokens = tokens.slice(ts.length);
		return ts;
	}
}

function formatName(tokens: string[], number: number) {
	if (isLetterNumberToken(tokens[0], number)) {
		return R.drop(1, tokens).join('').trim();
	} else {
		return R.dropWhile((c) => c == number, tokens.join('') as any)
			.join('')
			.trim();
	}
}

function splitPage(tokens: string[], firstCategory: number) {
	const tokensBefore = R.takeWhile(
		(t) => !isBoundary(t, firstCategory) || startsWithPageNumber(t),
		tokens
	);
	if (tokensBefore.length === 0) {
		return {
			titleTokens: [R.last(tokens)!],
			tableTokens: R.dropLast(1, tokens)
		};
	} else {
		return {
			titleTokens: tokensBefore,
			tableTokens: R.drop(tokensBefore.length, tokens)
		};
	}
}

function isBoundary(token: string, nextNumber: number) {
	const number = token.trim().startsWith(String(nextNumber));
	const letter = isLetterNumberToken(token, nextNumber);
	return number || letter;
}

function startsWithPageNumber(token: string) {
	const number = parseInt(token);
	return !Number.isNaN(number) && number >= 10;
}

function isLetterNumberToken(token: string, number: number) {
	const aCode = 'a'.charCodeAt(0);
	const numberString = String.fromCharCode(aCode + number - 1);
	return token.trim().length === 1 && token.trim().toLowerCase() === numberString;
}

function parseTitlePage(tokens: string[]) {
	const text = tokens.join('');
	const creditIndex = text.toLowerCase().indexOf('credits');
	const truncated = creditIndex === -1 ? text : text.substring(0, creditIndex);
	return truncated.substring(0, 100).trim();
}
