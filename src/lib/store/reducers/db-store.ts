import { dbReady, FiascoDB } from '$lib/storage/db';
import type { StoreNames, StoreValue } from 'idb';
import type { ReducerStore } from './create-store';

function taskQueue() {
	interface Task {
		resolve: () => void;
		reject: (err: unknown) => void;
		run: () => Promise<void>;
	}

	let waiting: Task | undefined;
	let running = new Set<Task>();
	let timer: ReturnType<typeof setTimeout> | undefined;

	function add(task: () => Promise<void>) {
		return new Promise<void>((resolve, reject) => {
			// Replace any current waiting task, schedule next execution
			waiting = { resolve, reject, run: task };
			schedule();
		});
	}

	function schedule() {
		// Only schedule if a new execution wasn't already scheduled
		if (timer == undefined) {
			timer = setTimeout(execute, 0);
		}
	}

	function execute() {
		const task = waiting!;
		timer = undefined;
		waiting = undefined;
		if (!task) return;

		task
			.run()
			.then(task.resolve, task.reject)
			.finally(() => {
				running.delete(task);
				schedule();
			});
	}

	return add;
}

export function connectToDb<Name extends StoreNames<FiascoDB>, State, Action>(options: {
	store: ReducerStore<State, Action>;
	objectStoreName: Name;
	validate: (state: State) => state is State & StoreValue<FiascoDB, Name>;
}) {
	const { store, validate } = options;
	const enqueue = taskQueue();

	async function pushStateToDb(state: State) {
		const db = await dbReady;
		if (db && validate(state)) {
			await db.put(options.objectStoreName, state);
		}
	}

	store.subscribe((state) => {
		enqueue(() => pushStateToDb(state));
	});
}
