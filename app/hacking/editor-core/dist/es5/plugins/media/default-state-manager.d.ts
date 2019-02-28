import { MediaState, MediaStateManager } from './types';
import { EventDispatcher } from '../../event-dispatcher';
export default class DefaultMediaStateManager extends EventDispatcher implements MediaStateManager {
    private state;
    getState(id: string): MediaState | undefined;
    getAllState(): Map<string, MediaState>;
    newState(id: string, newState: Partial<MediaState>): MediaState;
    updateState(id: string, newState: Partial<MediaState>): MediaState;
    destroy(): void;
}
