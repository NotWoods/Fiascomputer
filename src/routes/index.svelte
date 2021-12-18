<script lang="ts" context="module">
  import Title from '$lib/components/Title.svelte'

	export const load: import('@sveltejs/kit').Load = () => {
    return {
      status: 301,
      redirect: '/playsets'
    }
  }
</script>

<Title homePage text="" />
