<script lang="ts">
  import type { PlaysetTable } from "$lib/playset";
  import Editable from "$lib/components/Editable.svelte";

  export let category: number;
  export let table: PlaysetTable;

  $: categoryData = table.categories[category];

  export let changeCategory: ((category: number, text: string) => void) | undefined = undefined
  export let changeElement: ((category: number, element: number, text: string) => void) | undefined = undefined
</script>

<li class="category" value={category + 1}>
  <h3 class="category-name font-hitchcock">
    <Editable tag="a" href="./setup" class="category-link" value={categoryData.name} onChange={(text) => changeCategory?.(category, text)} />
  </h3>
  <ol class="elements">
    {#each categoryData.elements as elementData, element}
      <li class="element-name font-sans" value={element + 1}>
        <img class="die" src="/die/{element + 1}.svg" alt={(element + 1).toString()} width="16" height="16" />
        <Editable tag="a" href="./setup" class="element-link" value={elementData} onChange={(text) => changeElement?.(category, element, text)} />
      </li>
    {/each}
  </ol>
</li>

<style>
  .die {
    display: inline-block;
    vertical-align: sub;
    margin-right: 0.5rem;
  }
</style>
