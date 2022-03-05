<script lang="ts">
	import BlobUrl from '../BlobUrl.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playsetTitle: string;
	export let cover: string | Blob | undefined;
</script>

<BlobUrl src={cover ?? BLANK_PAGE} let:url>
	<a class="playset-cover-link" href={url} target="_blank">
		<img class="playset-cover" src={url} alt="{playsetTitle} Cover" width={600} height={900} />
	</a>
</BlobUrl>

<style lang="scss">
	@use '../../../css/defs';

	.playset-cover {
		@include defs.shadow;
		display: block;
		width: 20em;
		height: auto;
	}
</style>
