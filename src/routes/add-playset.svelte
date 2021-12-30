<script lang="ts">
	import Title from '$lib/components/Title.svelte';

	const pdfModule = import('$lib/pdf');

	async function addPlaysetFiles(event: Event & { currentTarget: HTMLInputElement }) {
		const files = Array.from(event.currentTarget.files!);
		const { addPlaysetFromPdf } = await pdfModule;

		const results = await Promise.allSettled(files.map(addPlaysetFromPdf));
		console.log(results);
	}
</script>

<Title text="Add Playset" />

<div id="add-playset" class="page add-playset-page" data-title="Add Playset">
	<h2 class="heading">Add playset</h2>
	<input
		class="sr-only"
		id="add-file"
		type="file"
		accept="application/pdf"
		multiple
		on:change={addPlaysetFiles}
	/>
	<ul class="add-playset-method-list">
		<li class="add-playset-method add-playset-method-file">
			<label for="add-file" class="add-playset-file-button"> Select playset PDF </label>
		</li>
		<li class="add-playset-method add-playset-method-drag-drop">
			<span class="add-playset-drag-drop-field">Drag and drop playset PDF</span>
		</li>
	</ul>
	<p class="tip">
		Tip: Try the
		<a href="https://www.drivethrurpg.com/product_info.php?products_id=78548" target="_blank"
			><cite>Fiasco</cite> PDF</a
		>
		or the
		<a href="https://www.drivethrurpg.com/product_info.php?products_id=92649" target="_blank"
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

<style lang="scss">
	@use '../css/defs';

	.add-playset-page {
		@include defs.vertical-margin(auto);
		max-width: 40rem;
		align-self: center;
		text-align: center;
		padding: 1rem;

		.heading {
			@include defs.page-heading;
			margin-bottom: 2rem;
		}

		.add-playset-method-list {
			text-align: center;

			label,
			span,
			input[type='file'] {
				color: white;
			}
		}

		.add-playset-method + .add-playset-method {
			margin-top: 1.5rem;

			&:before {
				display: block;
				content: 'or';
				margin-bottom: 1.5rem;
				font-family: defs.$heading-font;
				color: defs.$heading-color;
			}
		}

		.add-playset-file-button {
			@include defs.plain-button;
			@include defs.button;
			padding: 1rem;
			cursor: pointer;
		}

		.add-playset-drag-drop-field {
			display: block;
			padding: 2rem;
			border: 3px dashed defs.$heading-color;
			font-family: defs.$heading-font;
			background-color: defs.$dark-background-color;
		}

		&.drag {
			.add-playset-drag-drop-field {
				background-color: defs.$black;
			}
		}

		.tip {
			font-size: 0.75rem;
			margin-top: 2rem;
			font-family: defs.$heading-font;
			color: defs.$heading-color;
			line-height: 2;

			a {
				display: inline-block;
				color: defs.$white;
				text-decoration: underline;
			}
		}
	}
</style>
