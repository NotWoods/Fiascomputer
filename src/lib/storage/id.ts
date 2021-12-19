import type { StoreNames } from 'idb';
import { dbReady, FiascoDB } from './db';

/**
 * Ensure that the given ID will be unique in the database.
 * Compares the ID to existing keys in the database first and auto-increments if needed.
 * @param baseId ID to potentially modify.
 * @param storeName The name of the object store containing existing IDs.
 * @returns Either `baseId` or `baseId` with a suffix like '-2'.
 */
export async function uniqueIdentifier(baseId: string, storeName: StoreNames<FiascoDB>) {
	const db = await dbReady;
	if (db) {
		// We can query only keys starting with `baseId`.
		const existingKeys = new Set(
			await db.getAllKeys(storeName, IDBKeyRange.bound(baseId, `${baseId}\uffff`))
		);
		let id = baseId;
		for (let n = 2; existingKeys.has(id); n++) {
			id = `${baseId}-${n}`;
		}
	} else {
		return baseId;
	}
}
