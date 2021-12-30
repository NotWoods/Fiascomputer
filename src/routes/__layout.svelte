<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import '../css/main.scss';
</script>

<Header menuItems={new Set(['select-playset', 'enter-fullscreen', 'leave-fullscreen', 'theme'])} />
<main>
	<slot />
</main>

<style lang="scss">
	@use '../css/defs';

	main {
		flex: 1;
		@include defs.flex(column, $horizontal: stretch);
	}
</style>
