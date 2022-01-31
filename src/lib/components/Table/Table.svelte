<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { PlaysetTable } from '$lib/playset';
	import { getStoreContext } from '$lib/store';
	import { renameSubtitle } from '$lib/actions';
	import { CardOrEngineType, tableName } from '../FiascoCard/card-type';

	export let subtitle: string | undefined;
	export let cardType: CardOrEngineType;
	export let table: PlaysetTable;

	export let onClose: (event: MouseEvent) => void = () => {};

	const { playset } = getStoreContext();

	function handleChange(event: CustomEvent<{ value: string }>) {
		const subtitle = event.detail.value;
		playset.dispatch(renameSubtitle(subtitle));
	}
</script>

<div class="table">
	<h2 class="table-title">{tableName(table, cardType)}</h2>
	{#if subtitle != undefined}
		<p class="table-subtitle w-full">
			<Editable class="table-subtitle-text w-full" value={subtitle} on:change={handleChange} />
		</p>
	{/if}
	<slot />
	<a href="../setup" class="close-button" id="close-table-control" on:click={onClose}>
		<img src="/images/cross-black.svg" alt="Close" />
	</a>
</div>
