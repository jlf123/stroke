"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
exports.pluginKey = new prosemirror_state_1.PluginKey('maxContentSizePlugin');
function createPlugin(dispatch, maxContentSize, onMaxContentSize) {
    if (!maxContentSize) {
        return;
    }
    var maxContentSizeReached = false;
    return new prosemirror_state_1.Plugin({
        filterTransaction: function (tr) {
            var result = tr.doc && tr.doc.nodeSize > maxContentSize;
            if (result || result !== maxContentSizeReached) {
                dispatch(exports.pluginKey, { maxContentSizeReached: result });
            }
            maxContentSizeReached = result;
            return !result;
        },
    });
}
exports.createPlugin = createPlugin;
var maxContentSizePlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'maxContentSize',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, props = _a.props;
                    return createPlugin(dispatch, props.maxContentSize);
                },
            },
        ];
    },
};
exports.default = maxContentSizePlugin;
//# sourceMappingURL=index.js.map