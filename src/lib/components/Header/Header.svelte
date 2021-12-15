<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import FullscreenButtons from './FullscreenButtons.svelte';
	import ThemeDropdown from './ThemeDropdown.svelte';

	export let menuItems: Set<string>;
	export let removeHelp = false;

	let menuOpen = false;

	let menu: HTMLElement;
	let button: HTMLButtonElement;

	function handleDocumentClick(event: MouseEvent) {
		const target = event.target as Element;
		if (event.target !== button) {
			const elementOutsideMenuWasClicked = !menu.contains(target);
			const controlInsideMenuWasClicked =
				!elementOutsideMenuWasClicked &&
				(target.tagName === 'A' || target.tagName === 'BUTTON');
			if (elementOutsideMenuWasClicked || controlInsideMenuWasClicked) {
				menuOpen = false;
			}
		}
	}
</script>

<svelte:body on:click={handleDocumentClick} />

<header data-menu={menuOpen.toString()}>
	<h1 id="app-title"><a href="/">Fiascomputer</a></h1>
	<div id="player-list-box">
		<button type="button" id="player-list-button" />
		<ul id="player-list">
			<li>
				<img src="" alt="" class="player-image" />
				<span class="player-name" />
			</li>
		</ul>
	</div>
	{#if !removeHelp}
		<a href="/help" id="help-button">Help</a>
	{/if}
	<button id="menu-button" bind:this={button} on:click={() => { menuOpen = !menuOpen }}>Menu</button>
	<ul id="menu" bind:this={menu}>
		<MenuItem {menuItems} id="invite-players">
			<a href="/players">Invite players</a>
		</MenuItem>
		<MenuItem {menuItems} id="select-playset">
			<a href="/playsets">Select playset</a>
		</MenuItem>
		<MenuItem {menuItems} id="add-playset">
			<a href="/add-playset">Add playset</a>
		</MenuItem>
		<FullscreenButtons {menuItems} />
		<ThemeDropdown
			{menuItems}
			onChange={() => {
				menuOpen = false;
			}}
		/>
	</ul>
</header>

<style>
	:global([data-help=true]) #help-button,
	:global([data-menu=true]) #menu-button {
		background-image: url("/images/cross-white.svg");
	}

	:global([data-menu=false]) #menu {
    display: none;
	}
</style>
