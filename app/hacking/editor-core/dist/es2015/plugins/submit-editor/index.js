import { keymap } from 'prosemirror-keymap';
import { analyticsService } from '../../analytics';
import * as keymaps from '../../keymaps';
import { stateKey as mediaPluginKey } from '../../plugins/media/pm-plugins/main';
export function createPlugin(onSave) {
    var _a;
    if (!onSave) {
        return;
    }
    return keymap((_a = {},
        _a["" + keymaps.submit.common] = function (state, dispatch, editorView) {
            var mediaState = mediaPluginKey.getState(state);
            if (mediaState &&
                mediaState.waitForMediaUpload &&
                !mediaState.allUploadsFinished) {
                return true;
            }
            analyticsService.trackEvent('atlassian.editor.stop.submit');
            onSave(editorView);
            return true;
        },
        _a));
}
var submitEditorPlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'submitEditor',
                plugin: function (_a) {
                    var props = _a.props;
                    return createPlugin(props.onSave);
                },
            },
        ];
    },
};
export default submitEditorPlugin;
//# sourceMappingURL=index.js.map