<script lang="ts" context="module">
	import { loadBundledPlayset } from '$lib/playset';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		return {
			props: {
				playset: await loadBundledPlayset(page.params.playset, fetch)
			}
		};
	};

	function activePlayersFromUrl() {
		if (typeof window === 'undefined') return '3';

		const url = new URL(window.location.href);
		const count = url.searchParams.get('players');
		switch (count) {
			case '3':
			case '4':
			case '5':
				return count;
				return '3';
		}
	}
</script>

<script lang="ts">
	import type { Playset } from '$lib/playset';
	import Editable from '$lib/components/Editable.svelte';
	import Pair from './_Pair.svelte'
	import Player from './_Player.svelte'

	export let playset: Playset;
	export let maxPlayers: number = 5;

	let activePlayers: '3' | '4' | '5' = activePlayersFromUrl();

	$: {
		if (typeof history !== 'undefined') {
			history.replaceState({ activePlayers }, '', `?players=${activePlayers}`);
		}
	}

	function changeTitle(title: string) {
		playset.title = title;
	}

	function handleInvite(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		if (select.value === 'invite') {
			event.preventDefault();
			const destination = new URL('./players', window.location.href);
			window.location.href = destination.href;
		} else {
			activePlayers = select.value as '3' | '4' | '5';
		}
	}
</script>

<svelte:head>
	<title>Setup | {playset.title} | Fiascomputer</title>
</svelte:head>

<div id="setup" class={`page setup-page players-${activePlayers}`}>
	<div class="playset">
		<h2 class="playset-name">
			<Editable
				class="playset-name-text"
				value={playset.title ?? 'Playset'}
				onChange={changeTitle}
			/>
		</h2>
		<div id="player-count-control-box">
			<select id="player-count-control" value={activePlayers} on:change={handleInvite}>
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
			<Pair pairNumber={1} />
			<Pair pairNumber={2} />
			<Pair pairNumber={3} />
			<Pair pairNumber={4} />
			<Pair pairNumber={5} />
			<Player playerNumber={1} />
			<Player playerNumber={2} />
			<Player playerNumber={3} />
			<Player playerNumber={4} />
			<Player playerNumber={5} />
		</div>
	</div>
</div>
