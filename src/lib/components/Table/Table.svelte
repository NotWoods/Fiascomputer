<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { PlaysetTable } from '$lib/playset';
	import { getStoreContext } from '$lib/store';
	import { renameSubtitle } from '$lib/actions';
	import { CardOrEngineType, tableName } from '../FiascoCard/card-type';

	const { playset } = getStoreContext();

	export let subtitle: string | undefined;
	export let cardType: CardOrEngineType;
	export let table: PlaysetTable;

	export let onClose: (event: MouseEvent) => void = () => {};

	let editing = false;

	function handleChange(event: CustomEvent<{ value: string }>) {
		const subtitle = event.detail.value;
		playset.dispatch(renameSubtitle(subtitle));
	}
</script>

<div class="table">
	<h2 class="table-title">{tableName(table, cardType)}</h2>
	{#if subtitle != undefined}
		<p class="table-subtitle w-full">
			<Editable
				class="table-subtitle-text w-full"
				editable={editing}
				value={subtitle}
				on:change={handleChange}
			/>
		</p>
	{/if}
	<slot {editing} />
	<button
		class="edit-button"
		id="edit-table-control"
		aria-pressed={editing}
		on:click={() => {
			editing = !editing;
		}}
	>
		<img src="/images/pencil-black.svg" alt="Edit" />
	</button>
	<a href="../setup" class="close-button" id="close-table-control" on:click={onClose}>
		<img src="/images/cross-black.svg" alt="Close" />
	</a>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.edit-button {
		@include defs.plain-button;
		@include defs.icon-button($transform: rotate(-8deg));
		position: absolute;
		right: 4rem;
		top: 0;
		margin: 2rem;
		border-bottom: 0.3rem solid transparent;
		transition: border-color 0.1s ease;
	}
	.edit-button[aria-pressed='true'] {
		border-bottom-color: rgba(0, 0, 0, 0.7);
	}
</style>
