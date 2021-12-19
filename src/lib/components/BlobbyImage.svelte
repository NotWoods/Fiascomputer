<svelte:options immutable={true} />

<script lang="ts">
	export let src: Blob | string;
	export let href: string | undefined = undefined;
	export let width: number;
	export let height: number;
	export let alt: string;
	export let target: string | undefined = undefined;

	export let imgClass: string = '';
	export let aClass: string = '';

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

<a href={href ?? url} {target} class={aClass}>
	<img src={url} {alt} {width} {height} class={imgClass} />
	<slot />
</a>
