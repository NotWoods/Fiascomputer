<script lang="ts">
	import Title from '$lib/components/Title.svelte';
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
