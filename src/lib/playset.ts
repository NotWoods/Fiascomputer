interface PlaysetTable {
	categories: { name: string; elements: string[] }[];
	title?: string;
}

export interface PlaysetData {
	title: string;
	subtitle: string;
	tables: Record<string, PlaysetTable>;
}

export interface Playset extends PlaysetData {
	id: string;
	cover: string;
	deleted?: boolean;
	pages: readonly string[];
}

export function playsetLink(playset: Playset) {
	return `/playsets/${encodeURIComponent(playset.id)}`;
}

export const BUNDLED_PLAYSETS: readonly string[] = [
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
	'wh03_flight_1180'
];

export async function loadBundledPlayset(id: string, fetch = globalThis.fetch): Promise<Playset> {
	const res = await fetch(`/bundled/${id}.json`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	const json = await res.json() as PlaysetData;

	return {
		...json,
		id,
		cover: `/bundled/${id}-cover.small.jpg`,
		pages: [
			`/bundled/${id}-cover.jpg`,
			`/bundled/${id}-credits.png`,
			`/bundled/${id}-score.png`,
		],
	}
}
