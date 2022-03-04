<script lang="ts">
	import type { CardDetails } from '$lib/deck';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';

	export let cardDetails: CardDetails;
	export let used = false;

	let dragging = false;
	let pressed = false;

	$: relationshipOrDetail = cardDetails.table === 'relationship' ? 'relationship' : 'detail';

	function handleDragStart(event: DragEvent) {
		if (!event.dataTransfer) return;
		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.setData('application/x-fiasco-card', JSON.stringify(cardDetails));
		event.dataTransfer.setData(
			`application/x-fiasco-card-${relationshipOrDetail}`,
			JSON.stringify(cardDetails)
		);
		dragging = true;
	}

	function handleDragEnd() {
		dragging = false;
		pressed = false;
	}

	function handleClick() {
		pressed = !pressed;
	}
</script>

<button
	type="button"
	class="card-clickable card-{cardDetails.table}"
	class:used
	class:dragging
	draggable="true"
	aria-pressed={pressed}
	on:click={handleClick}
	on:dragstart={handleDragStart}
	on:dragend={handleDragEnd}
>
	<SelectCard {cardDetails} editable={false} pairIndex={0} />
</button>

<style lang="scss">
	@use '../../../css/defs';

	.card-clickable {
		@include defs.plain-button;
		transition: transform 0.1s ease-out;
		transform-origin: right bottom;
		cursor: grab;
	}
	.card-clickable[aria-pressed='true'] {
		transform: rotateZ(3deg);
		outline: 0.5em solid var(--background-color);
		outline-offset: 1px;
	}
	.card-clickable:hover,
	.card-clickable:focus-visible {
		transform: rotateZ(4deg);
	}
	.card-clickable :global(.item) {
		height: 100%;
	}
	.card-clickable.used,
	.card-clickable.dragging {
		opacity: 0.75;
	}
</style>
