<script lang="ts">
	import { getTable } from '$lib/playset';
	import type { CardDetails } from '$lib/storage/session';
	import { getStoreContext } from '$lib/store';
	import { cardColors, cardName, icons } from './card-colors';
	import BaseCard from './_BaseCard.svelte';
	import type { DescriptionType } from './_CardRow.svelte';

	const { playset } = getStoreContext();

	export let cardDetails: CardDetails;
	export let pairIndex: number;
	export let editable = false;

	$: type = cardDetails.table;
	$: colors = cardColors[type];
	$: categories = getTable($playset, type).categories;

	$: cardRowLink = (descriptionType: DescriptionType) => {
		if (!editable) {
			return undefined;
		} else {
			const category = descriptionType === 'category' ? undefined : cardDetails.category;
			let link = `./${cardDetails.table}/${category || ''}`;
			if (editable) {
				link = `${link}?pair=${pairIndex}`;
			}
			return link;
		}
	};
</script>

<BaseCard
	label={cardName(type)}
	{cardDetails}
	{categories}
	{editable}
	buildHref={cardRowLink}
	on:remove
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 786 187"
		class="card-graphic"
		aria-hidden="true"
	>
		<path fill={colors.top} d="M0 0v186l788-71V0H0Z" />
		<path fill="#fff" d={icons[type]} />
		<text class="card-heading font-hitchcock" x="190" y="120">{cardName(type)}</text>
	</svg>
</BaseCard>

<style>
	.card-heading {
		fill: white;
		transform: rotateZ(-4deg);
		font-size: 300%;
	}
</style>
