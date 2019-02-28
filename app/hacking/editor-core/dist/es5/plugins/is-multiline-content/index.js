"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
exports.pluginKey = new prosemirror_state_1.PluginKey('isMultilineContentPlugin');
exports.isMultiline = function (doc) {
    if (doc.childCount > 1) {
        return true;
    }
    if (doc.firstChild.type.name !== 'paragraph') {
        return true;
    }
    var paragraph = doc.firstChild;
    if (paragraph.firstChild && paragraph.firstChild.type.name === 'hardBreak') {
        return true;
    }
    if (paragraph.childCount === 1) {
        return false;
    }
    for (var child = 0; child < paragraph.childCount; child++) {
        if (paragraph.child(child).type.name === 'hardBreak') {
            return true;
        }
    }
    return false;
};
function createPlugin(dispatch) {
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, editorState) {
                return false;
            },
            apply: function (tr, isMultilineContent, oldState, newState) {
                var state = exports.isMultiline(newState.doc);
                if (state !== isMultilineContent) {
                    dispatch(exports.pluginKey, state);
                }
                return state;
            },
        },
    });
}
exports.createPlugin = createPlugin;
var isMultilineContentPlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'multilineContent',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return createPlugin(dispatch);
                },
            },
        ];
    },
};
exports.default = isMultilineContentPlugin;
//# sourceMappingURL=index.js.map