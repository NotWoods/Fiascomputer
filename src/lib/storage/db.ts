import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { PageImages } from './pages';
import type { PlaysetDataWithId } from './playset';
import type { Session } from './session';

export interface FiascoDB extends DBSchema {
	playsets: {
		key: string;
		value: PlaysetDataWithId;
	};
	pages: {
		key: string;
		value: PageImages;
	};
	sessions: {
		key: string;
		value: Session;
	};
}

export const dbReady: Promise<IDBPDatabase<FiascoDB> | undefined> =
	typeof indexedDB === 'undefined'
		? Promise.resolve(undefined)
		: openDB<FiascoDB>('fiascomputer', 2, {
				upgrade(db, oldVersion) {
					if (oldVersion < 1) {
						db.createObjectStore('playsets', {
							keyPath: 'id'
						});
						db.createObjectStore('pages');
					}
					if (oldVersion < 2) {
						db.createObjectStore('sessions', {
							keyPath: 'playset'
						});
					}
				}
		  });
