import { dbReady } from './db';

export type TableIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface Category {
	name: string;
	elements: readonly string[];
}

export interface PlaysetTable {
	categories: readonly Category[];
	title?: string;
}

export interface PlaysetData {
	title: string;
	subtitle: string;
	backgroundColor?: string;
	score?: string;
	tables: Readonly<Record<string, PlaysetTable>>;
}

export interface PlaysetDataWithId extends PlaysetData {
	id: string;
	deleted?: boolean;
}

export interface PlaysetDataWithThumbnail extends PlaysetDataWithId {
	thumbnail: string | Blob | undefined;
}

export interface Playset extends PlaysetDataWithThumbnail {
	pages: {
		cover?: string | Blob;
		score?: string | Blob;
		credits?: string | Blob;
	};
}

export const BUNDLED_PLAYSETS: readonly string[] = [
	'core_tales_from_suburbia',
	'ak02_heroes_of_pinnacle_city',
	'br01_de_medici',
	'bt01_jersey_side',
	'cb02_dallas_1963',
	'cb03_havana_1953',
	'cn01_news_channel_six',
	'db01_tartan_noir',
	'dp01_manna_hotel',
	'dp02_the_penthouse',
	'el01_transatlantic',
	'gs01_hk_tpk',
	'gw01_gangster_london',
	'jb01_hollywood_wives',
	'jc01_horse_fever',
	'jg01_camp_death',
	'jl01_objective_zebra',
	'jm05_touring_rock_band',
	'jm06_last_frontier',
	'jm07_lucky_strike',
	'jm08_flyover',
	'jm09_1913_new_york',
	'jm12_home_invasion',
	'jw01_golden_panda',
	'lb01_dragon_slayers',
	'lb02_dc73',
	'lb03_salem_1692',
	'mc01_red_front',
	'mp01_break_a_leg',
	'rc01_white_hole',
	'sb01_back_to_the_old_house',
	'sg01_town_and_gown',
	'tg01_reconstruction',
	'trb02_touring_rock_band_2',
	'wh01_london_1593',
	'wh02_the_zoo',
	'wh03_flight_1180',
	'trashfire_2020'
];

function arrayBufferToBlob(buffer: ArrayBuffer | undefined, type = 'image/png') {
	if (buffer) {
		return new Blob([buffer], { type });
	} else {
		return undefined;
	}
}

export async function loadStoredPages(id: string): Promise<Playset['pages'] | undefined> {
	const db = await dbReady;
	if (db) {
		try {
			const images = await db.get('pages', id);
			if (images) {
				return {
					cover: arrayBufferToBlob(images.cover, images.coverMime),
					score: arrayBufferToBlob(images.score),
					credits: arrayBufferToBlob(images.credits)
				};
			}
		} catch (err) {
			// it's OK if pages fail to load
		}
	}
	return undefined;
}

export async function loadStoredPlayset(id: string, loadPages = false) {
	const db = await dbReady;
	if (db) {
		let playsetData: PlaysetDataWithId | undefined;
		const pages: Playset['pages'] = {};
		if (loadPages) {
			const tx = db.transaction(['playsets', 'pages']);
			const playsetReady = tx.objectStore('playsets').get(id);
			const pageImagesReady = tx.objectStore('pages').get(id);

			playsetData = await playsetReady;
			try {
				const images = await pageImagesReady;
				if (playsetData && images) {
					pages.cover = arrayBufferToBlob(images.cover, images.coverMime);
					pages.score = arrayBufferToBlob(images.score);
					pages.credits = arrayBufferToBlob(images.credits);
				}
			} catch (err) {
				// it's OK if pages fail to load
			}
		} else {
			playsetData = await db.get('playsets', id);
		}

		if (playsetData) {
			const playset = playsetData as Playset;
			playset.thumbnail = pages.cover;
			playset.pages = pages;
			return playset;
		}
	}
	return undefined;
}

export async function loadBundledPlayset(id: string, fetch = globalThis.fetch): Promise<Playset> {
	const res = await fetch(`/bundled/${id}.json`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const json = (await res.json()) as PlaysetData;
	const withId = json as PlaysetDataWithId;
	withId.id = id;

	const playset = json.backgroundColor
		? {
				...withId,
				thumbnail: `/bundled/${id}-cover.png`,
				pages: {
					cover: `/bundled/${id}-cover.png`,
					credits: `/bundled/${id}-credits.png`,
					score: `/bundled/${id}-score.png`
				}
		  }
		: {
				...withId,
				thumbnail: `/bundled/${id}-cover.small.jpg`,
				pages: {
					cover: `/bundled/${id}-cover.jpg`,
					credits: `/bundled/${id}-credits.png`,
					score: `/bundled/${id}-score.png`
				}
		  };

	return playset;
}
