<script lang="ts">
  import MenuItem from './MenuItem.svelte'
  import FullscreenButtons from './FullscreenButtons.svelte'
  import ThemeDropdown from './ThemeDropdown.svelte'

	export let menuItems: Set<string>;
</script>

<header>
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
	<a href="/help" id="help-button">Help</a>
	<button id="menu-button">Menu</button>
	<ul id="menu">
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
		<ThemeDropdown {menuItems} />
	</ul>
</header>
