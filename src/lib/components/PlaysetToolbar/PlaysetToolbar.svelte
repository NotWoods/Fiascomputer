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

	.toolbar-buttons {
		display: flex;
		align-items: flex-start;
	}
	.buttons-start {
		justify-content: flex-start;
	}
	.buttons-end {
		justify-content: flex-end;
	}

	@media (max-width: 40em) {
		.playset-toolbar {
			grid-template:
				'start' auto
				'title' 1fr
				'end' auto
				/ 1fr;
		}
		.buttons-start,
		.buttons-end {
			justify-content: center;
		}
	}
</style>
