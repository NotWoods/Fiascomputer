<script lang="ts">
	export let currentVersion: string;
	export let version: string;
</script>

<section id={`version-${version}`} class="version" class:current={version === currentVersion}>
	<slot />
</section>
