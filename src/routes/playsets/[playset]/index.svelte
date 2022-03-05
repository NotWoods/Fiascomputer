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
	import PlaysetToolbar from '$lib/components/PlaysetToolbar/PlaysetToolbar.svelte';
	import PlaysetOverview from '$lib/components/PlaysetOverview.svelte';

	const { playset } = getStoreContext();

	export let pages: Playset['pages'] | undefined;
	export let alreadyStarted: boolean;

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

<div id="playset-preview" class="page playset-preview-page">
	<PlaysetToolbar>
		<a slot="start" href="/playsets/" class="back">Back</a>
	</PlaysetToolbar>

	<PlaysetOverview playset={$playset} {pages} />
	<div class="spacer" />

	<div class="links">
		<div class="play-links">
			<a
				sveltekit:prefetch
				href="./players"
				class="play-link"
				id="start-setup-control"
				on:click={newGame}
			>
				Play!
			</a>
			<a
				sveltekit:prefetch
				href="./setup"
				class="resume-link"
				id="resume-setup-control"
				hidden={!alreadyStarted}
			>
				Resume
			</a>
		</div>
		{#if typeof credits === 'string'}
			<a href={credits} target="_blank" class="credits-link" id="playset-credits-page-link">
				Credits
			</a>
		{/if}
		<a href="/playsets/" class="delete-link" id="delete-playset-control" on:click={deletePlayset}>
			Delete playset
		</a>
	</div>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.playset-preview-page {
		flex: 1;
		align-self: stretch;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}

	.spacer {
		margin-top: 10rem;
	}

	.links {
		display: grid;
		margin-top: auto;
		margin-bottom: 1rem;
		column-gap: 1rem;
		grid-template:
			'play-links' auto
			'credits-link' auto
			'delete-link' auto
			/ 1fr;
	}

	.play-link,
	.resume-link,
	.credits-link,
	.delete-link {
		@include defs.button;
		display: inline-block;
		padding: 1rem;
		margin-top: 1rem;
		text-align: center;
	}
	.play-links {
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-area: play-links;
	}
	.credits-link {
		grid-area: credits-link;
		justify-self: center;
	}
	.delete-link {
		grid-area: delete-link;
		justify-self: center;
	}

	@media (min-width: 40em) {
		.links {
			position: fixed;
			left: 2rem;
			right: 2rem;
			bottom: 1rem;
			grid-template:
				'. play-links .' auto
				'credits-link play-links delete-link' min-content
				/ 1fr 1fr 1fr;
		}
		.credits-link {
			justify-self: start;
		}
		.delete-link {
			justify-self: end;
		}
	}
</style>
