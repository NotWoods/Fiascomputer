<script context="module">
	import Title from '$lib/components/Title.svelte';

	export const prerender = true;
</script>

<Title homePage text="" />

<div id="intro" class="page intro-page">
	<div class="document">
		<h2 class="heading">
			<span class="welcome">Welcome to</span>
			<span class="title">Fiascomputer!</span>
		</h2>
		<div class="introduction">
			<p>Use Fiascomputer to create and visualize <cite>Fiasco</cite> setups.</p>
			<p>
				We have included 36 high-quality playsets right from the start, but you can <a
					href="/add-playset">add your own playset PDF</a
				> if you want even more.
			</p>
		</div>
		<a href="/" class="start">Start!</a>
		<a href="/" class="close-button">
			<img src="/images/cross-black.svg" alt="Close" />
		</a>
	</div>
	<div class="credits">
		<small>
			<p>
				For more software like this, visit <a href="http://tabletopsoftware.net/" target="_blank"
					>TabletopSoftware.net</a
				>
			</p>
			<p>
				The <a href="http://www.bullypulpitgames.com/games/fiasco/" target="_blank"
					><cite>Fiasco</cite></a
				>
				RPG is published by
				<a href="http://www.bullypulpitgames.com/" target="_blank">Bully Pulpit Games</a>
			</p>
		</small>
	</div>
</div>

<style lang="scss">
	@use '../css/defs';

	@mixin intro-page {
		@include defs.flex(column);
		@include defs.vertical-margin(auto);

		.document {
			@include defs.horizontal-margin(auto);
			max-width: 40rem;
			text-align: center;
		}

		.heading {
			font-family: defs.$heading-font;
			color: defs.$text-red;
		}

		@media (max-width: 40em) {
			.heading {
				font-size: 1rem;
			}
		}

		@media (min-width: 40em) {
			.heading {
				font-size: 3rem;
			}
		}

		.introduction {
			max-width: 50rem;
			margin-top: 2rem;
			margin-bottom: 2rem;
			font-size: 1rem;
			line-height: 1.5;

			p + p {
				margin-top: 1rem;
			}

			a {
				display: inline;
				color: defs.$blue;
				text-decoration: underline;
			}
		}

		.credits {
			@include defs.horizontal-margin(auto);
			margin-top: 1rem;
			padding: 1rem;
			text-align: center;
			color: defs.$heading-color;
			font-family: defs.$heading-font;
			line-height: 1.5;
			font-size: 0.75rem;

			a {
				display: inline;
				color: defs.$white;
				border-bottom: 1px solid defs.$white;
				padding-bottom: 2px;
			}

			p + p {
				margin-top: 1rem;
			}
		}
	}

	.intro-page {
		@include intro-page;

		.welcome {
			display: block;
			margin-bottom: 0.5rem;
		}

		@media (max-width: 40em) {
			.welcome {
				font-size: 0.75em;
			}
		}

		@media (min-width: 40em) {
			.welcome {
				font-size: 0.5em;
			}
		}

		.start {
			display: inline-block;
			@include defs.plain-button;
			@include defs.button;
			padding: 1rem;
		}
	}
</style>
