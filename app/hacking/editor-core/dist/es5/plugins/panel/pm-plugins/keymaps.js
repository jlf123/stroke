"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_utils_1 = require("prosemirror-utils");
function keymapPlugin() {
    var deleteCurrentItem = function ($from, tr) {
        return tr.delete($from.before($from.depth) - 1, $from.end($from.depth) + 1);
    };
    var keymaps = {
        Backspace: function (state, dispatch) {
            var selection = state.selection, nodes = state.schema.nodes, tr = state.tr;
            var panel = nodes.panel;
            var $from = selection.$from, $to = selection.$to;
            // Don't do anything if selection is a range
            if ($from.pos !== $to.pos) {
                return false;
            }
            // If not at the start of a panel, no joining will happen so allow default behaviour (backspacing characters etc..)
            if ($from.parentOffset !== 0) {
                return false;
            }
            var previousPos = tr.doc.resolve(Math.max(0, $from.before($from.depth) - 1));
            var previousNodeType = previousPos.pos > 0 && previousPos.parent && previousPos.parent.type;
            var parentNodeType = $from.parent.type;
            var isPreviousNodeAPanel = previousNodeType === panel;
            var isParentNodeAPanel = parentNodeType === panel;
            // Stops merging panels when deleting empty paragraph in between
            if (isPreviousNodeAPanel && !isParentNodeAPanel) {
                var content = $from.node($from.depth).content;
                var insertPos = previousPos.pos - 1;
                deleteCurrentItem($from, tr).insert(insertPos, content);
                dispatch(prosemirror_utils_1.setTextSelection(insertPos)(tr).scrollIntoView());
                return true;
            }
            var nodeType = $from.node().type;
            if (nodeType !== panel) {
                return false;
            }
            return true;
        },
    };
    return prosemirror_keymap_1.keymap(keymaps);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymaps.js.map