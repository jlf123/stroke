"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../../../utils");
function keymapPlugin(schema) {
    return prosemirror_keymap_1.keymap({
        Enter: function (state, dispatch) {
            var selection = state.selection, nodes = state.schema.nodes;
            var $from = selection.$from, $to = selection.$to;
            var node = $from.node($from.depth);
            var selectionIsAtEndOfCodeBlock = node &&
                node.type === nodes.codeBlock &&
                $from.parentOffset === $from.parent.nodeSize - 2 && // cursor offset is at the end of block
                $from.indexAfter($from.depth) === node.childCount; // paragraph is the last child of code block
            var codeBlockEndsWithNewLine = node.lastChild &&
                node.lastChild.text &&
                node.lastChild.text.endsWith('\n');
            if (selectionIsAtEndOfCodeBlock && codeBlockEndsWithNewLine) {
                var tr = state.tr.insert($to.pos + 1, nodes.paragraph.createChecked({}));
                dispatch(prosemirror_utils_1.setTextSelection($to.pos + 1)(tr)
                    .delete($from.pos - 1, $from.pos)
                    .scrollIntoView());
                return true;
            }
            return false;
        },
        Backspace: function (state, dispatch) {
            var $cursor = utils_1.getCursor(state.selection);
            var _a = state.schema.nodes, paragraph = _a.paragraph, codeBlock = _a.codeBlock, listItem = _a.listItem;
            if (!$cursor || $cursor.parent.type !== codeBlock) {
                return false;
            }
            if ($cursor.pos === 1 ||
                (prosemirror_utils_1.hasParentNodeOfType(listItem)(state.selection) &&
                    $cursor.parentOffset === 0)) {
                var node = prosemirror_utils_1.findParentNodeOfTypeClosestToPos($cursor, codeBlock);
                if (!node) {
                    return false;
                }
                dispatch(state.tr
                    .setNodeMarkup(node.pos, node.node.type, node.node.attrs, [])
                    .setBlockType($cursor.pos, $cursor.pos, paragraph));
                return true;
            }
            return false;
        },
    });
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymaps.js.map