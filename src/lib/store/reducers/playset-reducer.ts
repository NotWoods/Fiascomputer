import type { PlaysetAction } from '$lib/actions';
import type { PlaysetDataWithId } from '$lib/playset';
import { replace } from '../helpers';

export function playsetReducer(
	state: PlaysetDataWithId | undefined,
	action: PlaysetAction
): PlaysetDataWithId | undefined {
	switch (action.type) {
		case 'playset':
			if (!state || action.playset.id !== state.id) {
				return action.playset;
			} else {
				return state;
			}
		case 'category': {
			const { table, category, text } = action;
			const tableData = state.tables[table];
			return {
				...state,
				tables: {
					...state.tables,
					[table]: {
						...tableData,
						categories: replace(tableData.categories, category, (categoryData) => {
							return {
								...categoryData,
								name: text
							};
						})
					}
				}
			};
		}
		case 'element': {
			const { table, category, element, text } = action;
			const tableData = state.tables[table];
			return {
				...state,
				tables: {
					...state.tables,
					[table]: {
						...tableData,
						categories: replace(tableData.categories, category, (categoryData) => {
							return {
								...categoryData,
								elements: replace(categoryData.elements, element, () => text)
							};
						})
					}
				}
			};
		}
		case 'title':
			return {
				...state,
				title: action.title
			};
		case 'subtitle':
			return {
				...state,
				subtitle: action.subtitle
			};
		default:
			return state;
	}
}
