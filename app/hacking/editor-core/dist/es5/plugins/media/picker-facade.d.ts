import { MediaPickerComponents, ComponentConfigs, UploadParams } from '@atlaskit/media-picker';
import { Context } from '@atlaskit/media-core';
import { ErrorReportingHandler } from '@atlaskit/editor-common';
import { MediaStateManager, MediaState, CustomMediaPicker } from './types';
export declare type PickerType = keyof MediaPickerComponents | 'customMediaPicker';
export declare type ExtendedComponentConfigs = ComponentConfigs & {
    customMediaPicker: CustomMediaPicker;
};
export declare type PickerFacadeConfig = {
    context: Context;
    stateManager: MediaStateManager;
    errorReporter: ErrorReportingHandler;
};
export default class PickerFacade {
    private picker;
    private onStartListeners;
    private onDragListeners;
    private errorReporter;
    private pickerType;
    private stateManager;
    constructor(pickerType: PickerType, config: PickerFacadeConfig, pickerConfig?: ExtendedComponentConfigs[PickerType]);
    readonly type: PickerType;
    destroy(): void;
    setUploadParams(params: UploadParams): void;
    onClose(cb: any): () => void;
    activate(): void;
    deactivate(): void;
    show(): void;
    hide(): void;
    cancel(id: string): void;
    upload(url: string, fileName: string): void;
    onNewMedia(cb: (states: MediaState[]) => any): void;
    onDrag(cb: (state: 'enter' | 'leave') => any): void;
    resolvePublicId(file: any): void;
    private handleUploadPreviewUpdate;
    private handleUploadEnd;
    private handleUploadError;
    private handleCollection;
    private handleDragEnter;
    private handleDragLeave;
}
