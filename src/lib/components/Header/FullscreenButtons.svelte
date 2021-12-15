<script lang="ts">
	import { onMount } from 'svelte';

	import MenuItem from './MenuItem.svelte';

	export let menuItems: Set<string>;

	function enterFullscreen() {
		document.documentElement.requestFullscreen();
	}

	function leaveFullscreen() {
		document.exitFullscreen();
	}

	function onFullscreenChange() {
		const isInFullscreen = Boolean(document.fullscreenElement);
		document.documentElement.classList.toggle('fullscreen', isInFullscreen);
	}

	onMount(() => {
		document.addEventListener('fullscreenchange', onFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
	});
</script>

<MenuItem {menuItems} id="enter-fullscreen">
	<button type="button" id="enter-fullscreen-control" on:click={enterFullscreen}
		>Enter fullscreen</button
	>
</MenuItem>
<MenuItem {menuItems} id="leave-fullscreen">
	<button type="button" id="leave-fullscreen-control" on:click={leaveFullscreen}
		>Leave fullscreen</button
	>
</MenuItem>
