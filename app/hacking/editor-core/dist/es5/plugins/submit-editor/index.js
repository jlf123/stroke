"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var analytics_1 = require("../../analytics");
var keymaps = require("../../keymaps");
var main_1 = require("../../plugins/media/pm-plugins/main");
function createPlugin(onSave) {
    var _a;
    if (!onSave) {
        return;
    }
    return prosemirror_keymap_1.keymap((_a = {},
        _a["" + keymaps.submit.common] = function (state, dispatch, editorView) {
            var mediaState = main_1.stateKey.getState(state);
            if (mediaState &&
                mediaState.waitForMediaUpload &&
                !mediaState.allUploadsFinished) {
                return true;
            }
            analytics_1.analyticsService.trackEvent('atlassian.editor.stop.submit');
            onSave(editorView);
            return true;
        },
        _a));
}
exports.createPlugin = createPlugin;
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
exports.default = submitEditorPlugin;
//# sourceMappingURL=index.js.map