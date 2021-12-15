<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';

	export let playerNumber: number;

	let playerName = `Player ${playerNumber}`;
</script>

<div id={`player-${playerNumber}`} class="player">
	<img class="player-image" src="/images/player-black.svg" alt="" />
	<div class="player-name-outer">
		<Editable
			class="player-name"
			value={playerName}
			onChange={(name) => {
				playerName = name;
			}}
		/>
	</div>
</div>
