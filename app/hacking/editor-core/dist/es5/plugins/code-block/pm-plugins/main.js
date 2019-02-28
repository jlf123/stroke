"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var code_block_1 = require("../nodeviews/code-block");
exports.getPluginState = function (state) {
    return exports.pluginKey.getState(state);
};
exports.setPluginState = function (stateProps) { return function (state, dispatch) {
    var pluginState = exports.getPluginState(state);
    dispatch(state.tr.setMeta(exports.pluginKey, tslib_1.__assign({}, pluginState, stateProps)));
    return true;
}; };
exports.pluginKey = new prosemirror_state_1.PluginKey('codeBlockPlugin');
exports.createPlugin = function (_a) {
    var portalProviderAPI = _a.portalProviderAPI, dispatch = _a.dispatch, providerFactory = _a.providerFactory;
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, state) {
                return {
                    toolbarVisible: false,
                };
            },
            apply: function (tr, pluginState, oldState, newState) {
                var nextPluginState = tr.getMeta(exports.pluginKey);
                if (nextPluginState) {
                    dispatch(exports.pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return pluginState;
            },
        },
        key: exports.pluginKey,
        view: function (view) {
            return {
                update: function (view, prevState) {
                    var _a = view.state, selection = _a.selection, codeBlock = _a.schema.nodes.codeBlock;
                    var pluginState = exports.getPluginState(view.state);
                    var parentDOM = prosemirror_utils_1.findParentDomRefOfType(codeBlock, view.domAtPos.bind(view))(selection);
                    if (parentDOM !== pluginState.element) {
                        var parent_1 = prosemirror_utils_1.findParentNodeOfType(codeBlock)(selection);
                        var newState = {
                            element: parentDOM,
                            toolbarVisible: !!parent_1,
                        };
                        exports.setPluginState(newState)(view.state, view.dispatch);
                        return true;
                    }
                    /** Plugin dispatch needed to reposition the toolbar */
                    dispatch(exports.pluginKey, tslib_1.__assign({}, pluginState));
                },
            };
        },
        props: {
            nodeViews: {
                codeBlock: code_block_1.default,
            },
            handleDOMEvents: {
                blur: function (view, event) {
                    var pluginState = exports.getPluginState(view.state);
                    if (pluginState.toolbarVisible) {
                        exports.setPluginState({
                            toolbarVisible: false,
                            element: null,
                        })(view.state, view.dispatch);
                        return true;
                    }
                    return false;
                },
            },
        },
    });
};
//# sourceMappingURL=main.js.map