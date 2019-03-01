"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var types_1 = require("../types");
var utils_1 = require("../../../utils");
var blockTypeForNode = function (node, schema) {
    if (node.type === schema.nodes.heading) {
        var maybeNode = types_1.HEADINGS_BY_LEVEL[node.attrs['level']];
        if (maybeNode) {
            return maybeNode;
        }
    }
    else if (node.type === schema.nodes.paragraph) {
        return types_1.NORMAL_TEXT;
    }
    return types_1.OTHER;
};
var isBlockTypeSchemaSupported = function (blockType, state) {
    switch (blockType) {
        case types_1.NORMAL_TEXT:
            return !!state.schema.nodes.paragraph;
        case types_1.HEADING_1:
        case types_1.HEADING_2:
        case types_1.HEADING_3:
        case types_1.HEADING_4:
        case types_1.HEADING_5:
        case types_1.HEADING_6:
            return !!state.schema.nodes.heading;
        case types_1.BLOCK_QUOTE:
            return !!state.schema.nodes.blockquote;
        case types_1.CODE_BLOCK:
            return !!state.schema.nodes.codeBlock;
        case types_1.PANEL:
            return !!state.schema.nodes.panel;
    }
};
var detectBlockType = function (availableBlockTypes, state) {
    // Before a document is loaded, there is no selection.
    if (!state.selection) {
        return types_1.NORMAL_TEXT;
    }
    var blockType;
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    state.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
        var nodeBlockType = availableBlockTypes.filter(function (blockType) { return blockType === blockTypeForNode(node, state.schema); });
        if (nodeBlockType.length > 0) {
            if (!blockType) {
                blockType = nodeBlockType[0];
            }
            else if (blockType !== types_1.OTHER && blockType !== nodeBlockType[0]) {
                blockType = types_1.OTHER;
            }
        }
    });
    return blockType || types_1.OTHER;
};
exports.pluginKey = new prosemirror_state_1.PluginKey('blockTypePlugin');
exports.createPlugin = function (dispatch, appearance) {
    return new prosemirror_state_1.Plugin({
        appendTransaction: function (transactions, oldState, newState) {
            if (appearance === 'comment') {
                var pos = newState.doc.resolve(newState.doc.content.size - 1);
                var lastNode = pos.node(1);
                var paragraph = newState.schema.nodes.paragraph;
                if (lastNode && lastNode.isBlock && lastNode.type !== paragraph) {
                    return newState.tr.insert(newState.doc.content.size, newState.schema.nodes.paragraph.create());
                }
            }
        },
        state: {
            init: function (config, state) {
                var availableBlockTypes = types_1.TEXT_BLOCK_TYPES.filter(function (blockType) {
                    return isBlockTypeSchemaSupported(blockType, state);
                });
                var availableWrapperBlockTypes = types_1.WRAPPER_BLOCK_TYPES.filter(function (blockType) { return isBlockTypeSchemaSupported(blockType, state); });
                return {
                    currentBlockType: detectBlockType(availableBlockTypes, state),
                    blockTypesDisabled: utils_1.areBlockTypesDisabled(state),
                    availableBlockTypes: availableBlockTypes,
                    availableWrapperBlockTypes: availableWrapperBlockTypes,
                };
            },
            apply: function (tr, oldPluginState, oldState, newState) {
                var newPluginState = tslib_1.__assign({}, oldPluginState, { currentBlockType: detectBlockType(oldPluginState.availableBlockTypes, newState), blockTypesDisabled: utils_1.areBlockTypesDisabled(newState) });
                if (newPluginState.currentBlockType !== oldPluginState.currentBlockType ||
                    newPluginState.blockTypesDisabled !==
                        oldPluginState.blockTypesDisabled) {
                    dispatch(exports.pluginKey, newPluginState);
                }
                return newPluginState;
            },
        },
        key: exports.pluginKey,
    });
};
//# sourceMappingURL=main.js.map