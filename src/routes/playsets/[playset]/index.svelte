<script lang="ts" context="module">
	import type { Playset } from '$lib/playset';
	import { loadKnownPlayset } from '$lib/playset';
	import { dbReady } from '$lib/storage/db';
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		const playsetId = page.params.playset;
		const [playset, alreadyStarted] = await Promise.all([
			loadKnownPlayset(playsetId, fetch),
			dbReady.then((db) => {
				if (db) {
					return db.getKey('sessions', playsetId).then(Boolean);
				} else {
					return false;
				}
			})
		]);

		return {
			props: {
				playset,
				alreadyStarted
			}
		};
	};
</script>

<script lang="ts">
	import PlaysetName from '$lib/components/PlaysetToolbar/PlaysetName.svelte';
	import Title from '$lib/components/Title.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playset: Playset;
	export let alreadyStarted = false;

	$: cover = playset.pages[0] ?? BLANK_PAGE;
	$: credits = playset.pages[1];
	$: score = playset.pages[2];

	async function newGame() {
		const db = await dbReady;
		db?.delete('sessions', playset.id);
	}
	function deletePlayset() {}
</script>

<Title text={playset.title} />

<div
	id="playset-preview"
	class="page playset-preview-page"
	style="--playset-background: {playset.backgroundColor ?? ''}"
>
	<PlaysetName />
	<!-- We use both `inner` and `outer` below to properly achieve 100% image height with proper aspect ratio. -->
	<div class="pages-outer">
		<div class="pages-inner">
			<a href={cover} target="_blank" class="playset-page-link" id="playset-cover-page-link">
				<img
					src={cover}
					class="playset-page"
					id="playset-cover-page"
					alt="{playset.title} Cover"
					width="600"
					height="900"
				/>
			</a>
			<a
				href={score ?? BLANK_PAGE}
				target="_blank"
				class="playset-page-link"
				id="playset-score-page-link"
			>
				<img
					src={score ?? BLANK_PAGE}
					class="playset-page"
					id="playset-score-page"
					alt=""
					width="600"
					height="900"
					hidden={!score}
				/>
			</a>
		</div>
	</div>
	<div class="links">
		<a href="./setup" class="play-link" id="start-setup-control" on:click={newGame}>Play!</a>
		<a href="./setup" class="resume-link" id="resume-setup-control" hidden={!alreadyStarted}
			>Resume</a
		>
		<a
			href={credits ?? BLANK_PAGE}
			target="_blank"
			class="credits-link"
			id="playset-credits-page-link"
			hidden={!credits}>Credits</a
		>
		<a href="/playsets" class="delete-link" id="delete-playset-control" on:click={deletePlayset}
			>Delete playset</a
		>
	</div>
	<a href="/playsets" class="back">Back</a>
</div>

<style>
	.playset-page {
		aspect-ratio: 600 / 900;
		background-color: white;
		object-fit: contain;
	}
	#playset-cover-page {
		background-color: var(--playset-background, white);
	}

	.resume-link {
		margin-top: 1rem;
	}
</style>
