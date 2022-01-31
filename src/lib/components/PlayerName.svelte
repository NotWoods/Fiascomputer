<script lang="ts">
	import { renamePlayer } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let playerIndex: number;
	export let editable: boolean;
	export let multiline = 2;

	$: player = $session.players[playerIndex];

	function changeName(event: CustomEvent<{ value: string }>) {
		const name = event.detail.value;
		session.dispatch(renamePlayer(playerIndex, name));
	}
</script>

<Editable
	class="player-name font-hitchcock w-full"
	value={player?.name ?? `Player ${playerIndex + 1}`}
	{multiline}
	{editable}
	on:change={changeName}
/>
