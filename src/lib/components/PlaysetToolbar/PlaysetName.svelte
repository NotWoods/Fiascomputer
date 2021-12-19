<script lang="ts">
	import { renameTitle } from '$lib/actions';
	import Editable from '$lib/components/Editable.svelte';
	import { bindDispatch, playsetStore } from '$lib/store';

	$: title = $playsetStore?.title ?? 'Playset';

	const changeTitle = bindDispatch(playsetStore, renameTitle);
</script>

<h2 class="playset-name">
	<Editable class="playset-name-text" value={title} onChange={changeTitle} />
</h2>
