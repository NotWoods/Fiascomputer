<script lang="ts">
	import { addOutcome, changeOutcomeValue, removeOutcome } from '$lib/actions';
	import { OutcomeDetails, outcomeName, OutcomeType } from '$lib/outcome';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let outcome: OutcomeDetails | undefined;
	export let playerIndex: number;
	export let outcomeIndex: number | undefined = undefined;
	export let editable = false;

	$: value = outcome?.value;

	function onClick(newType: OutcomeType) {
		session.dispatch(addOutcome(newType, playerIndex));
	}

	function onChange(event: Event & { currentTarget: HTMLInputElement }) {
		if (outcomeIndex == undefined) return;

		let newValue = Number(event.currentTarget.value);
		if (Number.isNaN(newValue) || newValue <= 0 || newValue > 5) {
			newValue = 0;
		}

		session.dispatch(changeOutcomeValue(playerIndex, outcomeIndex, newValue));
	}

	function onRemove() {
		if (outcomeIndex == undefined) return;
		session.dispatch(removeOutcome(playerIndex, outcomeIndex));
	}
</script>

<li
	class="font-hitchcock outcome outcome-{outcome?.type ?? 'new'}"
	title={outcome ? `${outcome.type} outcome` : undefined}
>
	{#if outcome !== undefined}
		<img
			src="/images/outcome-{outcome.type}.svg"
			alt="{outcomeName(outcome.type)} outcome"
			width="30"
			height="30"
		/>
		<input
			type="number"
			class="outcome-value"
			value={value || ''}
			on:change={onChange}
			min="0"
			max="5"
			readonly={!editable}
		/>
		{#if editable}
			<button class="remove close-button" on:click={onRemove}>
				<img src="/images/cross-white.svg" alt="Remove outcome" />
			</button>
		{/if}
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
		position: relative;
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
		background-color: defs.$outcome-positive-color;
	}
	.outcome-negative {
		background-color: defs.$outcome-negative-color;
	}
	.outcome-new-button:hover,
	.outcome-new-button:focus {
		opacity: 1;
	}
	.outcome-new {
		border: 1px dashed defs.$yellow-card-background-color;
		background-color: var(--dark-background-color);
	}

	.close-button {
		position: absolute;
		top: 100%;
		padding: 0.75rem;
		visibility: hidden;
	}
	.outcome:hover .close-button {
		visibility: visible;
	}
</style>
