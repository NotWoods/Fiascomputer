<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { Engine, loadBundledEngine } from '$lib/storage/engine';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const engine = await loadBundledEngine('normal', fetch);

		return {
			props: {
				aftermath: engine.aftermath
			}
		};
	};

	function formattedAftermathValue(key: string) {
		if (key.endsWith('+')) {
			key = key.slice(0, -1);
		}
		const [start] = key.split('-');
		return start;
	}

	function formattedAftermathRange(range: string) {
		if (range === '0') {
			return 'Zero';
		}

		return range.replace('-', '–');
	}
</script>

<script lang="ts">
	import { outcomeName, OutcomeType } from '$lib/outcome';
	import type { Aftermath } from '$lib/storage/engine';
	import { getStoreContext } from '$lib/store';
	import Title from '$lib/components/Title.svelte';
	import PlayerScore from './_PlayerScore.svelte';

	const PLAYER_INDEX = [0, 1, 2, 3, 4];
	const { playset, session } = getStoreContext();

	export let aftermath: Aftermath;

	$: activePlayers = $session.players.length;
</script>

<Title text="Aftermath" playsetTitle={$playset.title} />

<div id="aftermath" class="page aftermath-page players-{activePlayers}">
	<h2 class="page-heading font-hitchcock">Aftermath</h2>
	<ol class="players">
		<h3 class="sr-only">Players</h3>
		{#each PLAYER_INDEX as playerIndex}
			<PlayerScore {playerIndex} />
		{/each}
	</ol>
	<article class="table font-sans">
		{#each Object.values(OutcomeType) as outcomeType}
			<ol class="aftermath-category">
				<h3 class="aftermath-title">{outcomeName(outcomeType)} aftermath total...</h3>
				{#each Object.entries(aftermath[outcomeType]) as [range, text] (range)}
					<li value={formattedAftermathValue(range)}>
						<details class="aftermath-card">
							<summary>
								<h4 class="aftermath-card-title outcome-{outcomeType}">
									{formattedAftermathRange(range)}
								</h4>
							</summary>
							{text}
						</details>
					</li>
				{/each}
			</ol>
		{/each}
	</article>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.page-heading {
		font-size: 2rem;
		line-height: 1.5;
		text-align: center;
		color: var(--heading-color);
		margin: 1rem 0;
	}

	.players,
	.table {
		max-width: 60rem;
		margin: auto;
	}

	.players {
		margin-bottom: 1rem;
	}

	.table {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		background-color: black;
		color: #f2f2f2;
	}

	@media (max-width: 40em) {
		.table {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}

	.aftermath-title {
		font-size: 1.5rem;
		font-family: Hitchcock, sans-serif;
		margin-bottom: 1.5rem;
	}

	.aftermath-card {
		margin-bottom: 0.75rem;
	}
	summary {
		margin-bottom: 0.25rem;
		cursor: pointer;
	}

	.aftermath-card-title {
		display: inline;
		margin-bottom: 0.75rem;
	}
	.outcome-positive {
		color: defs.$outcome-positive-color;
	}
	.outcome-negative {
		color: defs.$outcome-negative-color;
	}
</style>
