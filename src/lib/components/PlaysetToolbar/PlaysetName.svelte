<script lang="ts">
	import { renameTitle } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { getStoreContext } from '$lib/store';

	const { playset } = getStoreContext();
	$: title = $playset?.title ?? 'Playset';

	function changeTitle(event: Event) {
		const title = (event.currentTarget as HTMLInputElement).value;
		playset.dispatch(renameTitle(title));
	}
</script>

<Editable class="playset-name-text w-full" value={title} on:change={changeTitle} />
