<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const prerender = true;

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {};
	};
</script>

<script lang="ts">
	import BlobUrl from '$lib/components/BlobUrl.svelte';
	import DeckBox from '$lib/components/DeckBox.svelte';
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
						<a class="playset-link" href={playsetLink(playset)} class:playset-deck={playset.score}>
							{#if playset.score}
								<DeckBox title={playset.title} cover={playset.thumbnail} />
							{:else}
								<BlobUrl src={playset.thumbnail} let:url>
									<img class="playset-thumbnail" src={url} alt="" width={128} height={192} />
								</BlobUrl>
								<h3 class="playset-name">{playset.title}</h3>
							{/if}
						</a>
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

	.playset-deck {
		font-size: 0.6rem;
		--deck-angle: 0;
	}
	.playset-deck:hover,
	.playset-deck:focus {
		--deck-angle: 30;
	}
</style>
