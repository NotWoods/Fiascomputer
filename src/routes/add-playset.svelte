<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<Title text="Add Playset" />

<div id="add-playset" class="page add-playset-page" data-title="Add Playset">
	<h2 class="heading">Add playset</h2>
	<ul class="add-playset-method-list">
		<li class="add-playset-method add-playset-method-file">
			<button type="button" id="add-playset-file-button" class="add-playset-file-button"
				>Select playset PDF</button
			>
		</li>
		<li class="add-playset-method add-playset-method-drag-drop">
			<span class="add-playset-drag-drop-field">Drag and drop playset PDF</span>
		</li>
	</ul>
	<p class="tip">
		Tip: Try the
		<a href="http://www.bullypulpitgames.com/store/#40" target="_blank"><cite>Fiasco</cite> PDF</a>
		or the
		<a href="http://www.bullypulpitgames.com/store/#70" target="_blank"
			><cite>Fiasco Companion</cite> PDF</a
		>
		to get four playsets at once!
	</p>
	<p class="tip">
		Looking for playsets? Try <a href="http://fiascoplaysets.com/" target="_blank"
			>FiascoPlaysets.com</a
		>.
	</p>
</div>
