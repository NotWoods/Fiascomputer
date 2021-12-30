<script lang="ts">
	import BlobbyImage from '$lib/components/BlobbyImage.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playsetTitle: string;
	export let cover: string | Blob | undefined;
	export let score: string | Blob | undefined = undefined;
</script>

<!-- We use both `inner` and `outer` below to properly achieve 100% image height with proper aspect ratio. -->
<div class="overview pages-outer">
	<div class="pages-inner">
		<BlobbyImage
			aClass="playset-page-link playset-cover-page-link"
			imgClass="playset-page playset-cover-page"
			target="_blank"
			src={cover ?? BLANK_PAGE}
			alt="{playsetTitle} Cover"
			width={600}
			height={900}
		/>
		{#if score}
			<BlobbyImage
				aClass="playset-page-link "
				imgClass="playset-page"
				target="_blank"
				src={score}
				alt="{playsetTitle} Score"
				width={600}
				height={900}
			/>
		{/if}
	</div>
</div>

<style>
	:global(.playset-page) {
		aspect-ratio: 600 / 900;
		background-color: white;
		object-fit: contain;
	}
	:global(.playset-cover-page) {
		background-color: var(--playset-background, white);
	}
</style>
