<script lang="ts">
	import { renamePlayer } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import Outcome from '$lib/components/Outcome/Outcome.svelte';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let playerIndex: number;
	export let editable = false;
	export let outcomes = false;

	$: player = $session.players[playerIndex];
	$: playerId = `Player ${playerIndex + 1}`;
</script>

<div id="player-{playerIndex + 1}" class="player">
	<img class="player-image" src="/images/player-black.svg" alt={playerId} width="66" height="96" />
	<div class="player-name-outer">
		<Editable
			class="player-name"
			{editable}
			value={player?.name ?? playerId}
			onChange={(name) => session.dispatch(renamePlayer(playerIndex, name))}
		/>
	</div>
	{#if outcomes}
		<ol class="player-outcomes">
			{#each player?.outcomes ?? [] as outcome, outcomeIndex}
				<Outcome {outcome} {outcomeIndex} {playerIndex} />
			{/each}
			<Outcome outcome={undefined} {playerIndex} />
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
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (max-width: 40em) {
		.player {
			grid-template:
				'icon' 6rem
				'name' min-content
				'outcomes' auto
				/ 1fr;
		}
	}
</style>
