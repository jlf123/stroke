import { Plugin, PluginKey } from 'prosemirror-state';
export var pluginKey = new PluginKey('isMultilineContentPlugin');
export var isMultiline = function (doc) {
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
export function createPlugin(dispatch) {
    return new Plugin({
        state: {
            init: function (config, editorState) {
                return false;
            },
            apply: function (tr, isMultilineContent, oldState, newState) {
                var state = isMultiline(newState.doc);
                if (state !== isMultilineContent) {
                    dispatch(pluginKey, state);
                }
                return state;
            },
        },
    });
}
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
export default isMultilineContentPlugin;
//# sourceMappingURL=index.js.map