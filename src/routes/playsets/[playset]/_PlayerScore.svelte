<script lang="ts">
	import Outcome from '$lib/components/Outcome/Outcome.svelte';
	import PlayerName from '$lib/components/PlayerName.svelte';
	import { sumOutcomes } from '$lib/outcome';
	import { getStoreContext } from '$lib/store';
	import PlayerOutcomes from './_PlayerOutcomes.svelte';

	const { session } = getStoreContext();

	export let playerIndex: number;

	$: player = $session.players[playerIndex];
	$: totalScore = sumOutcomes(player.outcomes);
</script>

<li id="player-{playerIndex + 1}" class="player">
	<img
		class="player-image"
		src="/images/player-black.svg"
		alt="Player {playerIndex + 1}"
		width="32"
		height="60"
	/>
	<h4 class="player-name">
		<PlayerName {playerIndex} editable={false} multiline={1} />
	</h4>
	<PlayerOutcomes {playerIndex} editable={false}>
		<span class="result font-sans">⇒</span>
		<Outcome outcome={totalScore} {playerIndex} editable={false} />
	</PlayerOutcomes>
</li>

<style lang="scss">
	@use '../../../css/defs';

	.player {
		padding: 0.5rem;
		display: grid;
		grid-template:
			'icon name outcomes' auto
			/ 2rem auto max-content;
		align-items: center;
		gap: 1rem;
	}
	.player-image {
		grid-area: icon;
	}
	.player-name {
		grid-area: name;
		color: var(--heading-color);
		font-size: 1.5rem;
	}

	.result {
		font-size: 2rem;
		color: var(--heading-color);
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
