"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_utils_1 = require("prosemirror-utils");
var commands_1 = require("../../../utils/commands");
var actions_1 = require("../actions");
var isWholeSelectionInsideLayoutColumn = function (state) {
    // Since findParentNodeOfType doesn't check if selection.to shares the parent, we do this check ourselves
    var fromParent = prosemirror_utils_1.findParentNodeOfType(state.schema.nodes.layoutColumn)(state.selection);
    if (fromParent) {
        var isToPosInsideSameLayoutColumn = state.selection.from < fromParent.pos + fromParent.node.nodeSize;
        return isToPosInsideSameLayoutColumn;
    }
    return false;
};
var moveCursorToNextColumn = function (state, dispatch) {
    var selection = state.selection;
    var _a = state.schema.nodes, layoutColumn = _a.layoutColumn, layoutSection = _a.layoutSection;
    var section = prosemirror_utils_1.findParentNodeOfType(layoutSection)(selection);
    var column = prosemirror_utils_1.findParentNodeOfType(layoutColumn)(selection);
    if (column.node !== section.node.lastChild) {
        var $nextColumn = state.doc.resolve(column.pos + column.node.nodeSize);
        var shiftedSelection = prosemirror_state_1.TextSelection.findFrom($nextColumn, 1);
        if (dispatch) {
            dispatch(state.tr.setSelection(shiftedSelection));
        }
    }
    return true;
};
// TODO: Look at memoize-one-ing this fn
var getNodeDecoration = function (pos, node) { return [
    prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, { class: 'selected' }),
]; };
var getInitialPluginState = function (pluginConfig, state) {
    var maybeLayoutSection = prosemirror_utils_1.findParentNodeOfType(state.schema.nodes.layoutSection)(state.selection);
    var allowBreakout = typeof pluginConfig === 'object' ? !!pluginConfig.allowBreakout : false;
    var pos = maybeLayoutSection ? maybeLayoutSection.pos : null;
    return { pos: pos, allowBreakout: allowBreakout };
};
exports.pluginKey = new prosemirror_state_1.PluginKey('layout');
exports.default = (function (pluginConfig) {
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function (_, state) {
                return getInitialPluginState(pluginConfig, state);
            },
            apply: function (tr, pluginState, oldState, newState) {
                if (tr.docChanged || tr.selectionSet) {
                    var maybeLayoutSection = prosemirror_utils_1.findParentNodeOfType(newState.schema.nodes.layoutSection)(newState.selection);
                    var newPluginState = tslib_1.__assign({}, pluginState, { pos: maybeLayoutSection ? maybeLayoutSection.pos : null });
                    return newPluginState;
                }
                return pluginState;
            },
        },
        props: {
            decorations: function (state) {
                var layoutState = exports.pluginKey.getState(state);
                if (layoutState.pos !== null) {
                    return prosemirror_view_1.DecorationSet.create(state.doc, getNodeDecoration(layoutState.pos, state.doc.nodeAt(layoutState.pos)));
                }
                return undefined;
            },
            handleKeyDown: prosemirror_keymap_1.keydownHandler({
                Tab: commands_1.filter(isWholeSelectionInsideLayoutColumn, moveCursorToNextColumn),
            }),
        },
        appendTransaction: function (transactions, oldState, newState) {
            var changes = [];
            transactions.forEach(function (prevTr) {
                // remap change segments across the transaction set
                changes.map(function (change) {
                    return {
                        from: prevTr.mapping.map(change.from),
                        to: prevTr.mapping.map(change.to),
                        slice: change.slice,
                    };
                });
                // don't consider transactions that don't mutate
                if (!prevTr.docChanged) {
                    return;
                }
                var change = actions_1.fixColumnSizes(prevTr, newState);
                if (change) {
                    changes.push(change);
                }
            });
            if (changes.length) {
                var tr_1 = newState.tr;
                var selection = newState.selection;
                changes.forEach(function (change) {
                    tr_1.replaceRange(change.from, change.to, change.slice);
                });
                if (tr_1.docChanged) {
                    tr_1.setSelection(selection);
                    tr_1.setMeta('addToHistory', false);
                    return tr_1;
                }
            }
        },
    });
});
//# sourceMappingURL=main.js.map