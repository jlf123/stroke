"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
exports.focusStateKey = new prosemirror_state_1.PluginKey('focusStatePlugin');
exports.default = (function (dispatch) {
    return new prosemirror_state_1.Plugin({
        key: exports.focusStateKey,
        state: {
            init: function () { return true; },
            apply: function (tr, wasEditorFocused) {
                var meta = tr.getMeta(exports.focusStateKey);
                if (typeof meta === 'boolean') {
                    if (meta !== wasEditorFocused) {
                        dispatch(exports.focusStateKey, meta);
                        return meta;
                    }
                }
                return wasEditorFocused;
            },
        },
        props: {
            handleDOMEvents: {
                click: function (view) {
                    var isEditorFocused = exports.focusStateKey.getState(view.state);
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(exports.focusStateKey, view.hasFocus()));
                    }
                    return false;
                },
                focus: function (view) {
                    var isEditorFocused = exports.focusStateKey.getState(view.state);
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(exports.focusStateKey, true));
                    }
                    return false;
                },
                blur: function (view) {
                    var isEditorFocused = exports.focusStateKey.getState(view.state);
                    if (isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(exports.focusStateKey, false));
                    }
                    return false;
                },
            },
        },
    });
});
//# sourceMappingURL=focus-handler.js.map