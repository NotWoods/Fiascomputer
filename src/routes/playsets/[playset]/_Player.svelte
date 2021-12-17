<script lang="ts">
	import { addOutcome, renamePlayer } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import Outcome from '$lib/components/Outcome/Outcome.svelte';
	import { sessionStore } from '$lib/store';

	export let playerIndex: number;
	export let editable = false;
	export let outcomes = false;

	$: player = $sessionStore.players[playerIndex];
	$: playerId = `Player ${playerIndex + 1}`;
</script>

<div id="player-{playerIndex + 1}" class="player">
	<img class="player-image" src="/images/player-black.svg" alt={playerId} width="66" height="96" />
	<div class="player-name-outer">
		<Editable
			class="player-name"
			{editable}
			value={player?.name ?? playerId}
			onChange={(name) => sessionStore.dispatch(renamePlayer(playerIndex, name))}
		/>
	</div>
	{#if outcomes}
	<ol class="player-outcomes">
		{#each player.outcomes as outcome}
			<Outcome type={outcome.type} value={outcome.value} />
		{/each}
		<Outcome
			type={undefined}
			onClick={(type) => sessionStore.dispatch(addOutcome(type, playerIndex))}
		/>
	</ol>
	{/if}
</div>

<style lang="scss">
	@use '../../../css/defs';

	.player {
		padding: 0.5rem;
		display: grid;
		grid-template:
			'.' calc(50% - 4.5rem)
			'icon' 6rem
			'name' min-content
			'outcomes' auto
			/ 1fr;
		justify-items: center;
	}
	.player-image {
		grid-area: icon;
	}
	.player-name-outer {
		grid-area: name;
	}

	.player-outcomes {
		grid-area: outcomes;
		width: 100%;
		display: flex;
		padding: 0 1rem;
		gap: 1rem;
		justify-content: center;
	}
</style>
