<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import Editable from '$lib/components/Editable.svelte';

	const dispatch = createEventDispatcher<{
		select: { element: number };
		rename: { text: string; element?: number };
	}>();

	export let category: TableIndex;
	export let table: PlaysetTable;
	export let editable = true;
	export let selected: { category?: number; element?: number } | undefined = undefined;

	$: categoryData = table.categories[category];
</script>

<li class="category" value={category + 1}>
	<h3 class="category-name font-hitchcock">
		<Editable
			class="category-link w-full"
			value={categoryData.name}
			{editable}
			on:change={(event) => dispatch('rename', { text: event.detail.value })}
		/>
	</h3>
	<ol class="elements">
		{#each categoryData.elements as elementData, element}
			<li class="element-name font-sans" value={element + 1}>
				<label class="element-name-label">
					<input
						type="radio"
						class="category-radio"
						name="category-{table.title}"
						value={elementData}
						aria-label={elementData}
						checked={selected?.category === category && selected?.element === element}
						on:change={() => dispatch('select', { element })}
					/>
					<Editable
						class="element-link"
						value={elementData}
						{editable}
						on:change={(event) => dispatch('rename', { text: event.detail.value, element })}
					/>
				</label>
			</li>
		{/each}
	</ol>
</li>

<style>
	.category-radio {
		margin-right: 0.5rem;
	}

	.element-name {
		padding: 0;
	}
	.element-name-label {
		display: flex;
		cursor: pointer;
	}
	:global(.element-link) {
		flex: 1;
		text-align: left !important;
	}
</style>
