<script lang="ts">
	import BlobUrl from './BlobUrl.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let title: string;
	export let cover: string | Blob | undefined;
</script>

<div class="deck font-hitchcock">
	<div class="deck-cover">
		<BlobUrl src={cover ?? BLANK_PAGE} let:url>
			<img class="deck-cover-icon" src={url} alt="{title} Cover" width={562} height={785} />
		</BlobUrl>
		<h3 class="deck-cover-playset">Playset</h3>
		<p class="deck-title">
			{title}
		</p>
	</div>
	<div class="deck-side" aria-hidden="true">
		<p class="deck-title">{title}</p>
		<div class="deck-icon" />
	</div>
</div>

<style>
	:root {
		--deck-angle: 30deg;
	}

	.deck {
		perspective: 500px;
		transform-style: preserve-3d;
		display: inline-flex;
		flex-direction: row-reverse;
	}
	.deck-cover,
	.deck-side {
		background-color: var(--playset-background, white);
		border: 2px solid rgba(255, 255, 255, 0.5);
		color: white;
		height: 28em;
		transition: transform ease-in-out 0.2s;
	}
	.deck-title {
		text-align: center;
		padding: 1em;
		font-size: 1.25em;
	}

	.deck-cover {
		position: relative;
		width: 20em;
		transform: rotateY(var(--deck-angle));
		transform-origin: left;
		border-bottom-color: rgba(0, 0, 0, 0.5);
		border-right-color: rgba(0, 0, 0, 0.5);
	}
	.deck-cover-playset,
	.deck-cover-icon,
	.deck-cover .deck-title {
		position: absolute;
	}
	.deck-cover-playset {
		background: #231f20;
		color: #d2a90d;
		padding: 0.25em;
		top: 5em;
		width: 100%;
		text-align: center;
	}
	.deck-cover-icon {
		object-fit: contain;
		width: 100%;
		height: auto;
		top: 1em;
		bottom: 0;
		margin: auto;
	}
	.deck-cover .deck-title {
		left: 0;
		right: 0;
		bottom: 0;
	}

	.deck-side {
		width: 5em;
		transform: rotateY(calc(-90deg + var(--deck-angle)));
		transform-origin: right;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-right-width: 0;
		border-bottom-color: rgba(0, 0, 0, 0.5);
		border-left-color: rgba(0, 0, 0, 0.5);
	}
	.deck-icon {
		margin: 1em;
		width: calc(100% - 2em);
		border-radius: 50%;
		background: #ffcb08;
		aspect-ratio: 1 / 1;
	}
	.deck-side .deck-title {
		writing-mode: vertical-rl;
		writing-mode: sideways-lr;
		flex: 1;
	}
</style>
