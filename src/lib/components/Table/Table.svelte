<script lang="ts">
	import type { PlaysetTable } from '$lib/playset';
	import Editable from '$lib/components/Editable.svelte';

	export let subtitle: string;
	export let table: PlaysetTable;

	export let changeSubtitle: (text: string) => void = () => {};
  export let onClose: (event: MouseEvent) => void = () => {}
</script>

<div class="table">
	<h2 class="table-title">{table.title}</h2>
	<p class="table-subtitle">
		<Editable class="table-subtitle-text" value={subtitle} onChange={changeSubtitle} />
	</p>
	<slot />
	<a href="../setup" class="close-button" id="close-table-control" on:click={onClose}>
		<img src="/images/cross-black.svg" alt="Close" />
	</a>
</div>
