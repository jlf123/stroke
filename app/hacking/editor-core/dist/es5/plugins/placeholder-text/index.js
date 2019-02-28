"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_state_2 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
var WithPluginState_1 = require("../../ui/WithPluginState");
var document_1 = require("../../utils/document");
var cursor_1 = require("../fake-text-cursor/cursor");
var placeholder_text_1 = require("./nodeviews/placeholder-text");
var PlaceholderFloatingToolbar_1 = require("./ui/PlaceholderFloatingToolbar");
var actions_1 = require("./actions");
exports.pluginKey = new prosemirror_state_2.PluginKey('placeholderTextPlugin');
function createPlugin(dispatch, options) {
    var allowInserting = !!options.allowInserting;
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function () {
                return ({
                    showInsertPanelAt: null,
                    allowInserting: allowInserting,
                });
            },
            apply: function (tr, state) {
                var meta = tr.getMeta(exports.pluginKey);
                if (meta && meta.showInsertPanelAt !== undefined) {
                    var newState = {
                        showInsertPanelAt: meta.showInsertPanelAt,
                        allowInserting: allowInserting,
                    };
                    dispatch(exports.pluginKey, newState);
                    return newState;
                }
                else if (state.showInsertPanelAt) {
                    var newState = {
                        showInsertPanelAt: tr.mapping.map(state.showInsertPanelAt),
                        allowInserting: allowInserting,
                    };
                    dispatch(exports.pluginKey, newState);
                    return newState;
                }
                return state;
            },
        },
        props: {
            nodeViews: {
                placeholder: function (node, view, getPos) {
                    return new placeholder_text_1.default(node, view, getPos);
                },
            },
        },
        appendTransaction: function (transactions, oldState, newState) {
            if (transactions.some(function (txn) { return txn.docChanged; })) {
                var didPlaceholderExistBeforeTxn = oldState.selection.$head.nodeAfter ===
                    newState.selection.$head.nodeAfter;
                var adjacentNode = newState.selection.$head.nodeAfter;
                var adjacentNodePos = newState.selection.$head.pos;
                var placeholderNodeType = newState.schema.nodes.placeholder;
                if (adjacentNode &&
                    adjacentNode.type === placeholderNodeType &&
                    didPlaceholderExistBeforeTxn) {
                    // Check that cursor has moved forward in the document **and** that there is content before the cursor
                    var wasContentAdded = oldState.selection.$head.pos < newState.selection.$head.pos &&
                        !document_1.isEmptyNode(newState.selection.$head.nodeBefore);
                    if (wasContentAdded) {
                        var _a = prosemirror_state_1.NodeSelection.create(newState.doc, adjacentNodePos), $from = _a.$from, $to = _a.$to;
                        return newState.tr.deleteRange($from.pos, $to.pos);
                    }
                }
            }
            // Handle Fake Text Cursor for Floating Toolbar
            if (!exports.pluginKey.getState(oldState).showInsertPanelAt &&
                exports.pluginKey.getState(newState).showInsertPanelAt) {
                return newState.tr.setSelection(new cursor_1.FakeTextCursorSelection(newState.selection.$from));
            }
            if (exports.pluginKey.getState(oldState).showInsertPanelAt &&
                !exports.pluginKey.getState(newState).showInsertPanelAt) {
                if (newState.selection instanceof cursor_1.FakeTextCursorSelection) {
                    return newState.tr.setSelection(new prosemirror_state_1.TextSelection(newState.selection.$from));
                }
            }
        },
    });
}
exports.createPlugin = createPlugin;
var placeholderTextPlugin = function (options) { return ({
    nodes: function () {
        return [{ name: 'placeholder', node: adf_schema_1.placeholder }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'placeholderText',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, options);
                },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement;
        var insertPlaceholderText = function (value) {
            return actions_1.insertPlaceholderTextAtSelection(value)(editorView.state, editorView.dispatch);
        };
        var hidePlaceholderToolbar = function () {
            return actions_1.hidePlaceholderFloatingToolbar(editorView.state, editorView.dispatch);
        };
        var getNodeFromPos = function (pos) { return editorView.domAtPos(pos).node; };
        var getFixedCoordinatesFromPos = function (pos) {
            return editorView.coordsAtPos(pos);
        };
        var setFocusInEditor = function () { return editorView.focus(); };
        return (React.createElement(WithPluginState_1.default, { plugins: { placeholderTextState: exports.pluginKey }, render: function (_a) {
                var _b = _a.placeholderTextState, placeholderTextState = _b === void 0 ? {} : _b;
                if (placeholderTextState.showInsertPanelAt) {
                    return (React.createElement(PlaceholderFloatingToolbar_1.default, { editorViewDOM: editorView.dom, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, getFixedCoordinatesFromPos: getFixedCoordinatesFromPos, getNodeFromPos: getNodeFromPos, hidePlaceholderFloatingToolbar: hidePlaceholderToolbar, showInsertPanelAt: placeholderTextState.showInsertPanelAt, insertPlaceholder: insertPlaceholderText, setFocusInEditor: setFocusInEditor }));
                }
                return null;
            } }));
    },
}); };
exports.default = placeholderTextPlugin;
//# sourceMappingURL=index.js.map