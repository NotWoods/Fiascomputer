<script lang="ts">
  import type { FiascoCardColors } from './card-colors';

	export let colors: FiascoCardColors;
</script>

<div>
  <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 786 563">
    <g fill-rule="nonzero">
      <path fill={colors.top} d="M0 0h785v115L0 186V0z"/>
      <path fill={colors.left} d="M0 563V197l143-12 47 378H0z"/>
      <path fill={colors.bottom} d="M197 563l-7-122 595 38v84H197z"/>
    </g>
  </svg>
</div>
