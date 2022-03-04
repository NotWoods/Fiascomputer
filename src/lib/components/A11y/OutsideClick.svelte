<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const clickableQuery = ':any-link, button:not(:disabled)';
	const dispatch = createEventDispatcher();

	export let menu: HTMLElement | undefined;
	export let trigger: Element | string | undefined = undefined;

	function isTrigger(target: Element) {
		if (typeof trigger === 'string') {
			return target.closest(trigger) != undefined;
		} else {
			return trigger === target;
		}
	}

	function handleDocumentClick(event: MouseEvent) {
		if (!menu) return;

		const target = event.target as Element;
		if (!isTrigger(target)) {
			const elementOutsideMenuWasClicked = !menu.contains(target);
			const controlInsideMenuWasClicked =
				!elementOutsideMenuWasClicked && target.matches(clickableQuery);
			if (elementOutsideMenuWasClicked || controlInsideMenuWasClicked) {
				dispatch('click', { target });
			}
		}
	}
</script>

<svelte:body on:click={handleDocumentClick} />
