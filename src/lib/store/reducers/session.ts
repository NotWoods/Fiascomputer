import type { FiascoAction } from '$lib/actions';
import { emptyPlayer, type Session } from '$lib/storage/session';
import { replace } from '../helpers';

export function sessionReducer(state: Session, action: FiascoAction): Session {
	switch (action.type) {
		case 'session':
			return action.session;
		case 'pair': {
			const { index, pair } = action;
			return {
				...state,
				pairs: replace(state.pairs, index, () => pair)
			};
		}
		case 'detail-type': {
			const { table, pairIndex } = action;
			return {
				...state,
				pairs: replace(state.pairs, pairIndex, (pair) => {
					return {
						...pair,
						detail: {
							...pair.detail,
							table,
						}
					};
				})
			}
		}
		case 'relationship':
		case 'need':
		case 'location':
		case 'object': {
			const { type, pairIndex, cardDetails } = action;
			const pairKey = type === 'relationship' ? type : 'detail';
			return {
				...state,
				pairs: replace(state.pairs, pairIndex, (pair) => {
					return {
						...pair,
						[pairKey]: {
							table: type,
							...cardDetails,
						}
					};
				})
			};
		}
		case 'player': {
			const { playerIndex, name } = action;
			return {
				...state,
				players: replace(state.players, playerIndex, (player) => {
					return {
						...player,
						name
					};
				})
			};
		}
		case 'activePlayers': {
			const { count } = action;
			if (state.players.length > count) {
				return {
					...state,
					players: state.players.slice(0, count)
				};
			} else if (state.players.length < count) {
				const newPlayers = state.players.slice();
				for (let i = state.players.length; i < count; i++) {
					newPlayers.push(emptyPlayer(i + 1));
				}
				return {
					...state,
					players: newPlayers
				};
			} else {
				return state;
			}
		}
		default:
			return state;
	}
}
