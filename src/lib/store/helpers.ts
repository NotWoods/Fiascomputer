/**
 * Returns a new array that replaces one item with another.
 * @param index Index of item to replace.
 * @param replacer Function that returns the new item.
 * The old item in the array is passed as a parameter.
 */
export function replace<T>(array: readonly T[], index: number, replacer: (item: T) => T): T[] {
	const newArray = array.slice();
	newArray[index] = replacer(array[index]);
	return newArray;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds.
 * @param immediate If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
 export function debounce<Func extends (...args: any) => void>(
	func: Func,
	wait: number,
	immediate = false
) {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return function (this: ThisType<Func>, ...args: Parameters<Func>): void {
		const later = () => {
			timeout = undefined;
			if (!immediate) func.apply(this, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(this, args);
	};
}
