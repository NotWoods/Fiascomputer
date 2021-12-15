<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {
			props: {
				playset: await loadBundledPlayset(page.params.playset, fetch)
			}
		};
	};
</script>

<script lang="ts">
	import { loadBundledPlayset, Playset } from '$lib/playset';
	import Editable from '$lib/components/Editable.svelte';

	const BLANK_PAGE = '/images/blank-page.svg';

	export let playset: Playset;
	export let alreadyStarted = false;

	$: cover = playset.pages[0] ?? BLANK_PAGE;
	$: credits = playset.pages[1];
	$: score = playset.pages[2];

	function startSetup() {}
	function resumeSetup() {}
	function deletePlayset() {}
	function changeTitle(title: string) {
		playset.title = title;
	}
</script>

<svelte:head>
	<title>{playset.title} | Fiascomputer</title>
</svelte:head>

<div id="playset-preview" class="page playset-preview-page">
	<h2 class="playset-name">
		<Editable class="playset-name-text" value={playset.title} onChange={changeTitle} />
	</h2>
	<!-- We use both `inner` and `outer` below to properly achieve 100% image height with proper aspect ratio. -->
	<div class="pages-outer">
		<div class="pages-inner">
			<a href={cover} target="_blank" class="playset-page-link" id="playset-cover-page-link">
				<img src={cover} class="playset-page" id="playset-cover-page" alt="" />
			</a>
			<a
				href={score ?? BLANK_PAGE}
				target="_blank"
				class="playset-page-link"
				id="playset-score-page-link"
			>
				<img
					src={score ?? BLANK_PAGE}
					class="playset-page"
					id="playset-score-page"
					alt=""
					hidden={!score}
				/>
			</a>
		</div>
	</div>
	<div class="links">
		<a
			href="./players"
			class="play-link"
			id="start-setup-control"
			hidden={alreadyStarted}
			on:click={startSetup}>Play!</a
		>
		<a
			href="./setup"
			class="resume-link"
			id="resume-setup-control"
			hidden={!alreadyStarted}
			on:click={resumeSetup}>Resume</a
		>
		<a
			href={credits ?? BLANK_PAGE}
			target="_blank"
			class="credits-link"
			id="playset-credits-page-link"
			hidden={!credits}>Credits</a
		>
		<a href="/playsets" class="delete-link" id="delete-playset-control" on:click={deletePlayset}
			>Delete playset</a
		>
	</div>
	<a href="/playsets" class="back">Back</a>
</div>
