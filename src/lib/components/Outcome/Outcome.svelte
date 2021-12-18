<script lang="ts">
	import { OutcomeType } from '$lib/outcome';

	export let type: OutcomeType | undefined;
	export let value: number | undefined = undefined;
	export let onClick: (type: OutcomeType) => void = () => {};

	function onChange(event: Event & { currentTarget: HTMLInputElement }) {
		const newValue = Number(event.currentTarget.value);
		if (Number.isNaN(newValue) || newValue <= 0 || newValue > 5) {
			value = 0;
		} else {
			value = newValue;
		}
	}
</script>

<li class="font-hitchcock outcome outcome-{type ?? 'new'}" title="{type} outcome">
	{#if type !== undefined}
		<img src="/images/outcome-{type}.svg" alt="{type} outcome" width="30" height="30" />
		<input
			type="number"
			class="outcome-value"
			value={value || ''}
			on:change={onChange}
			min="0"
			max="5"
		/>
	{:else}
		{#each Object.values(OutcomeType) as newType}
			<button
				type="button"
				class="outcome-new-button outcome-{newType}"
				title="Add {newType} outcome"
				on:click={() => onClick(newType)}
			>
				<img
					class="new-icon"
					src="/images/outcome-{newType}.svg"
					alt="Add {newType} outcome"
					width="20"
					height="20"
				/>
			</button>
		{/each}
	{/if}
</li>

<style lang="scss">
	@use '../../../css/defs';

	.outcome,
	.outcome-new-button {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.outcome {
		color: white;
		border: 1px solid currentColor;
		height: 4rem;
		width: 2.75rem;
		@include defs.shadow;
	}

	.outcome-value {
		@include defs.plain-button;
		width: 100%;
		margin-top: 0.25rem;
		font: inherit;
		text-align: center;
		-moz-appearance: textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	.outcome-new-button {
		@include defs.plain-button;
		width: 100%;
		height: 50%;
		opacity: 0.5;
	}
	.outcome-positive {
		background-color: #2c4e5f;
	}
	.outcome-negative {
		background-color: #b72026;
	}
	.outcome-new-button:hover,
	.outcome-new-button:focus {
		opacity: 1;
	}
	.outcome-new {
		border: 1px dashed defs.$yellow-card-background-color;
		background-color: var(--dark-background-color);
	}
</style>
