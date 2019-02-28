import { PluginKey } from 'prosemirror-state';
export interface Listeners {
    [name: string]: Listener[];
}
export declare type Listener = (data: any) => void;
export declare type Dispatch<T = any> = (eventName: PluginKey | string, data: T) => void;
export declare class EventDispatcher {
    private listeners;
    on(event: string, cb: Listener): void;
    off(event: string, cb: Listener): void;
    emit(event: string, data: any): void;
    destroy(): void;
}
/**
 * Creates a dispatch function that can be called inside ProseMirror Plugin
 * to notify listeners about that plugin's state change.
 */
export declare function createDispatch(eventDispatcher: EventDispatcher): Dispatch;
