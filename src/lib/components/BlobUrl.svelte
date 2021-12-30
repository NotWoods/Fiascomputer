<svelte:options immutable={true} />

<script lang="ts">
	export let src: Blob | string;

	let lastBlobUrl: string | undefined;
	$: blobUrl = typeof src === 'string' ? undefined : URL.createObjectURL(src);
	$: {
		if (lastBlobUrl != undefined) {
			console.log(blobUrl, lastBlobUrl);
			URL.revokeObjectURL(lastBlobUrl);
		}
		lastBlobUrl = blobUrl;
	}

	$: url = blobUrl ?? (src as string);
</script>

<slot {url} />
