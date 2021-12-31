<script lang="ts">
	import { getStoreContext } from '$lib/store';
	import { changeActivePlayers, randomSetup } from '$lib/actions';
	import { playsetToCards } from '$lib/deck';
	import PlaysetToolbar from '$lib/components/PlaysetToolbar/PlaysetToolbar.svelte';

	const { playset, session } = getStoreContext();

	export let showTilt: boolean;

	$: activePlayers = $session.players.length;

	function handleInvite(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		if (select.value === 'invite') {
			event.preventDefault();
			const destination = new URL('./players', window.location.href);
			window.location.href = destination.href;
		} else {
			session.dispatch(changeActivePlayers(Number(select.value), $playset));
		}
	}

	function randomize() {
		const { relationshipCards, detailCards } = playsetToCards($playset);
		session.dispatch(randomSetup(relationshipCards, detailCards));
	}
</script>

<PlaysetToolbar>
	<div slot="start" id="randomize-button-box">
		<button type="button" id="randomize-button" on:click={randomize}>Random!</button>
		<button
			type="button"
			aria-pressed={showTilt}
			on:click={() => {
				showTilt = !showTilt;
			}}>Tilt</button
		>
		<a href="./play" hidden>Play!</a>
	</div>
	<select
		slot="end"
		id="player-count-control"
		class="font-hitchcock"
		value={activePlayers.toString()}
		on:change={handleInvite}
	>
		<option value="3">3 players</option>
		<option value="4">4 players</option>
		<option value="5">5 players</option>
		<option value="invite">Invite players...</option>
	</select>
</PlaysetToolbar>

<style lang="scss">
	@use '../../../css/defs';

	#player-count-control {
		align-self: center;
	}

	#randomize-button-box {
		order: 1;

		a,
		button {
			@include defs.plain-button;
			@include defs.button;
			padding: 1rem;
			display: inline-block;
		}
	}

	#player-count-control {
		padding: 0.25rem;
	}
</style>
