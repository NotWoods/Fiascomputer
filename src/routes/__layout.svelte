
<script lang="ts">
  import Header from '$lib/components/Header/Header.svelte'
  import '../css/main.scss'
</script>

<Header menuItems={new Set([
  'enter-fullscreen',
  'leave-fullscreen',
  'theme'
])} />
<main>
  <slot />
</main>
