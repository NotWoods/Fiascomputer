import type { PageImages } from '$lib/storage/pages';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import equivalenceParsePlayset from './equivalence-playset-parser';
import { type Pages, processPages } from './pages';
import sequentialParsePlayset from './sequential-playset-parser';
import validatePlayset from './validate-playset';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function loadDocument(someFile: string | URL | Uint8Array | ArrayBuffer | Blob) {
	if (someFile instanceof Blob) {
		someFile = await someFile.arrayBuffer();
	}
	if (someFile instanceof ArrayBuffer || someFile instanceof Uint8Array) {
		return pdfjs.getDocument(new Uint8Array(someFile)).promise;
	} else {
		return pdfjs.getDocument(someFile).promise;
	}
}

const compilations: Record<string, { pages: number; playsets: ReadonlyMap<number, string> }> = {
	fiasco: {
		pages: 134,
		playsets: new Map()
			.set(61, 'Main Street')
			.set(71, 'Boomtown')
			.set(81, 'Suburbia')
			.set(91, 'The Ice')
	},
	companion: {
		pages: 170,
		playsets: new Map()
			.set(95, 'Fiasco High')
			.set(105, "Regina's Wedding")
			.set(115, 'Vegas')
			.set(125, 'Mission to Mercury')
	}
};

/**
 * Match the PDF to one of the known `compilations`.
 * @see compilations
 * @returns Map of playset cover pages in the PDF to the name of the playset.
 */
function matchCompilation(pdf: { numPages: number }): ReadonlyMap<number, string> | undefined {
	return Object.values(compilations).find((compilation) => pdf.numPages === compilation.pages)
		?.playsets;
}

export function pageNumbers(pdf: PDFDocumentProxy): Pages<number>[] {
	const compilationPlaysets = matchCompilation(pdf);
	const firstPages = compilationPlaysets ? Array.from(compilationPlaysets.keys()) : [1];

	return firstPages.map((firstPage) => {
		const isCompilation = firstPage !== 1;
		if (isCompilation) {
			return {
				cover: firstPage,
				relationship: [firstPage + 1, firstPage + 2],
				need: [firstPage + 3, firstPage + 4],
				location: [firstPage + 5, firstPage + 6],
				object: [firstPage + 7, firstPage + 8]
			};
		} else {
			return {
				cover: 1,
				title: 2,
				score: 3,
				relationship: [4, 5],
				need: [6, 7],
				location: [8, 9],
				object: [10, 11]
			};
		}
	});
}

export async function loadPlaysets(pdf: PDFDocumentProxy, filename: string) {
	const playsets = await Promise.all(
		pageNumbers(pdf).map(async (pageNums) => {
			const pages = await processPages(pageNums, (num) => pdf.getPage(num));

			// Call the parsers.
			return sequentialParsePlayset(pages)
				.then((first) => {
					const firstErrors = validatePlayset(first);
					if (firstErrors.length === 0) {
						return first;
					} else {
						return equivalenceParsePlayset(pages)
							.then((second) => {
								const secondErrors = validatePlayset(second);
								if (firstErrors.length <= secondErrors.length) {
									return first;
								} else {
									return second;
								}
							})
							.catch(() => first);
					}
				})
				.catch(() => equivalenceParsePlayset(pages))
				.then((playset) => {
					const compilationPlaysets = matchCompilation(pdf);
					if (compilationPlaysets) {
						playset.title = compilationPlaysets.get(pageNums.cover)!;
					}
					if (!playset.subtitle || playset.subtitle.trim() === '') {
						playset.subtitle = '...somewhere';
					}
					return playset;
				});
		})
	);

	// We put this early because we cannot run the validation after the
	// playsets have been been converted to lists.
	if (playsets.some((p) => validatePlayset(p).length > 0)) {
		throw new Error(
			'We were able to load the playset in the file "' +
				filename +
				'", but there were some parts that ' +
				'we did not understand. If you find any errors, ' +
				'you can edit the playset to fix them.'
		);
	}

	return playsets;
}

export function loadPage(
	pdf: PDFDocumentProxy,
	num: number,
	scale: number,
	type: string,
	canvas: HTMLCanvasElement
): Promise<HTMLCanvasElement>;
export function loadPage(
	pdf: PDFDocumentProxy,
	num: number,
	scale: number,
	type: string
): Promise<ArrayBuffer | undefined>;
export async function loadPage(
	pdf: PDFDocumentProxy,
	num: number,
	scale: number,
	type: string,
	_canvas?: HTMLCanvasElement
) {
	const toUrl = !_canvas;
	const canvas = _canvas || document.createElement('canvas');
	if (toUrl) {
		canvas.style.display = 'none';
		document.body.appendChild(canvas);
	}
	const page = await pdf.getPage(num);
	const viewport = page.getViewport({ scale });
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	page.render({
		canvasContext: canvas.getContext('2d')!,
		viewport: viewport
	});
	if (toUrl) {
		const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type));
		canvas.remove();
		return await blob?.arrayBuffer();
	} else {
		return canvas;
	}
}

export const loadPlaysetPagesFromPdf = async (pdf: PDFDocumentProxy, filename: string) => {
	const playsets = await loadPlaysets(pdf, filename);

	return await Promise.all(
		playsets.map(async (playset, index) => {
			if (!playset.subtitle || playset.subtitle.trim() === '') {
				playset.subtitle = '...somewhere';
			}

			const numbers: Pages<number> = pageNumbers(pdf)[index];
			const [cover, credits, score] = await Promise.all(
				[numbers.cover, numbers.title, numbers.score].map((num) => {
					if (num) {
						return loadPage(pdf, num, 2, 'image/png');
					} else {
						return undefined;
					}
				})
			);

			const pages: PageImages = {
				coverMime: 'image/png',
				cover,
				credits,
				score
			};

			return { playset, pages };
		})
	);
};
