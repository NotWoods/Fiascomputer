import type { LoadOutput, Page } from '@sveltejs/kit';

export function hasTrailingSlash(page: Page): boolean {
	return page.path.endsWith('/');
}

export function redirectToAlwaysTrailingSlash(page: Page): LoadOutput {
	if (hasTrailingSlash(page)) {
		throw new Error('Gate this function with hasTrailingSlash');
	}
	return {
		status: 301,
		redirect: `${page.path}/`
	};
}

export function redirectToNeverTrailingSlash(page: Page): LoadOutput {
	if (!hasTrailingSlash(page)) {
		throw new Error('Gate this function with hasTrailingSlash');
	}
	return {
		status: 301,
		redirect: page.path.slice(-1)
	};
}
