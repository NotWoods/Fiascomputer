<script lang="ts">
	import BlobUrl from '$lib/components/BlobUrl.svelte';
	import Cover from '$lib/components/PlaysetImage/Cover.svelte';
	import DeckBox from '$lib/components/PlaysetImage/DeckBox.svelte';
	import { isDeckPlayset, type Playset, type PlaysetDataWithId } from '$lib/playset';

	export let playset: PlaysetDataWithId;
	export let pages: Playset['pages'] | undefined;

	$: cover = pages?.cover;
</script>

<!-- We use both `inner` and `outer` below to properly achieve 100% image height with proper aspect ratio. -->
<div class="overview" style="--playset-background: {playset.backgroundColor ?? ''}">
	<div class="overview-cover">
		{#if isDeckPlayset(playset)}
			<DeckBox title={playset.title} {cover} />
		{:else}
			<Cover playsetTitle={playset.title} {cover} />
		{/if}
	</div>
	<div class="score-container font-sans">
		{#if playset.score}
			<div class="score-text">
				<h3 class="score-title">The Score</h3>
				<p>{playset.score}</p>
			</div>
		{:else if pages?.score}
			<BlobUrl src={pages?.score} let:url>
				<a class="score-page" href={url} target="_blank">
					<img
						class="playset-page"
						src={url}
						alt="{playset.score} Score"
						width={600}
						height={900}
					/>
				</a>
			</BlobUrl>
		{/if}
	</div>
</div>

<style>
	.overview-cover {
		float: left;
		margin: 2rem;
	}

	.score-container {
		background: white;
		padding: 2rem;
	}
	.score-text {
		margin: auto;
		max-width: 50rem;
	}
	.score-title {
		color: #9e032a;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.score-page {
		margin: -2rem;
	}
	.score-page img {
		max-width: 100%;
		height: auto;
	}

	@media (min-width: 40em) {
		.overview-cover {
			margin-left: 5rem;
			margin-top: 3rem;
		}
	}
	@media (max-width: 40em) {
		.overview-cover {
			font-size: 0.5rem;
		}
	}
</style>
