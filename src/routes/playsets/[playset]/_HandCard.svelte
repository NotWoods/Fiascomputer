<script lang="ts">
	import type { CardDetails } from '$lib/deck';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';

	export let cardDetails: CardDetails;
	export let used = false;

	let dragging = false;

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
	}
</script>

<button
	type="button"
	class="card-clickable card-{cardDetails.table}"
	class:used
	class:dragging
	draggable="true"
	on:dragstart={handleDragStart}
	on:dragend={handleDragEnd}
>
	<SelectCard {cardDetails} editable={false} pairIndex={0} />
</button>

<style lang="scss">
	@use '../../../css/defs';

	.card-clickable {
		@include defs.plain-button;
		cursor: grab;
	}
	.card-clickable :global(.item) {
		height: 100%;
	}
	.card-clickable.used,
	.card-clickable.dragging {
		opacity: 0.75;
	}
</style>
