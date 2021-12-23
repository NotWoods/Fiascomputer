<script lang="ts">
	export let menuItems: Set<string>;
	export let id: string;
</script>

{#if menuItems.has(id)}
	<li class="menu-item" id={`${id}-menu-item`}>
		<slot />
	</li>
{/if}

<style lang="scss">
	@use '../../../css/_defs';

	.menu-item {
		margin-top: 0.75rem;
	}
	.menu-item:first-of-type {
		margin-top: 0;
	}
</style>
