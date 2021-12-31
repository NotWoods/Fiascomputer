<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<div class="item {className}">
	<slot />
</div>

<style lang="scss">
	@use '../../../css/defs';

	.item {
		margin-bottom: 1rem;
	}
	.item:last-child {
		margin-bottom: 0;
	}

	.item {
		position: relative;
		padding: 1rem;
		background-color: defs.$yellow-card-background-color;
		@include defs.shadow;
	}
</style>
