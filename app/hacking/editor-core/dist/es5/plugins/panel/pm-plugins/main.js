"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var panel_1 = require("../nodeviews/panel");
exports.availablePanelType = [
    'info',
    'note',
    'success',
    'warning',
    'error',
];
exports.getPluginState = function (state) {
    return exports.pluginKey.getState(state);
};
exports.setPluginState = function (stateProps) { return function (state, dispatch) {
    var pluginState = exports.getPluginState(state);
    dispatch(state.tr.setMeta(exports.pluginKey, tslib_1.__assign({}, pluginState, stateProps)));
    return true;
}; };
exports.pluginKey = new prosemirror_state_1.PluginKey('panelPlugin');
exports.createPlugin = function (_a) {
    var portalProviderAPI = _a.portalProviderAPI, dispatch = _a.dispatch, providerFactory = _a.providerFactory;
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, state) {
                return {
                    element: null,
                    activePanelType: undefined,
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
                    var _a = view.state, selection = _a.selection, panel = _a.schema.nodes.panel;
                    var pluginState = exports.getPluginState(view.state);
                    var parent = prosemirror_utils_1.findParentNodeOfType(panel)(selection);
                    var parentDOM = prosemirror_utils_1.findParentDomRefOfType(panel, view.domAtPos.bind(view))(selection);
                    if (parentDOM !== pluginState.element) {
                        exports.setPluginState({
                            element: parentDOM,
                            activePanelType: parent && parent.node.attrs['panelType'],
                            toolbarVisible: !!parent,
                        })(view.state, view.dispatch);
                        return true;
                    }
                    /** Plugin dispatch needed to reposition the toolbar */
                    dispatch(exports.pluginKey, tslib_1.__assign({}, pluginState));
                },
            };
        },
        props: {
            nodeViews: {
                panel: panel_1.panelNodeView(portalProviderAPI),
            },
            handleDOMEvents: {
                blur: function (view, event) {
                    var pluginState = exports.getPluginState(view.state);
                    if (pluginState.toolbarVisible) {
                        exports.setPluginState({
                            toolbarVisible: false,
                            element: null,
                            activePanelType: undefined,
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