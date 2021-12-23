import type { PlaysetDataWithId } from '$lib/playset';
import type { CardDetails, Session } from '$lib/storage/session';

interface State {
	playset: PlaysetDataWithId;
	session: Session;
}
