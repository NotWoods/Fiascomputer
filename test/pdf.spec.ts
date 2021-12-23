import { describe, test } from '@jest/globals';
import type { PlaysetData } from '$lib/storage/playset';
import { loadDocument, loadPlaysets } from '$lib/pdf/pdf';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

function logPlayset(playset: PlaysetData) {
	Object.entries(playset.tables).forEach(([key, t]) => {
		console.group(key);
		console.log(
			t.categories
				.map((c, ci) => {
					return (
						ci +
						1 +
						'. ' +
						c.name +
						'\n' +
						'-----\n' +
						c.elements.map((e, ei) => ei + 1 + '. ' + e).join('\n')
					);
				})
				.join('\n\n')
		);
		console.groupEnd();
	});
}

describe('pdf', () => {
	[
		'fiasco',
		'fiasco_companion',
		'ak02_heroes_of_pinnacle_city',
		'br01_de_medici',
		'bt01_jersey_side',
		'cb01_los_angeles_1936',
		'cb02_dallas_1963',
		'cb03_havana_1953',
		'cn01_news_channel_six',
		'Dangerous Games Fiasco Playset',
		'db01_tartan_noir',
		'dcj01_alpha_complex',
		'dp01_manna_hotel',
		'dp02_the_penthouse',
		'el01_transatlantic',
		'gs01_hk_tpk',
		'gw01_gangster_london',
		'gw02_unaussprechlichen_klutzen',
		'jb01_hollywood_wives',
		'jc01_horse_fever',
		'jg01_camp_death',
		'jg06_return_to_camp_death',
		'jl01_objective_zebra',
		'jm05_touring_rock_band',
		'jm06_last_frontier',
		'jm07_lucky_strike',
		'jm08_flyover',
		'jm09_1913_new_york',
		'jm12_home_invasion',
		'jm17_rat_patrol',
		'jm18_sucker_creek',
		'jw01_golden_panda',
		'lb01_dragon_slayers',
		'lb02_dc73',
		'lb03_salem_1692',
		'mc01_red_front',
		'mp01_break_a_leg',
		'planeta_droga',
		'rc01_white_hole',
		'sb01_back_to_the_old_house',
		'sg01_town_and_gown',
		'tg01_reconstruction',
		'trb02_touring_rock_band_2',
		'tt01_saturday_night_78',
		'wh01_london_1593',
		'wh02_the_zoo',
		'wh03_flight_1180'
	].forEach((name) => {
		const testP = existsSync(`test/playsets/${name}.pdf`) ? test : test.skip;
		testP(`PDF: ${name}`, async () => {
			const buffer = await readFile(`test/playsets/${name}.pdf`);
			const pdf = await loadDocument(new Uint8Array(buffer));
			const playsets = await loadPlaysets(pdf, name);

			for (const playset of playsets) {
				console.group(name);
				logPlayset(playset);
				console.groupEnd();
			}
		});
	});
});
