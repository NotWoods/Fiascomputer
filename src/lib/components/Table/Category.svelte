<script lang="ts">
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import Editable from '$lib/components/Editable.svelte';

	export let category: TableIndex;
	export let table: PlaysetTable;

	export let onClick: (element?: number) => void;
	export let onChangeCategory: ((text: string) => void) | undefined = undefined;
	export let onChangeElement: ((element: number, text: string) => void) | undefined = undefined;

	$: categoryData = table.categories[category];
</script>

<li class="category" value={category + 1}>
	<h3 class="category-name font-hitchcock">
		<Editable
			tag="a"
			href="../setup"
			class="category-link w-full"
			value={categoryData.name}
			editable={onChangeCategory != undefined}
			onClick={() => onClick()}
			on:change={(event) => onChangeCategory?.(event.detail.value)}
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
						on:change={() => onClick(element)}
					/>
					<Editable
						tag="a"
						href="../setup"
						class="element-link"
						value={elementData}
						editable={onChangeElement != undefined}
						on:change={(event) => onChangeElement?.(element, event.detail.value)}
					/>
				</label>
			</li>
		{/each}
	</ol>
</li>

<style lang="scss">
	@use '../../../css/defs';

	.category-radio {
		margin-right: 0.5rem;
	}

	.fade-button {
		@include defs.plain-button;
	}

	.faded {
		opacity: 0.5;
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
