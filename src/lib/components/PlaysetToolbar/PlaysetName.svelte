<script lang="ts">
	import { renameTitle } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { getStoreContext } from '$lib/store';
	import { matchMedia } from '$lib/store/match-media';

	const smallScreen = matchMedia('(max-width: 40rem)');

	const { playset } = getStoreContext();
	$: title = $playset?.title ?? 'Playset';

	function changeTitle(event: CustomEvent<{ value: string }>) {
		const title = event.detail.value;
		playset.dispatch(renameTitle(title));
	}
</script>

<Editable
	class="playset-name-text w-full"
	multiline={$smallScreen ? 2 : 0}
	value={title}
	ariaLabel="Playset name"
	on:change={changeTitle}
/>
