import type { SessionAction } from '$lib/actions';
import { buildDeck, type CardDetails } from '$lib/deck';
import { dealHands } from '$lib/storage/hand';
import { emptyCardDetails, emptyPlayer, type Player, type Session } from '$lib/storage/session';
import { remove, replace } from '../helpers';

function replaceCardDetails<Details extends CardDetails<any>>(
	state: Details,
	deck: { draw(): Details | undefined }
) {
	if (state.category == undefined || state.element == undefined) {
		return deck.draw() ?? emptyCardDetails(state.table);
	} else {
		return state;
	}
}

export function sessionReducer(state: Session, action: SessionAction): Session {
	switch (action.type) {
		case 'session':
			return action.session;
		case 'random': {
			const relationshipDeck = buildDeck(action.relationshipCards);
			const detailDeck = buildDeck(action.detailCards);
			return {
				...state,
				pairs: state.pairs.map((pair) => {
					return {
						relationship: replaceCardDetails(pair.relationship, relationshipDeck),
						detail: replaceCardDetails(pair.detail, detailDeck)
					};
				})
			};
		}
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
							table
						}
					};
				})
			};
		}
		case 'clear-detail-type': {
			const { pairIndex } = action;
			return {
				...state,
				pairs: replace(state.pairs, pairIndex, (pair) => {
					return {
						...pair,
						detail: {
							table: undefined,
							category: undefined,
							element: undefined
						}
					};
				})
			};
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
							...cardDetails,
							table: type
						}
					};
				})
			};
		}
		case 'tilt': {
			const { outcomeType, cardDetails } = action;
			return {
				...state,
				tilts: {
					...state.tilts,
					[outcomeType]: {
						...cardDetails,
						table: 'tilt'
					}
				}
			};
		}
		case 'player': {
			const { playerIndex, name } = action;
			if (state.players[playerIndex].name === name) {
				return state;
			}

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
			const { count, playset, force } = action;
			if (state.players.length === count && !force) {
				return state;
			}

			const hands = dealHands(playset, count);
			let players: Player[] = [];

			if (state.players.length >= count) {
				players = state.players.slice(0, count);
			} else {
				players = state.players.slice();
				for (let i = state.players.length; i < count; i++) {
					players.push(emptyPlayer(i + 1));
				}
			}

			players = players.map((player, playerIndex) => {
				return {
					...player,
					hand: new Set(hands[playerIndex])
				};
			});

			return {
				...state,
				players
			};
		}
		case 'add-outcome': {
			const { playerIndex, outcomeType } = action;
			return {
				...state,
				players: replace(state.players, playerIndex, (player) => {
					const outcomes = player.outcomes.slice();
					outcomes.push({ type: outcomeType });
					return {
						...player,
						outcomes
					};
				})
			};
		}
		case 'remove-outcome': {
			const { playerIndex, outcomeIndex } = action;
			return {
				...state,
				players: replace(state.players, playerIndex, (player) => {
					return {
						...player,
						outcomes: remove(player.outcomes, outcomeIndex)
					};
				})
			};
		}
		case 'change-outcome-value': {
			const { playerIndex, outcomeIndex, value } = action;
			if (state.players[playerIndex].outcomes[outcomeIndex].value === value) {
				return state;
			}

			return {
				...state,
				players: replace(state.players, playerIndex, (player) => {
					return {
						...player,
						outcomes: replace(player.outcomes, outcomeIndex, (outcome) => {
							return {
								...outcome,
								value
							};
						})
					};
				})
			};
		}
		default:
			return state;
	}
}
