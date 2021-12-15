<script lang="ts">
	import MenuItem from './MenuItem.svelte';

	export let menuItems: Set<string>;

	let selected = 'red'
</script>

<svelte:head>
  <link rel="stylesheet" disabled={selected !== 'red'} href="/css/theme/red.scss" title="Fiasco Red">
  <link rel="alternate stylesheet" disabled={selected !== 'blue'} href="/css/theme/blue.scss" title="Companion Blue">
  <link rel="alternate stylesheet" disabled={selected !== 'green'} href="/css/theme/green.scss" title="Town Green">
  <link rel="alternate stylesheet" disabled={selected !== 'gray'} href="/css/theme/gray.scss" title="Plain Gray">
</svelte:head>

<MenuItem {menuItems} id="theme">
  <select id="theme-control" bind:value={selected}>
    <option value="red">Fiasco Red</option>
    <option value="blue">Companion Blue</option>
    <option value="green">Town Green</option>
    <option value="gray">Plain Gray</option>
  </select>
</MenuItem>
