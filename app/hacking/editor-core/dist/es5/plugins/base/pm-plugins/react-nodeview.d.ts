import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
export declare type StateChangeHandler = (anchorPos: number, headPos: number) => any;
export declare class ReactNodeViewState {
    private changeHandlers;
    constructor();
    subscribe(cb: StateChangeHandler): void;
    unsubscribe(cb: StateChangeHandler): void;
    notifyNewSelection(anchorPos: number, headPos: number): void;
}
export declare const stateKey: PluginKey<any>;
export declare const plugin: Plugin<any>;
declare const plugins: (schema: Schema<any, any>) => Plugin<any>[];
export default plugins;
