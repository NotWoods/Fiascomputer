import type { PlaysetData } from '$lib/playset';

const COLOR = /^#\d{6}/;

export default function validatePlayset(playset: PlaysetData) {
	const errors: string[] = [];

	require(typeof playset.title === 'string' && playset.title !== '', 'No title');
	require(typeof playset.subtitle === 'string' && playset.subtitle !== '', 'No subtitle');
	if (playset.backgroundColor != undefined) {
		require(typeof playset.backgroundColor === 'string' &&
			playset.backgroundColor !== '', 'Background color not a string');
		require(COLOR.test(playset.backgroundColor), 'Background color is not a 6-digit hex');
	}
	Object.values(playset.tables).forEach((t) => {
		require(typeof t.title === 'string' && t.title !== '', 'No title');
		require(t.categories.length === 6, 'Only ' + t.categories.length + ' categories');
		t.categories.forEach((c, ci) => {
			require(typeof c.name === 'string' && c.name !== '', 'Category ' + (ci + 1) + ' is empty');
			require(c.elements.length === 6, 'Only ' +
				c.elements.length +
				' elements in category ' +
				(ci + 1));
			c.elements.forEach((e, ei) => {
				require(typeof e === 'string' && e !== '', 'Element ' +
					(ei + 1) +
					' in category ' +
					(ci + 1) +
					' is empty');
			});
		});
	});

	return errors;

	function require(assertion: boolean, errorMessage: string) {
		if (!assertion) {
			errors.push(errorMessage);
		}
	}
}
