<script lang="ts">
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import Editable from '$lib/components/Editable.svelte';

	export let category: TableIndex;
	export let table: PlaysetTable;

	export let onClick: (element?: number) => void;
	export let onChangeCategory: ((text: string) => void) | undefined = undefined;
	export let onChangeElement: ((element: number, text: string) => void) | undefined = undefined;

	let bolded: ReadonlySet<number> = new Set();

	$: categoryData = table.categories[category];

	function toggleBold(element: number) {
		if (bolded.has(element)) {
			const newSet = new Set(bolded);
			newSet.delete(element);
			bolded = newSet;
		} else {
			bolded = new Set(bolded).add(element);
		}
	}
</script>

<li class="category" value={category + 1}>
	<h3 class="category-name font-hitchcock">
		<Editable
			tag="a"
			href="../setup"
			class="category-link"
			value={categoryData.name}
			editable={onChangeCategory != undefined}
			onClick={() => onClick()}
			onChange={(text) => onChangeCategory?.(text)}
		/>
	</h3>
	<ol class="elements">
		{#each categoryData.elements as elementData, element}
			<li class="element-name font-sans" value={element + 1} class:faded={!bolded.has(element)}>
				<button type="button" class="fade-button" on:click={() => toggleBold(element)}>
					<img
						class="die"
						src="/die/{element + 1}.svg"
						alt={(element + 1).toString()}
						width="16"
						height="16"
					/>
				</button>
				<Editable
					tag="a"
					href="../setup"
					class="element-link"
					value={elementData}
					editable={onChangeElement != undefined}
					onClick={() => onClick(element)}
					onChange={(text) => onChangeElement?.(element, text)}
				/>
			</li>
		{/each}
	</ol>
</li>

<style lang="scss">
	@use '../../../css/defs';

	.die {
		display: inline-block;
		vertical-align: sub;
		margin-right: 0.5rem;
	}

	.fade-button {
		@include defs.plain-button;
	}

	.faded {
		opacity: 0.5;
	}
</style>
