<script lang="ts">
	export let value: string;
	export let editable = true;

	$: text = value.trim() === '' ? '\u00a0' : value;
</script>

<input
	{...$$restProps}
	class="editable {$$restProps.class}"
	value={text}
	disabled={!editable}
	on:change
/>

<style lang="scss">
	@use '../../css/defs';

	.editable {
		font: inherit;
		color: inherit;
		background: transparent;
		border: 0;
		text-align: center;
		max-width: 100%;
		transition: outline 0.1s ease-in;
		outline: 0.15em dashed transparent;
		outline-offset: 0.25em;
	}
	.editable:not(:disabled):hover {
		outline-color: currentColor;
	}
	.editable:focus {
		outline-color: currentColor;
		outline-width: 0.2em;
	}
</style>
