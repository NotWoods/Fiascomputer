<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import FullscreenButtons from './FullscreenButtons.svelte';
	import ThemeDropdown from './ThemeDropdown.svelte';

	export let menuItems: Set<string>;

	let menuOpen = false;

	let menu: HTMLElement;
	let button: HTMLButtonElement;

	function handleDocumentClick(event: MouseEvent) {
		const target = event.target as Element;
		if (event.target !== button) {
			const elementOutsideMenuWasClicked = !menu.contains(target);
			const controlInsideMenuWasClicked =
				!elementOutsideMenuWasClicked && (target.tagName === 'A' || target.tagName === 'BUTTON');
			if (elementOutsideMenuWasClicked || controlInsideMenuWasClicked) {
				menuOpen = false;
			}
		}
	}
</script>

<svelte:body on:click={handleDocumentClick} />

<header data-menu={menuOpen.toString()}>
	<h1 id="app-title" class="font-hitchcock"><a href="/">Fiascomputer</a></h1>
	<a class="header-button header-button-help" href="/help" id="help-button">Help</a>
	<button
		class="header-button header-button-menu"
		class:header-close-button={menuOpen}
		id="menu-button"
		bind:this={button}
		on:click={() => {
			menuOpen = !menuOpen;
		}}>Menu</button
	>
	<ul id="menu" bind:this={menu} hidden={!menuOpen}>
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

<style lang="scss">
	@use '../../../css/_defs';

	header {
		position: relative;
		z-index: 2;
		color: defs.$white;
		background-color: defs.$black;
		font-family: defs.$heading-font;
		@include defs.flex(row, $vertical: center);

		#app-title {
			flex: 1;
			position: relative;
			overflow: hidden;
			padding: 0.5rem;

			&:after {
				display: block;
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				width: 2rem;
				background-image: linear-gradient(to right, transparent, black);
				pointer-events: none;
			}
		}

		#menu {
			position: absolute;
			right: 0;
			top: 100%;
			padding: 0.75rem;
			color: defs.$white;
			background-color: defs.$black;
			@include defs.shadow;
		}
	}

	.header-button {
		@include defs.plain-button;
		padding: 0.5rem;
		background-repeat: no-repeat;
		background-position: 0.5rem center;
		background-size: auto 1rem;
	}
	.header-button-help {
		background-image: url('/images/help.svg');
		padding-left: 1.5rem;
	}
	.header-button-menu {
		background-image: url('/images/menu.svg');
		padding-left: 2rem;
	}

	.header-close-button {
		background-image: url('/images/cross-white.svg');
	}
</style>
