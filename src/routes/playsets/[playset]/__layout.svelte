<script lang="ts" context="module">
	import { loadKnownPlayset, type PlaysetDataWithId } from '$lib/playset';
	import { dbReady } from '$lib/storage/db';
	import type { Session } from '$lib/storage/session';
	import { setStoreContext } from '$lib/store/context';

	async function loadSessionFromDb(id: string) {
		try {
			const db = await dbReady;
			const session = await db?.get('sessions', id);
			if (session) {
				return session;
			}
		} catch (err) {
			// fall down to default
		}
		return undefined;
	}

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		const playsetId = page.params.playset;

		const existingSessionReady = loadSessionFromDb(playsetId);
		const playset = await loadKnownPlayset(playsetId, { fetch });

		if (!playset) {
			return {
				status: 404,
				error: new Error(`${playsetId} does not exist`)
			};
		}

		return {
			props: {
				playset,
				existingSession: await existingSessionReady
			}
		};
	};
</script>

<script lang="ts">
	export let playset: PlaysetDataWithId;
	export let existingSession: Session | undefined;

	$: setStoreContext(playset, existingSession);
</script>

<slot />
