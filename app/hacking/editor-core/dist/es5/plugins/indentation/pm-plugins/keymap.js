"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
var utils_1 = require("../../../utils");
var commands_1 = require("../commands");
function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.indent), analytics_1.trackAndInvoke('atlassian.editor.format.block.indent.keyboard', commands_1.indent), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.outdent), analytics_1.trackAndInvoke('atlassian.editor.format.block.outdent.keyboard', commands_1.outdent), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.backspace), analytics_1.trackAndInvoke('atlassian.editor.format.block.outdent.keyboard.alt', function (state, dispatch) {
        var selection = state.selection;
        if (utils_1.isTextSelection(selection) &&
            selection.$cursor &&
            selection.$cursor.parentOffset === 0) {
            return dispatch ? commands_1.outdent(state, dispatch) : false;
        }
        return false;
    }), list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map