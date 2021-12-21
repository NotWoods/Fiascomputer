export function undo() {
	return { type: 'undo' } as const;
}

export function redo() {
	return { type: 'redo' } as const;
}
