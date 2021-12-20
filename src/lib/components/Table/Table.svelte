<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { PlaysetTable } from '$lib/playset';
	import { bindDispatch, getStoreContext } from '$lib/store';
	import { renameSubtitle } from '$lib/actions';
	import { CardOrEngineType, tableName } from '../FiascoCard/card-type';

	export let subtitle: string | undefined;
	export let cardType: CardOrEngineType;
	export let table: PlaysetTable;

	export let onClose: (event: MouseEvent) => void = () => {};

	const { playset } = getStoreContext();
</script>

<div class="table">
	<h2 class="table-title">{tableName(table, cardType)}</h2>
	{#if subtitle != undefined}
		<p class="table-subtitle">
			<Editable
				class="table-subtitle-text"
				value={subtitle}
				onChange={bindDispatch(playset, renameSubtitle)}
			/>
		</p>
	{/if}
	<slot />
	<a href="../setup" class="close-button" id="close-table-control" on:click={onClose}>
		<img src="/images/cross-black.svg" alt="Close" />
	</a>
</div>
