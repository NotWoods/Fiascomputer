<script lang="ts">
	import PlaysetName from './PlaysetName.svelte';
</script>

<header class="playset-toolbar">
	<div class="toolbar-buttons buttons-start">
		<slot name="start" />
	</div>
	<h2 class="toolbar-title">
		<slot name="title">
			<PlaysetName />
		</slot>
	</h2>
	<div class="toolbar-buttons buttons-end">
		<slot name="end" />
	</div>
</header>

<style>
	.playset-toolbar {
		padding: 1rem;
		display: grid;
		grid-template:
			'start title end' auto
			/ 1fr max-content 1fr;
	}

	.toolbar-title {
		color: var(--heading-color);
		font-size: 2rem;
		text-align: center;
		margin-top: 1rem;
	}
</style>
