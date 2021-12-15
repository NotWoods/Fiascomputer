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
      <a href="./setup?players=3" class="players-link" id="players-link-3">3 players</a>
      <a href="./setup?players=4" class="players-link" id="players-link-4">4 players</a>
      <a href="./setup?players=5" class="players-link" id="players-link-5">5 players</a>
  </div>
</div>
