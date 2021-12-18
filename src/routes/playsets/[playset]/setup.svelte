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
	import { playsetStore, sessionStore } from '$lib/store';
	import { changeActivePlayers, randomSetup } from '$lib/actions';
	import PlaysetName from '$lib/components/PlaysetToolbar/PlaysetName.svelte';
	import Title from '$lib/components/Title.svelte';
	import { playsetToCards } from '$lib/deck';
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';

	$: activePlayers = $sessionStore.players.length;
	$: playset = $playsetStore;
	$: title = playset.title ?? 'Playset';

	function handleInvite(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		if (select.value === 'invite') {
			event.preventDefault();
			const destination = new URL('./players', window.location.href);
			window.location.href = destination.href;
		} else {
			sessionStore.dispatch(changeActivePlayers(Number(select.value)));
		}
	}

	function randomize() {
		const { relationshipCards, detailCards } = playsetToCards(playset);
		sessionStore.dispatch(randomSetup(relationshipCards, detailCards));
	}
</script>

<Title text="Setup" playsetTitle={title} />

<div id="setup" class={`page setup-page players-${activePlayers}`}>
	<div class="playset">
		<PlaysetName />
		<div id="player-count-control-box">
			<select id="player-count-control" value={activePlayers.toString()} on:change={handleInvite}>
				<option value="3">3 players</option>
				<option value="4">4 players</option>
				<option value="5">5 players</option>
				<option value="invite">Invite players...</option>
			</select>
		</div>
		<div id="randomize-button-box">
			<button type="button" id="randomize-button" on:click={randomize}>Random!</button>
			<a href="./play" hidden>Play!</a>
		</div>
	</div>
	<div class="pairs-outer">
		<div id="pairs" class="pairs">
			<Pair {playset} pairIndex={0} editable />
			<Pair {playset} pairIndex={1} editable />
			<Pair {playset} pairIndex={2} editable />
			<Pair {playset} pairIndex={3} editable />
			<Pair {playset} pairIndex={4} editable />
			<Player playerIndex={0} editable outcomes />
			<Player playerIndex={1} editable outcomes />
			<Player playerIndex={2} editable outcomes />
			<Player playerIndex={3} editable outcomes />
			<Player playerIndex={4} editable outcomes />
		</div>
	</div>
</div>
