<script lang="ts">
	import { focusTrap } from '../../hooks/focusTrap';
	import MenuItem from './MenuItem.svelte';
	import FullscreenButtons from './FullscreenButtons.svelte';
	import ThemeDropdown from './ThemeDropdown.svelte';
	import ThemeStylesheet, { ThemeName } from './ThemeStylesheet.svelte';
	import OutsideClick from '../A11y/OutsideClick.svelte';

	export let menuItems: Set<string>;

	let menuOpen = false;
	let selectedTheme: ThemeName = 'red';

	let menu: HTMLElement | undefined;
	let button: HTMLButtonElement;

	function handleMenuButtonClick() {
		menuOpen = !menuOpen;
	}

	function handleEscapeKey(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			menuOpen = false;
			button.focus();
		}
	}
</script>

<OutsideClick
	{menu}
	trigger={button}
	on:click={() => {
		menuOpen = false;
	}}
/>
<ThemeStylesheet selected={selectedTheme} />

<header data-menu={menuOpen.toString()} role="menubar">
	<h1 id="app-title" class="font-hitchcock"><a role="menuitem" href="/">Fiascomputer</a></h1>
	<a role="menuitem" class="header-button header-button-help" href="/help" id="help-button">Help</a>
	<button
		class="header-button header-button-menu"
		class:header-close-button={menuOpen}
		id="menu-button"
		aria-haspopup="true"
		aria-expanded={menuOpen}
		bind:this={button}
		on:click={handleMenuButtonClick}>Menu</button
	>
	{#if menuOpen}
		<ul id="menu" role="menu" bind:this={menu} use:focusTrap on:keydown={handleEscapeKey}>
			<MenuItem {menuItems} id="invite-players">
				<a role="menuitem" href="/players">Invite players</a>
			</MenuItem>
			<MenuItem {menuItems} id="select-playset">
				<a role="menuitem" href="/playsets/">Select playset</a>
			</MenuItem>
			<MenuItem {menuItems} id="add-playset">
				<a role="menuitem" href="/add-playset">Add playset</a>
			</MenuItem>
			<FullscreenButtons {menuItems} />
			<ThemeDropdown
				{menuItems}
				bind:selected={selectedTheme}
				on:change={() => {
					menuOpen = false;
				}}
			/>
		</ul>
	{/if}
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
