"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
exports.pluginKey = new prosemirror_state_1.PluginKey('editorDisabledPlugin');
/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
function createPlugin(dispatch) {
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function () {
                return ({
                    editorDisabled: false,
                });
            },
            apply: function (tr, oldPluginState) {
                var newPluginState = tr.getMeta(exports.pluginKey);
                if (newPluginState &&
                    oldPluginState.editorDisabled !== newPluginState.editorDisabled) {
                    dispatch(exports.pluginKey, newPluginState);
                    return newPluginState;
                }
                return oldPluginState;
            },
        },
    });
}
exports.createPlugin = createPlugin;
var editorDisabledPlugin = {
    pmPlugins: function () { return [
        {
            name: 'editorDisabled',
            plugin: function (_a) {
                var dispatch = _a.dispatch;
                return createPlugin(dispatch);
            },
        },
    ]; },
};
exports.default = editorDisabledPlugin;
//# sourceMappingURL=index.js.map