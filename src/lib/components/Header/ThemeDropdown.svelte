<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import type { ThemeName } from './ThemeStylesheet.svelte';

	export let menuItems: Set<string>;
	export let selected: ThemeName;
</script>

<MenuItem {menuItems} id="theme">
	<select id="theme-control" bind:value={selected} on:change>
		<option value="red">Fiasco Red</option>
		<option value="blue">Companion Blue</option>
		<option value="green">Town Green</option>
		<option value="gray">Plain Gray</option>
	</select>
</MenuItem>

<style lang="scss">
	@use '../../../css/_defs';

	select {
		padding: 0.25rem;
	}
</style>
