import { changeActivePlayers } from '$lib/actions';
import { emptySession } from '$lib/storage/session';
import { describe, expect, test } from '@jest/globals';
import { sessionReducer } from '../session-reducer';

describe('sessionReducer', () => {
	test('change activePlayers', () => {
		let session = emptySession();
		expect(session.players).toHaveLength(5);
		expect(session.players[0].name).toBe('Player 1');

		expect(sessionReducer(session, changeActivePlayers(5))).toBe(session);

		session = sessionReducer(session, changeActivePlayers(3));
		expect(session.players).toHaveLength(3);

		session = sessionReducer(session, changeActivePlayers(4));
		expect(session.players).toHaveLength(4);
	});
});
