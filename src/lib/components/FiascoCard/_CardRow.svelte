<svelte:options immutable={true} />

<script lang="ts" context="module">
	export type DescriptionType = 'category' | 'element';

	export function fallback(descriptionType: DescriptionType, editable: boolean = false) {
		if (editable) {
			return `Select ${descriptionType}`;
		} else {
			return '\u00a0';
		}
	}
</script>

<script lang="ts">
	export let descriptionType: DescriptionType;
	export let href: string;
	export let editable: boolean;
	export let onRemove: (descriptionType: DescriptionType) => void = () => {};
</script>

<div class="card-description-line {descriptionType}" aria-label={descriptionType}>
	<a
		{href}
		class="name {descriptionType}-name"
		class:font-hitchcock={descriptionType === 'category'}
		class:font-sans={descriptionType === 'element'}
	>
		<slot>{fallback(descriptionType, editable)}</slot>
	</a>
	{#if editable}
		<button type="button" class="remove close-button" on:click={() => onRemove(descriptionType)}>
			<img src="/images/cross-black.svg" alt="Remove" />
		</button>
	{/if}
</div>

<style>
	.element-name {
		font-size: 1.1rem;
	}

	.card-description-line {
		margin-top: 1rem;
		text-align: left;
	}

	.remove {
		opacity: 0;
		margin-left: auto;
	}
	.die:focus ~ .remove,
	.name:focus ~ .remove,
	.remove:focus,
	.card-description-line:hover .remove {
		opacity: 1;
	}
</style>
