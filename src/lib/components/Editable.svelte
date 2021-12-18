<script lang="ts">
	export let value: string = '';
	export let editable = true;
	export let tag: 'span' | 'a' = 'span';
	export let onChange: (value: string) => void;
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;

	let editing = false;

	let editableNode: HTMLElement;

	$: text = value.trim() === '' ? '\u00a0' : value;

	function onTrigger() {
		if (!editing) {
			editableNode.focus();

			requestAnimationFrame(() => {
				const selection = window.getSelection();
				const range = document.createRange();
				range.selectNodeContents(editableNode);
				selection.removeAllRanges();
				selection.addRange(range);
			});
		}
		editing = !editing;
	}

	function onPaste(event: ClipboardEvent) {
		event.preventDefault();
		onChange(event.clipboardData.getData('text/plain'));
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter') {
			event.preventDefault();
			editableNode.blur();
		}
	}

	function handleClick(event: MouseEvent) {
		if (editing) {
			event.preventDefault();
		} else {
			onClick?.(event);
		}
	}
</script>

{#if editable}
	{#if tag === 'a'}
		<a
			href="/"
			{...$$restProps}
			contentEditable={editing}
			on:change={() => onChange(editableNode.textContent)}
			on:paste={onPaste}
			on:keydown={onKeyDown}
			on:blur={() => {
				editing = false;
			}}
			on:click={handleClick}
			bind:this={editableNode}
		>
			{text}
		</a>
	{:else}
		<span
			{...$$restProps}
			contentEditable={editing}
			on:change={() => onChange(editableNode.textContent)}
			on:paste={onPaste}
			on:keydown={onKeyDown}
			on:blur={() => {
				editing = false;
			}}
			on:click={onClick}
			bind:this={editableNode}
		>
			{text}
		</span>
	{/if}
	<button type="button" class="edit" on:click={onTrigger}>
		<img src="/images/pencil-white.svg" alt="Edit" />
	</button>
{:else if tag === 'a'}
	<a href="/" {...$$restProps} on:click={onClick}>
		{text}
	</a>
{:else}
	<span {...$$restProps} on:click={onClick}>
		{text}
	</span>
{/if}
