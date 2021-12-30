<script lang="ts">
	import DeckBox from '$lib/components/DeckBox.svelte';

	export let title: string;
	export let score: string;
	export let cover: string | Blob | undefined;
</script>

<div class="overview">
	<DeckBox {title} {cover} />
	<div class="score font-sans">
		<h3>The Score</h3>
		<p class="score-p">{score}</p>
	</div>
</div>

<style>
	.overview :global(.deck) {
		float: left;
		margin: 1rem;
	}
	.score {
		background: white;
		padding: 2rem;
	}
	.score h3 {
		color: #9e032a;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.score-p {
		max-width: 50rem;
	}
</style>
