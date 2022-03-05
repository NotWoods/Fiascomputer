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
	import DeckBox from '$lib/components/PlaysetImage/DeckBox.svelte';
	import Title from '$lib/components/Title.svelte';
	import {
		BUNDLED_PLAYSETS,
		isDeckPlayset,
		loadBundledPlayset,
		type PlaysetData
	} from '$lib/playset';
	import { playsetLink } from '$lib/playset';

	function sortPlaysets(a: PlaysetData, b: PlaysetData) {
		if (isDeckPlayset(a) === isDeckPlayset(b)) {
			return a.title.localeCompare(b.title);
		} else {
			return isDeckPlayset(b) ? 1 : -1;
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
							{#if isDeckPlayset(playset)}
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
		<li class="add-playset" hidden>
			<a href="/add-playset" class="add-playset-link">
				<span class="add-playset-label">Add Playset</span>
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
	@use '../../css/defs';

	.playsets-page {
		flex: 1;
		@include defs.flex(column, $horizontal: center);
		overflow: auto;

		h2 {
			@include defs.page-heading;
			margin-top: 2rem;
			margin-bottom: 1.25rem;
		}

		.playsets {
			@include defs.flex(
				row,
				$horizontal: center,
				$vertical: stretch,
				$horizontal-spacing: 1.5rem,
				$vertical-spacing: 1.5rem,
				$multiline: true
			);
		}

		.playset,
		.add-playset {
			@include defs.flex(row, $vertical: stretch);
			overflow: visible;
			position: relative;
		}

		.playset.deleted .playset-link {
			opacity: 0.25;
		}

		.playset.deleted:hover:after {
			content: 'Recover';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			@include defs.flex(column, $horizontal: center, $vertical: center);
			font-family: defs.$heading-font;
			color: defs.$white;
			pointer-events: none;
		}

		.playset-link,
		.add-playset-link {
			flex: 1;
			@include defs.flex(column, $horizontal: center);
			@include defs.button($border: true);
			text-align: center;
			overflow: hidden;
		}

		.add-playset-link {
			&:before {
				display: flex;
				width: 8rem;
				height: 12rem;
				align-items: center;
				justify-content: center;
				content: '+';
				font-size: 8rem;
			}
		}

		.playset-thumbnail {
			display: block;
			height: 12rem;
		}

		.playset-name,
		.add-playset-label {
			flex: 1;
			@include defs.flex(column, $horizontal: center, $vertical: center);
			width: 8rem;
			padding: 0.5rem;
			font-size: 0.75rem;
			font-family: defs.$heading-font;
			line-height: 1.5;
			overflow-wrap: break-word;
			hyphens: auto;
			text-overflow: ellipsis;
		}
	}

	.playsets-page.loading {
		.add-playset:before {
			@include defs.loading-indicator;
			display: block;
			align-self: center;
			margin-right: 1.5rem;
		}
	}

	.playset-link {
		background-color: var(--playset-background, var(--dark-background-color));
	}
	.playset-thumbnail {
		object-fit: contain;
		background-color: var(--playset-background);
	}

	.playset-deck {
		font-size: 0.6rem;
		--deck-angle: 0;
	}
</style>
