<script lang="ts">
	import { BUNDLED_PLAYSETS, loadBundledPlayset, Playset } from '$lib/playset';
	import { playsetLink } from '$lib/playset';

	const playsetsReady = Promise.all(BUNDLED_PLAYSETS.map((id) => loadBundledPlayset(id))).then(
		(playsets) => playsets.sort((a, b) => a.title.localeCompare(b.title))
	);
	let loading = 0;
</script>

<svelte:head>
	<title>Playsets | Fiascomputer</title>
</svelte:head>

<div id="playsets" class="page playsets-page" class:loading={loading > 0}>
	<h2>Select Playset</h2>
	<ul class="playsets">
		{#await playsetsReady then playsets}
			{#each playsets as playset (playset.id)}
				<li class="playset" class:deleted={playset.deleted}>
					<a class="playset-link" href={playsetLink(playset)}>
						<img src={playset.cover} alt="" class="playset-thumbnail" />
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
