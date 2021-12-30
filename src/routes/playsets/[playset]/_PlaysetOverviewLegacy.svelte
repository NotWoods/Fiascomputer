<script lang="ts">
	import BlobUrl from '$lib/components/BlobUrl.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playsetTitle: string;
	export let cover: string | Blob | undefined;
	export let score: string | Blob | undefined = undefined;
</script>

<!-- We use both `inner` and `outer` below to properly achieve 100% image height with proper aspect ratio. -->
<div class="overview pages-outer">
	<div class="pages-inner">
		<BlobUrl src={cover ?? BLANK_PAGE} let:url>
			<a class="playset-page-link playset-cover-page-link" href={url} target="_blank">
				<img
					class="playset-page playset-cover-page"
					src={url}
					alt="{playsetTitle} Cover"
					width={600}
					height={900}
				/>
			</a>
		</BlobUrl>
		{#if score}
			<BlobUrl src={score} let:url>
				<a class="playset-page-link" href={url} target="_blank">
					<img class="playset-page" src={url} alt="{playsetTitle} Score" width={600} height={900} />
				</a>
			</BlobUrl>
		{/if}
	</div>
</div>

<style lang="scss">
	.playset-page {
		aspect-ratio: 600 / 900;
		background-color: white;
		object-fit: contain;
	}
	.playset-cover-page {
		background-color: var(--playset-background, white);
	}

	@media (min-width: 40em) {
		.playset-page-link {
			display: inline;
			vertical-align: middle;

			&[href] {
				cursor: zoom-in;
			}
		}

		.playset-page {
			display: inline-block;
			width: auto;
			height: 100%;
		}
	}

	@media (max-width: 40em) {
		.playset-cover-page-link {
			display: none;
		}
	}
</style>
