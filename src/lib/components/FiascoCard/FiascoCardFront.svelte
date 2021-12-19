<script lang="ts">
	import { Playset, playsetShortCode } from '$lib/playset';
	import { cardColors, cardName, CardType, icons } from './card-colors';

	export let playset: Playset;
	export let type: CardType;
	let category: string | undefined = undefined;

	$: colors = cardColors[type];
</script>

<div class={`item ${type}`}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 786 563" class="card-graphic">
		<path fill={colors.top} d="M0 0v186l788-71V0H0Z" />
		<path fill="#fff" d={icons[type]} />
		<g rotate="4">
			<text class="card-heading font-hitchcock" x="190" y="120">{cardName(type)}</text>
		</g>
	</svg>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 786 563"
		class="card-graphic"
		pointer-events="visibleFill"
	>
		<path fill={colors.left} d="M0 197v365h190l-46-377L0 197Z" />
		<text
			xlink:href="./{type}/"
			class="card-description-line card-category font-hitchcock"
			x="190"
			y="290">Select Category</text
		>
		<text
			xlink:href="./{type}/{category ?? ''}"
			class="card-description-line card-element font-sans"
			x="190"
			y="340">Select Element</text
		>
	</svg>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 786 563"
		class="card-graphic"
		pointer-events="visibleFill"
	>
		<path fill={colors.bottom} d="M198 563h590v-84l-597-38 7 121Z" />
		<text class="card-credits font-sans" x="20" y="542">{playsetShortCode(playset)}36</text>
		<text class="card-credits font-sans" x="568" y="520" text-anchor="end">{playset.title}</text>
		<text class="card-credits font-hitchcock" x="580" y="515">Fiasco</text>
		<text class="card-credits font-sans" x="695" y="520">Playset</text>
		<text class="card-credits font-sans" x="230" y="542"
			>©2020 Bully Pulpit Games LLC www.bullypulpitgames.com</text
		>
	</svg>
</div>

<style>
	.item {
		position: relative;
		aspect-ratio: 786 / 563;
		padding: 0;
	}
	.card-graphic {
		margin-top: 0;
		position: absolute;
		top: 0;
		left: 0;
	}
	.card-heading,
	.card-description {
		text-align: left;
	}
	.card-heading {
		transform: rotateZ(-4deg);
		font-size: 300%;
	}
	.card-description {
		top: 40%;
		left: 20%;
	}
	.card-description-line:hover .remove {
		visibility: visible;
	}

	.card-category {
		font-size: 2.6em;
	}
	.card-element {
		font-size: 2em;
	}

	.card-credits,
	.card-heading {
		fill: white;
	}
	.card-credits {
		font-size: 1.3em;
	}
	.remove {
		margin-left: auto;
		visibility: hidden;
	}
</style>
