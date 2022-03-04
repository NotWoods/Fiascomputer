const focusableQuery =
	'[tabindex="0"], :any-link, input:not(:disabled):not([type="hidden"]), button:not(:disabled), select:not(:disabled), textarea:not(:disabled)';

/**
 * Traps focus inside an open dialog.
 */
export function focusTrap(dialog: HTMLElement, focusOnOpen = true) {
	function trapFocus(event: KeyboardEvent) {
		const focusable = dialog.querySelectorAll<HTMLElement>(focusableQuery);
		const firstFocusable = focusable[0];
		const lastFocusable = focusable[focusable.length - 1];

		if (event.key === 'Tab') {
			if (event.shiftKey && document.activeElement === firstFocusable) {
				event.preventDefault();
				lastFocusable?.focus();
			} else if (!event.shiftKey && document.activeElement === lastFocusable) {
				event.preventDefault();
				firstFocusable?.focus();
			}
		}
	}

	if (focusOnOpen) {
		dialog.querySelector<HTMLElement>(focusableQuery)?.focus();
	}
	document.addEventListener('keydown', trapFocus);

	return {
		destroy() {
			document.removeEventListener('keydown', trapFocus);
		}
	};
}
