<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import { BUNDLED_PLAYSETS, loadBundledPlayset } from '$lib/playset';
	import { playsetLink } from '$lib/playset';

	const playsetsReady = Promise.all(BUNDLED_PLAYSETS.map((id) => loadBundledPlayset(id))).then(
		(playsets) => playsets.sort((a, b) => a.title.localeCompare(b.title))
	);
	let loading = 0;
</script>

<Title text="Playsets" />

<div id="playsets" class="page playsets-page" class:loading={loading > 0}>
	<h2>Select Playset</h2>
	<ul class="playsets">
		{#await playsetsReady then playsets}
			{#each playsets as playset (playset.id)}
				<li class="playset" class:deleted={playset.deleted} style="--playset-background: {playset.backgroundColor ?? ''}">
					<a class="playset-link" href={playsetLink(playset)}>
						<img src={playset.cover} alt="" class="playset-thumbnail" width="128" height="192" />
						<h3 class="playset-name">{playset.title}</h3>
					</a>
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
	.playset-link {
		background-color: var(--playset-background, var(--dark-background-color));
	}
	.playset-thumbnail {
		object-fit: contain;
		background-color: var(--playset-background);
	}
</style>
