import { loadDocument, loadPlaysetPagesFromPdf } from './pdf';

export async function addPlaysetFromPdf(file: File) {
	const pdf = await loadDocument(file);
	console.log(`PDF loaded`, file.name);
	const results = await loadPlaysetPagesFromPdf(pdf, file.name);
	console.log(`PDF results`, file.name, results);
	pdf.destroy();
	return results;
}
