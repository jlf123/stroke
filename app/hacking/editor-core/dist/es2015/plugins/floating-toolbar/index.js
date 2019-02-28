import * as React from 'react';
import { Plugin, PluginKey } from 'prosemirror-state';
import { findDomRefAtPos, findSelectedNodeOfType } from 'prosemirror-utils';
import { Popup } from '@atlaskit/editor-common';
import WithPluginState from '../../ui/WithPluginState';
import { ToolbarLoader } from './ui/ToolbarLoader';
import { pluginKey as editorDisabledPluginKey, } from '../editor-disabled';
var getRelevantConfig = function (view, configs) {
    // node selections always take precedence, see if
    var selectedConfig = configs.find(function (config) { return !!findSelectedNodeOfType(config.nodeType)(view.state.selection); });
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
    return findDomRefAtPos(view.state.selection.from, view.domAtPos.bind(view));
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
        return (React.createElement(WithPluginState, { plugins: {
                floatingToolbarConfigs: pluginKey,
                editorDisabledPlugin: editorDisabledPluginKey,
            }, render: function (_a) {
                var editorDisabledPlugin = _a.editorDisabledPlugin, floatingToolbarConfigs = _a.floatingToolbarConfigs;
                var relevantConfig = floatingToolbarConfigs &&
                    getRelevantConfig(editorView, floatingToolbarConfigs);
                if (relevantConfig) {
                    var title = relevantConfig.title, _b = relevantConfig.getDomRef, getDomRef = _b === void 0 ? getDomRefFromSelection : _b, items = relevantConfig.items;
                    var targetRef = getDomRef(editorView);
                    if (targetRef && !(editorDisabledPlugin || {}).editorDisabled) {
                        return (React.createElement(Popup, { ariaLabel: title, offset: [0, 12], target: targetRef, alignY: "bottom", alignX: "center", stickToBottom: true, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement },
                            React.createElement(ToolbarLoader, { items: items, dispatchCommand: function (fn) {
                                    return fn && fn(editorView.state, editorView.dispatch);
                                }, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement })));
                    }
                }
                return null;
            } }));
    },
};
export default floatingToolbarPlugin;
/**
 *
 * ProseMirror Plugin
 *
 */
export var pluginKey = new PluginKey('floatingToolbarPluginKey');
function floatingToolbarPluginFactory(options) {
    var floatingToolbarHandlers = options.floatingToolbarHandlers, dispatch = options.dispatch, reactContext = options.reactContext;
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () {
                ToolbarLoader.preload();
            },
            apply: function (tr, pluginState, oldState, newState) {
                var intl = reactContext().intl;
                var newPluginState = floatingToolbarHandlers
                    .map(function (handler) { return handler(newState, intl); })
                    .filter(Boolean);
                dispatch(pluginKey, newPluginState);
                return newPluginState;
            },
        },
    });
}
//# sourceMappingURL=index.js.map