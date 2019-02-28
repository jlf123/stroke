"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var editor_common_1 = require("@atlaskit/editor-common");
var WithPluginState_1 = require("../../ui/WithPluginState");
var ToolbarLoader_1 = require("./ui/ToolbarLoader");
var editor_disabled_1 = require("../editor-disabled");
var getRelevantConfig = function (view, configs) {
    // node selections always take precedence, see if
    var selectedConfig = configs.find(function (config) { return !!prosemirror_utils_1.findSelectedNodeOfType(config.nodeType)(view.state.selection); });
    if (selectedConfig) {
        return selectedConfig;
    }
    // create mapping of node type name to configs
    var configByNodeType = {};
    configs.forEach(function (config) {
        if (Array.isArray(config.nodeType)) {
            config.nodeType.forEach(function (nodeType) {
                configByNodeType[nodeType.name] = config;
            });
        }
        else {
            configByNodeType[config.nodeType.name] = config;
        }
    });
    // search up the tree from selection
    var $from = view.state.selection.$from;
    for (var i = $from.depth; i > 0; i--) {
        var node = $from.node(i);
        var matchedConfig = configByNodeType[node.type.name];
        if (matchedConfig) {
            return matchedConfig;
        }
    }
};
var getDomRefFromSelection = function (view) {
    return prosemirror_utils_1.findDomRefAtPos(view.state.selection.from, view.domAtPos.bind(view));
};
var floatingToolbarPlugin = {
    name: 'floatingToolbar',
    pmPlugins: function (floatingToolbarHandlers) {
        if (floatingToolbarHandlers === void 0) { floatingToolbarHandlers = []; }
        return [
            {
                // Should be after all toolbar plugins
                name: 'floatingToolbar',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, reactContext = _a.reactContext;
                    return floatingToolbarPluginFactory({
                        dispatch: dispatch,
                        floatingToolbarHandlers: floatingToolbarHandlers,
                        reactContext: reactContext,
                    });
                },
            },
        ];
    },
    contentComponent: function (_a) {
        var popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, editorView = _a.editorView;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                floatingToolbarConfigs: exports.pluginKey,
                editorDisabledPlugin: editor_disabled_1.pluginKey,
            }, render: function (_a) {
                var editorDisabledPlugin = _a.editorDisabledPlugin, floatingToolbarConfigs = _a.floatingToolbarConfigs;
                var relevantConfig = floatingToolbarConfigs &&
                    getRelevantConfig(editorView, floatingToolbarConfigs);
                if (relevantConfig) {
                    var title = relevantConfig.title, _b = relevantConfig.getDomRef, getDomRef = _b === void 0 ? getDomRefFromSelection : _b, items = relevantConfig.items;
                    var targetRef = getDomRef(editorView);
                    if (targetRef && !(editorDisabledPlugin || {}).editorDisabled) {
                        return (React.createElement(editor_common_1.Popup, { ariaLabel: title, offset: [0, 12], target: targetRef, alignY: "bottom", alignX: "center", stickToBottom: true, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement },
                            React.createElement(ToolbarLoader_1.ToolbarLoader, { items: items, dispatchCommand: function (fn) {
                                    return fn && fn(editorView.state, editorView.dispatch);
                                }, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement })));
                    }
                }
                return null;
            } }));
    },
};
exports.default = floatingToolbarPlugin;
/**
 *
 * ProseMirror Plugin
 *
 */
exports.pluginKey = new prosemirror_state_1.PluginKey('floatingToolbarPluginKey');
function floatingToolbarPluginFactory(options) {
    var floatingToolbarHandlers = options.floatingToolbarHandlers, dispatch = options.dispatch, reactContext = options.reactContext;
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function () {
                ToolbarLoader_1.ToolbarLoader.preload();
            },
            apply: function (tr, pluginState, oldState, newState) {
                var intl = reactContext().intl;
                var newPluginState = floatingToolbarHandlers
                    .map(function (handler) { return handler(newState, intl); })
                    .filter(Boolean);
                dispatch(exports.pluginKey, newPluginState);
                return newPluginState;
            },
        },
    });
}
//# sourceMappingURL=index.js.map