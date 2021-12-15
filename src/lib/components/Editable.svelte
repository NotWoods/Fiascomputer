<script lang="ts">
	export let value: string;
	export let tag: 'span' | 'a' = 'span';
	export let onChange: (value: string) => void;

	let editing = false;

	let editableNode: HTMLElement;

	$: text = value.trim() === '' ? '&nbsp;' : value;

	function onTrigger() {
		editing = true;
		editableNode.focus();

		const range = document.createRange();
		range.selectNode(editableNode);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	}

  function onPaste(event: ClipboardEvent) {
    event.preventDefault();
    onChange(event.clipboardData.getData('text/plain'))
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter') {
      event.preventDefault();
      editableNode.blur();
    }
  }

  function onClick(event: MouseEvent) {
    if (editing) {
      event.preventDefault();
    }
  }
</script>

{#if tag === 'a'}
  <a
    href='/'
    {...$$restProps}
    contentEditable={editing}
    on:change={() => onChange(editableNode.textContent)}
    on:paste={onPaste}
    on:keydown={onKeyDown}
    on:blur={() => { editing = false }}
    on:click={onClick}
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
    on:blur={() => { editing = false }}
    bind:this={editableNode}
  >
    {text}
  </span>
{/if}
<button type="button" class="edit" on:click={onTrigger}>
  <img src="/images/pencil-white.svg" alt="Edit" />
</button>
