<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		return {};
	};
</script>

<script lang="ts">
	import { range } from '$lib/storage/session';
	import { sessionStore } from '$lib/store';
	import { changeActivePlayers } from '$lib/actions';

	const playerOptions = range(3, (i) => i + 3);

	export let joinLink: string = '';

	let state: 'inactive' | 'loading' | 'active' | undefined = undefined;
</script>

<div id="players" class="page players-page">
	<h2>Number of players</h2>
	<div class={`collaboration ${state}`} hidden={!state}>
		<div class="inactive">
			<button type="button" id="invite-button">
				<span class="label">Invite players</span>
				<span class="backend">with Google Drive</span>
			</button>
		</div>
		<div class="loading">
			<p class="message">Starting session...</p>
		</div>
		<div class="active">
			<p class="instructions">To invite players, give them this link:</p>
			<a href={joinLink} target="_blank" id="join-link">{joinLink}</a>
		</div>
	</div>
	<div class="links">
		{#each playerOptions as players}
			<a
				href="./setup"
				class="players-link"
				id="players-link-{players}"
				on:click={() => sessionStore.dispatch(changeActivePlayers(players))}>{players} players</a
			>
		{/each}
	</div>
</div>
