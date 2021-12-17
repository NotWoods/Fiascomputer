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
	import Editable from '$lib/components/Editable.svelte';
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';
	import { bindDispatch, playsetStore, sessionStore } from '$lib/store';
	import { changeActivePlayers, renameTitle } from '$lib/actions';

	$: activePlayers = $sessionStore.players.length;
	$: playset = $playsetStore;
	$: title = playset.title ?? 'Playset';

	const changeTitle = bindDispatch(playsetStore, renameTitle);

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
</script>

<svelte:head>
	<title>Setup | {title} | Fiascomputer</title>
</svelte:head>

<div id="setup" class={`page setup-page players-${activePlayers}`}>
	<div class="playset">
		<h2 class="playset-name">
			<Editable class="playset-name-text" value={title} onChange={changeTitle} />
		</h2>
		<div id="player-count-control-box">
			<select id="player-count-control" value={activePlayers.toString()} on:change={handleInvite}>
				<option value="3">3 players</option>
				<option value="4">4 players</option>
				<option value="5">5 players</option>
				<option value="invite">Invite players...</option>
			</select>
		</div>
		<div id="randomize-button-box">
			<button id="randomize-button">Random!</button>
		</div>
	</div>
	<div class="pairs-outer">
		<div id="pairs" class="pairs">
			<Pair {playset} pairIndex={0} />
			<Pair {playset} pairIndex={1} />
			<Pair {playset} pairIndex={2} />
			<Pair {playset} pairIndex={3} />
			<Pair {playset} pairIndex={4} />
			<Player playerIndex={0} />
			<Player playerIndex={1} />
			<Player playerIndex={2} />
			<Player playerIndex={3} />
			<Player playerIndex={4} />
		</div>
	</div>
</div>
