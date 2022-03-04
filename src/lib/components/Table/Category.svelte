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
			ariaLabel="Category for {table.title}"
			on:change={(event) => dispatch('rename', { text: event.detail.value })}
		/>
	</h3>
	<ol class="elements">
		{#each categoryData.elements as elementData, element}
			<li class="element-name font-sans" value={element + 1}>
				<input
					type="radio"
					id="radio-{category}-{element}"
					class="category-radio"
					name="category-{table.title}"
					value={elementData}
					aria-label={elementData}
					checked={selected?.category === category && selected?.element === element}
					on:change={() => dispatch('select', { element })}
				/>
				<label class="element-name-label" for="radio-{category}-{element}">
					<Editable
						class="element-link"
						value={elementData}
						{editable}
						ariaLabel="Category element for {categoryData.name}"
						on:change={(event) => dispatch('rename', { text: event.detail.value, element })}
					/>
				</label>
			</li>
		{/each}
	</ol>
</li>

<style>
	.category-radio {
		cursor: pointer;
	}

	.element-name {
		padding: 0;
		display: flex;
	}
	.element-name-label {
		padding-left: 0.5rem;
		display: flex;
		flex: 1;
		cursor: pointer;
	}
	.element-name-label :global(.element-link) {
		flex: 1;
		text-align: left !important;
	}
</style>
