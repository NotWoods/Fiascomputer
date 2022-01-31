import { readable } from 'svelte/store';

export function matchMedia(query: string) {
	const mql = window.matchMedia(query);
	return readable(mql.matches, (set) => {
		function handleChange() {
			set(mql.matches);
		}

		mql.addEventListener('change', handleChange);
		return () => mql.removeEventListener('change', handleChange);
	});
}
