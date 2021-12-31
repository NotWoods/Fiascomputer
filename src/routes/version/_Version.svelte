<script lang="ts">
	export let currentVersion: string;
	export let version: string;
</script>

<section id="version-{version}" class="version" class:current={version === currentVersion}>
	<slot />
</section>

<style lang="scss">
	@use '../../css/defs';

	.version {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.version:not(.current) {
		display: none;
	}
</style>
