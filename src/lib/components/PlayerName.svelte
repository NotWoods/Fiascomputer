<script lang="ts">
	import { renamePlayer } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let playerIndex: number;
	export let editable = false;

	$: player = $session.players[playerIndex];

	function changeName(event: Event) {
		const name = (event.currentTarget as HTMLInputElement).value;
		session.dispatch(renamePlayer(playerIndex, name));
	}
</script>

<Editable
	class="player-name font-hitchcock"
	value={player?.name ?? `Player ${playerIndex + 1}`}
	{editable}
	on:change={changeName}
/>
