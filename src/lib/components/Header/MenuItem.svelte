<script lang="ts">
	export let menuItems: Set<string>;
	export let id: string;
</script>

{#if menuItems.has(id)}
	<li class="menu-item" id={`${id}-menu-item`}>
		<slot />
	</li>
{/if}
