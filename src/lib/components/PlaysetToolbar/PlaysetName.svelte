<script lang="ts">
	import { renameTitle } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { bindDispatch } from '$lib/store';
	import { getStoreContext } from '$lib/store';

	const { playset } = getStoreContext();
	$: title = $playset?.title ?? 'Playset';

	const changeTitle = bindDispatch(playset, renameTitle);
</script>

<h2 class="playset-name">
	<Editable class="playset-name-text" value={title} onChange={changeTitle} />
</h2>
