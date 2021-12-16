<script lang="ts">
  import type { Playset } from '$lib/playset';
  import SelectCardRow from './_SelectCardRow.svelte';
	import { cardColors, cardName, CardType, icons } from './card-colors';

  export let playset: Playset;
	export let type: CardType;
  let category: 1 | 2 | 3 | 4 | 5 | 6 | undefined = undefined;
  let element: 1 | 2 | 3 | 4 | 5 | 6 | undefined = undefined;

	$: colors = cardColors[type];
</script>

<div class="item {type}">
  <h3 aria-label={cardName(type)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 786 190"
      class="card-graphic"
      aria-hidden="true"
    >
      <path fill={colors.top} d="M0 0v186l788-71V0H0Z" />
      <path fill="#fff" d={icons[type]} />
      <g rotate="4">
        <text class="card-heading font-hitchcock" x="190" y="120">{cardName(type)}</text>
      </g>
    </svg>
  </h3>
  <SelectCardRow descriptionType="category" {type} {category} />
  <SelectCardRow descriptionType="element" {type} {category} {element} />
</div>

<style>
  .card-graphic {
    margin: -1em;
    margin-bottom: 0;
  }
  .card-heading {
    fill: white;
    transform: rotateZ(-4deg);
    font-size: 300%;
  }
</style>
