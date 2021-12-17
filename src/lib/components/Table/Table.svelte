<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { PlaysetTable } from '$lib/playset';
	import { bindDispatch, playsetStore } from '$lib/store/index';
	import { renameSubtitle } from '$lib/actions';
	import { CardType, tableName } from '../FiascoCard/card-type';

	export let subtitle: string;
	export let cardType: CardType;
	export let table: PlaysetTable;

	export let onClose: (event: MouseEvent) => void = () => {};
</script>

<div class="table">
	<h2 class="table-title">{tableName(table, cardType)}</h2>
	<p class="table-subtitle">
		<Editable
			class="table-subtitle-text"
			value={subtitle}
			onChange={bindDispatch(playsetStore, renameSubtitle)}
		/>
	</p>
	<slot />
	<a href="../setup" class="close-button" id="close-table-control" on:click={onClose}>
		<img src="/images/cross-black.svg" alt="Close" />
	</a>
</div>
