<script lang="ts" context="module">
	import Title from '$lib/components/Title.svelte';

	export const load: import('@sveltejs/kit').Load = () => {
		return {
			status: 301,
			redirect: '/playsets/'
		};
	};
</script>

<Title homePage text="" />

<div id="splash" class="page splash-page">
	<p class="splash-message">Booting Fiascomputer...</p>
</div>

<style lang="scss">
	@use '../css/defs';

	.splash-page {
		@include defs.flex(column);
		@include defs.vertical-margin(auto);
		@include defs.horizontal-margin(auto);
	}

	.splash-message {
		@include defs.page-heading;
		&:before {
			@include defs.loading-indicator;
			display: inline-block;
			margin-right: 1rem;
			margin-bottom: 1rem;
		}
	}

	@media (max-width: 40em) {
		.splash-message {
			font-size: 0.75rem;
		}
	}
</style>
