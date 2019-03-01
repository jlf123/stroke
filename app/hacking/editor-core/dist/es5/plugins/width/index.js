"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
exports.pluginKey = new prosemirror_state_1.PluginKey('widthPlugin');
function createPlugin(dispatch) {
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function () { return ({
                width: document.body.offsetWidth,
            }); },
            apply: function (tr, pluginState) {
                var meta = tr.getMeta(exports.pluginKey);
                if (!meta) {
                    return pluginState;
                }
                var newPluginState = tslib_1.__assign({}, pluginState, meta);
                if (newPluginState &&
                    (pluginState.width !== newPluginState.width ||
                        pluginState.lineLength !== newPluginState.lineLength)) {
                    dispatch(exports.pluginKey, newPluginState);
                    return newPluginState;
                }
                return pluginState;
            },
        },
    });
}
exports.createPlugin = createPlugin;
var widthPlugin = {
    pmPlugins: function () { return [
        {
            name: 'width',
            plugin: function (_a) {
                var dispatch = _a.dispatch;
                return createPlugin(dispatch);
            },
        },
    ]; },
    // do this early here, otherwise we have to wait for WidthEmitter to debounce
    // which causes anything dependent on lineLength to jump around
    contentComponent: function (_a) {
        var editorView = _a.editorView, containerElement = _a.containerElement;
        var pmDom = containerElement
            ? containerElement.querySelector('.ProseMirror')
            : undefined;
        var tr = editorView.state.tr.setMeta(exports.pluginKey, {
            lineLength: pmDom ? pmDom.clientWidth : undefined,
        });
        editorView.dispatch(tr);
        return null;
    },
};
exports.default = widthPlugin;
//# sourceMappingURL=index.js.map