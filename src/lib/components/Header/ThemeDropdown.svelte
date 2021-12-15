<script lang="ts">
	import MenuItem from './MenuItem.svelte';

	export let menuItems: Set<string>;
  export let onChange: () => void;

	let selected = 'red'
</script>

<svelte:head>
  <link rel="stylesheet" disabled={selected !== 'red' || undefined} href="/css/red.css" title="Fiasco Red">
  <link rel="alternate stylesheet" disabled={selected !== 'blue' || undefined} href="/css/blue.css" title="Companion Blue">
  <link rel="alternate stylesheet" disabled={selected !== 'green' || undefined} href="/css/green.css" title="Town Green">
  <link rel="alternate stylesheet" disabled={selected !== 'gray' || undefined} href="/css/gray.css" title="Plain Gray">
</svelte:head>

<MenuItem {menuItems} id="theme">
  <select id="theme-control" bind:value={selected} on:change={onChange}>
    <option value="red">Fiasco Red</option>
    <option value="blue">Companion Blue</option>
    <option value="green">Town Green</option>
    <option value="gray">Plain Gray</option>
  </select>
</MenuItem>
