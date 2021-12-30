<script lang="ts" context="module">
	import { loadKnownPages, Playset } from '$lib/playset';
	import { dbReady } from '$lib/storage/db';
	import { sessionStarted } from '$lib/storage/session';
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		const playsetId = page.params.playset;
		const [pages, alreadyStarted] = await Promise.all([
			loadKnownPages(playsetId, { fetch }),
			sessionStarted(playsetId)
		]);

		return {
			props: {
				pages,
				alreadyStarted
			}
		};
	};
</script>

<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import { getStoreContext } from '$lib/store';
	import { goto } from '$app/navigation';
	import PlaysetOverviewLegacy from './_PlaysetOverviewLegacy.svelte';
	import PlaysetOverviewDeck from './_PlaysetOverviewDeck.svelte';
	import PlaysetToolbar from '$lib/components/PlaysetToolbar/PlaysetToolbar.svelte';
	import DeckBox from '$lib/components/DeckBox.svelte';

	const { playset } = getStoreContext();

	export let pages: Playset['pages'] | undefined;
	export let alreadyStarted: boolean;

	$: cover = pages?.cover;
	$: credits = pages?.credits;

	async function newGame(event: MouseEvent) {
		event.preventDefault();
		if (alreadyStarted) {
			const db = await dbReady;
			await db?.delete('sessions', $playset.id);
			// Refresh after deleting from DB
			window.location.href = './players';
		} else {
			await goto('./players');
		}
	}
	function deletePlayset() {}
</script>

<Title text={$playset.title} />

<div
	id="playset-preview"
	class="page playset-preview-page"
	style="--playset-background: {$playset.backgroundColor ?? ''}"
>
	<PlaysetToolbar>
		<a slot="start" href="/playsets" class="back">Back</a>
	</PlaysetToolbar>
	{#if $playset.score}
		<PlaysetOverviewDeck title={$playset.title} {cover} score={$playset.score} />
	{:else}
		<PlaysetOverviewLegacy playsetTitle={$playset.title} {cover} score={pages?.score} />
	{/if}
	<div class="links">
		<a
			sveltekit:prefetch
			href="./players"
			class="play-link"
			id="start-setup-control"
			on:click={newGame}>Play!</a
		>
		<a
			sveltekit:prefetch
			href="./setup"
			class="resume-link"
			id="resume-setup-control"
			hidden={!alreadyStarted}>Resume</a
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
</div>

<style>
	.resume-link {
		margin-top: 1rem;
	}

	.links {
		margin-top: auto;
	}
</style>
