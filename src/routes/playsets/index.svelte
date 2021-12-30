<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {};
	};
</script>

<script lang="ts">
	import BlobbyImage from '$lib/components/BlobbyImage.svelte';
	import Title from '$lib/components/Title.svelte';
	import { BUNDLED_PLAYSETS, loadBundledPlayset, PlaysetData } from '$lib/playset';
	import { playsetLink } from '$lib/playset';

	function sortPlaysets(a: PlaysetData, b: PlaysetData) {
		if (Boolean(a.score) === Boolean(b.score)) {
			return a.title.localeCompare(b.title);
		} else {
			return b.score ? 1 : -1;
		}
	}

	const playsetsReady = Promise.all(BUNDLED_PLAYSETS.map((id) => loadBundledPlayset(id))).then(
		(playsets) => playsets.sort(sortPlaysets)
	);
	let loading = 0;
</script>

<Title text="Playsets" />

<div id="playsets" class="page playsets-page" class:loading={loading > 0}>
	<h2>Select Playset</h2>
	<ul class="playsets">
		{#await playsetsReady then playsets}
			{#each playsets as playset (playset.id)}
				<li
					class="playset"
					class:deleted={playset.deleted}
					style="--playset-background: {playset.backgroundColor ?? ''}"
				>
					{#if playset.thumbnail != undefined}
						<BlobbyImage
							aClass="playset-link"
							imgClass="playset-thumbnail"
							href={playsetLink(playset)}
							src={playset.thumbnail}
							alt=""
							width={128}
							height={192}
						>
							<h3 class="playset-name">{playset.title}</h3>
						</BlobbyImage>
					{:else}
						<h3 class="playset-name">{playset.title}</h3>
					{/if}
				</li>
			{/each}
		{/await}
		<li class="add-playset">
			<a href="/add-playset" class="add-playset-link">
				<span class="add-playset-label">Add Playset</span>
			</a>
		</li>
	</ul>
</div>

<style>
	:global(.playset-link) {
		background-color: var(--playset-background, var(--dark-background-color));
	}
	:global(.playset-thumbnail) {
		object-fit: contain;
		background-color: var(--playset-background);
	}
</style>
