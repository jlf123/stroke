import { EditorPlugin } from '../../types';
import { MediaState, MediaStateManager, DefaultMediaStateManager } from './pm-plugins/main';
import { CustomMediaPicker, MediaProvider } from './types';
export { MediaState, MediaStateManager, DefaultMediaStateManager, MediaProvider, CustomMediaPicker, };
export interface MediaOptions {
    provider?: Promise<MediaProvider>;
    allowMediaSingle?: boolean | MediaSingleOptions;
    allowMediaGroup?: boolean;
    customDropzoneContainer?: HTMLElement;
    customMediaPicker?: CustomMediaPicker;
    allowResizing?: boolean;
}
export interface MediaSingleOptions {
    disableLayout?: boolean;
}
declare const mediaPlugin: (options?: MediaOptions | undefined) => EditorPlugin;
export default mediaPlugin;
