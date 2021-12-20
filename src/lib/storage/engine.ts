import type { PlaysetTable } from './playset';

export interface Aftermath {
	positive: Record<string, string>;
	negative: Record<string, string>;
}

export interface Engine {
	title: string;
	tilt?: PlaysetTable;
	aftermath?: Aftermath;
}

export async function loadBundledEngine(engineId: string, fetch = globalThis.fetch) {
	const res = await fetch(`/engine/${engineId}.json`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return (await res.json()) as Engine;
}
