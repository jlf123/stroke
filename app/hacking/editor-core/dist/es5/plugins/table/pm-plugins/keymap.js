"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
var actions_1 = require("../actions");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.nextCell.common, actions_1.goToNextCell(1), list);
    keymaps.bindKeymapWithCommand(keymaps.previousCell.common, actions_1.goToNextCell(-1), list);
    keymaps.bindKeymapWithCommand(keymaps.toggleTable.common, actions_1.createTable, list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, function (state, dispatch) {
        if (!prosemirror_utils_1.isCellSelection(state.selection)) {
            return false;
        }
        var tr = state.tr;
        var selection = tr.selection;
        selection.forEachCell(function (node, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = prosemirror_utils_1.emptyCell(prosemirror_utils_1.findCellClosestToPos($pos), state.schema)(tr);
        });
        if (tr.docChanged) {
            var $pos = tr.doc.resolve(tr.mapping.map(selection.$headCell.pos));
            var textSelection = prosemirror_state_1.Selection.findFrom($pos, 1, true);
            if (textSelection) {
                tr.setSelection(textSelection);
            }
            if (dispatch) {
                dispatch(tr);
            }
            analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.delete_content.keyboard');
            return true;
        }
        return false;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, actions_1.moveCursorBackward, list);
    // Add row/column shortcuts
    keymaps.bindKeymapWithCommand(keymaps.addRowBefore.common, actions_1.triggerUnlessTableHeader(prosemirror_tables_1.addRowBefore), list);
    keymaps.bindKeymapWithCommand(keymaps.addRowAfter.common, prosemirror_tables_1.addRowAfter, list);
    keymaps.bindKeymapWithCommand(keymaps.addColumnBefore.common, actions_1.triggerUnlessTableHeader(prosemirror_tables_1.addColumnBefore), list);
    keymaps.bindKeymapWithCommand(keymaps.addColumnAfter.common, prosemirror_tables_1.addColumnAfter, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map