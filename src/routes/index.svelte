<script lang="ts" context="module">
	export const load: import('@sveltejs/kit').Load = () => {
    return {
      status: 301,
      redirect: '/playsets'
    }
  }
</script>

<svelte:head>
	<title>Fiascomputer | Create and visualize Fiasco setups</title>
</svelte:head>
