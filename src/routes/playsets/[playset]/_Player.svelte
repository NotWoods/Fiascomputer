<script lang="ts">
	import Outcome from '$lib/components/Outcome/Outcome.svelte';
	import PlayerName from '$lib/components/PlayerName.svelte';
	import PlayerOutcomes from './_PlayerOutcomes.svelte';

	export let playerIndex: number;
	export let selected = false;
	export let editable = false;
	export let outcomes = false;
	export let onSelect: (index: number) => void;
</script>

<div id="player-{playerIndex + 1}" class="player">
	<button
		type="button"
		class="player-image-outer"
		aria-pressed={selected}
		on:click={() => onSelect(playerIndex)}
	>
		<img
			class="player-image"
			src="/images/player-{selected ? 'white' : 'black'}.svg"
			alt="Player {playerIndex + 1}"
			width="66"
			height="96"
		/>
	</button>
	<div class="player-name-outer">
		<PlayerName {playerIndex} {editable} />
	</div>
	{#if outcomes}
		<PlayerOutcomes {playerIndex} editable>
			<Outcome outcome={undefined} {playerIndex} />
		</PlayerOutcomes>
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
	.player-image-outer {
		@include defs.plain-button;
		grid-area: icon;
	}
	.player-name-outer {
		grid-area: name;
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
