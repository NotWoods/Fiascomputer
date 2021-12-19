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
			loadKnownPlayset(playsetId, { fetch, loadPages: true }),
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
	import BlobbyImage from '$lib/components/BlobbyImage.svelte';
	import PlaysetName from '$lib/components/PlaysetToolbar/PlaysetName.svelte';
	import Title from '$lib/components/Title.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playset: Playset;
	export let alreadyStarted = false;

	$: cover = playset.pages.cover ?? playset.thumbnail;
	$: credits = playset.pages.credits;
	$: score = playset.pages.score;

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
			<BlobbyImage
				aClass="playset-page-link playset-cover-page-link"
				imgClass="playset-page playset-cover-page"
				target="_blank"
				src={cover ?? BLANK_PAGE}
				alt="{playset.title} Cover"
				width={600}
				height={900}
			/>
			{#if score}
				<BlobbyImage
					aClass="playset-page-link "
					imgClass="playset-page"
					target="_blank"
					src={score}
					alt="{playset.title} Score"
					width={600}
					height={900}
				/>
			{/if}
		</div>
	</div>
	<div class="links">
		<a href="./setup" class="play-link" id="start-setup-control" on:click={newGame}>Play!</a>
		<a href="./setup" class="resume-link" id="resume-setup-control" hidden={!alreadyStarted}
			>Resume</a
		>
		{#if typeof credits === 'string'}
			<a href={credits} target="_blank" class="credits-link" id="playset-credits-page-link"
				>Credits</a
			>
		{/if}
		<a href="/playsets" class="delete-link" id="delete-playset-control" on:click={deletePlayset}
			>Delete playset</a
		>
	</div>
	<a href="/playsets" class="back">Back</a>
</div>

<style>
	:global(.playset-page) {
		aspect-ratio: 600 / 900;
		background-color: white;
		object-fit: contain;
	}
	:global(.playset-cover-page) {
		background-color: var(--playset-background, white);
	}

	.resume-link {
		margin-top: 1rem;
	}
</style>
