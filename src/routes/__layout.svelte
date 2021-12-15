
<script lang="ts">
  import Header from '$lib/components/Header/Header.svelte'
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/client.scss">
</svelte:head>

<Header menuItems={new Set([
  'enter-fullscreen',
  'leave-fullscreen',
  'theme'
])} />
<main>
  <slot />
</main>
