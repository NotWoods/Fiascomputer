<script lang="ts">
	import TiltCard from '$lib/components/FiascoCard/TiltCard.svelte';
	import { OutcomeType } from '$lib/outcome';
	import type { Engine } from '$lib/storage/engine';

	export let engine: Engine;
</script>

<div class="pair tilts">
	<h3 class="sr-only">Tilts</h3>
	<TiltCard {engine} outcomeType={OutcomeType.POSITIVE} editable />
	<TiltCard {engine} outcomeType={OutcomeType.NEGATIVE} editable />
	<a class="aftermath-link font-hitchcock" href="./aftermath">Aftermath</a>
</div>

<style lang="scss">
	@use '../../../../css/defs';

	.aftermath-link {
		@include defs.shadow;
		background: black;
		color: white;
		margin-top: 2rem;
		padding: 1rem;
	}

	@media (min-width: 40rem) {
		.tilts {
			display: flex;
			flex-direction: column;
			justify-content: center;
			order: 0;
			grid-row: 1 / span 2;
			border-right: 1px solid var(--shadow-color);
		}
	}
</style>
