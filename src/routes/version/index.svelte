<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = ({ page }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {
			props: {
				currentVersion: '1.2'
			}
		};
	};
</script>

<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Version from './_Version.svelte';

	export let currentVersion: string;
</script>

<Title text="Version {currentVersion}" />

<div id="version" class="page version-page">
	<div class="document">
		<h2 class="title">New version: <span id="version-number">{currentVersion}</span></h2>

		<Version {currentVersion} version="1.2">
			<h3>Online play feature removed</h3>
			<p>
				Due to changes in the underlying Google Drive backend and lack of time to implement a
				replacement, the online play feature will unfortunately no longer be available.
			</p>
		</Version>
		<Version {currentVersion} version="1.1">
			<h3>Online play through Google Drive</h3>
			<p>
				Select a playset, then select "Invite players" on the player selection screen. (Experimental
				feature; <a href="mailto:jakob@tabletopsoftware.net">share your feedback</a>.)
			</p>
			<iframe
				src="https://www.youtube.com/embed/3O_Z-PKzwbU"
				allowfullscreen
				title="Fiascomputer: online play"
			/>
		</Version>
		<Version {currentVersion} version="1.0">
			<h3>Initial release of Fiascomputer</h3>
			<p>
				Import playsets, edit playsets, create setups, bundled with the 36 official playsets of the
				month.
			</p>
		</Version>

		<a href="/playsets/" class="start-button">Start</a>

		<button
			type="button"
			class="close-button"
			id="close-version-control"
			on:click={() => history.back()}
		>
			<img src="/images/cross-black.svg" alt="Close" />
		</button>
	</div>
</div>

<style lang="scss">
	@use '../../css/defs';

	.version-page {
		@include defs.flex(row, $horizontal: center);
		@include defs.vertical-margin(auto);

		.document {
			@include defs.paper;
			@include defs.document;
			flex: 1;
			position: relative;
			max-width: 60rem;
			text-align: center;

			@media (min-width: 40em) {
				@include defs.vertical-margin(2rem);
			}
		}

		.title {
			@include defs.heading;
			margin-bottom: 2rem;
		}

		.start-button {
			@include defs.plain-button;
			@include defs.button;
			padding: 1rem;
		}

		.version {
			margin-top: 2rem;
			margin-bottom: 2rem;
		}

		.version:not(.current) {
			display: none;
		}

		iframe {
			display: block;
			@include defs.horizontal-margin(auto);
			width: 100%;
			max-width: 560px;
			height: 315px;
			border: 0;
		}
	}
</style>
