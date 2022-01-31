<script lang="ts">
	import Outcome from '$lib/components/Outcome/Outcome.svelte';
	import type { OutcomeDetails } from '$lib/outcome';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let playerIndex: number;
	export let editable = false;
	export let outcomes: readonly OutcomeDetails[] | undefined = undefined;

	$: player = $session.players[playerIndex];
	$: outcomeList = outcomes ?? player?.outcomes ?? [];
</script>

<ol class="player-outcomes">
	{#each outcomeList as outcome, outcomeIndex (outcomeIndex)}
		<Outcome {outcome} {outcomeIndex} {playerIndex} {editable} />
	{/each}
	<slot />
</ol>

<style lang="scss">
	@use '../../../css/defs';

	.player-outcomes {
		grid-area: outcomes;
		width: 100%;
		display: flex;
		padding: 0 1rem;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
	}

	@media (max-width: 40em) {
		.player-outcomes {
			padding-bottom: 1rem;
		}
	}
</style>
