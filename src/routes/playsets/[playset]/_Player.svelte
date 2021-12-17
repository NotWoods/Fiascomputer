<script lang="ts">
import { renamePlayer } from '$lib/actions';

	import Editable from '$lib/components/Editable.svelte';
import { sessionStore } from '$lib/store';

	export let playerIndex: number;

	$: player = $sessionStore.players[playerIndex];
</script>

<div id={`player-${playerIndex + 1}`} class="player">
	<img class="player-image" src="/images/player-black.svg" alt="" />
	<div class="player-name-outer">
		<Editable
			class="player-name"
			value={player?.name ?? `Player ${playerIndex + 1}`}
			onChange={(name) => sessionStore.dispatch(renamePlayer(playerIndex, name))}
		/>
	</div>
</div>
