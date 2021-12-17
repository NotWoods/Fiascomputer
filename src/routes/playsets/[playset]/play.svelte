<script lang="ts" context="module">
	import { loadKnownPlayset } from '$lib/playset';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		await loadKnownPlayset(page.params.playset, fetch);

		return {};
	};
</script>

<script lang="ts">
	import { bindDispatch, playsetStore, sessionStore } from '$lib/store';
	import { changeActivePlayers, randomSetup, renameTitle } from '$lib/actions';
	import PlaysetName from '$lib/components/PlaysetToolbar/PlaysetName.svelte';
	import { playsetToCards } from '$lib/deck';
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';

	$: activePlayers = $sessionStore.players.length;
	$: playset = $playsetStore;
	$: title = playset.title ?? 'Playset';
</script>

<svelte:head>
	<title>Play | {title} | Fiascomputer</title>
</svelte:head>

<div id="setup" class="page setup-page players-{activePlayers}">
	<div class="playset">
		<PlaysetName />
		<div id="randomize-button-box">
			<a href="./setup">Setup</a>
		</div>
	</div>
	<div class="pairs-outer">
		<div id="pairs" class="pairs">
			<Pair {playset} pairIndex={0} />
			<Pair {playset} pairIndex={1} />
			<Pair {playset} pairIndex={2} />
			<Pair {playset} pairIndex={3} />
			<Pair {playset} pairIndex={4} />
			<Player playerIndex={0} editable outcomes />
			<Player playerIndex={1} editable outcomes />
			<Player playerIndex={2} editable outcomes />
			<Player playerIndex={3} editable outcomes />
			<Player playerIndex={4} editable outcomes />
		</div>
	</div>
</div>
