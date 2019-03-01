"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
var commands_1 = require("../commands");
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleOrderedList), analytics_1.trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', commands_1.toggleListCommand('orderedList')), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleBulletList), analytics_1.trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', commands_1.toggleListCommand('bulletList')), list);
    keymaps.bindKeymapWithCommand(keymaps.indentList.common, analytics_1.trackAndInvoke('atlassian.editor.format.list.indent.keyboard', commands_1.indentList()), list);
    keymaps.bindKeymapWithCommand(keymaps.outdentList.common, analytics_1.trackAndInvoke('atlassian.editor.format.list.outdent.keyboard', commands_1.outdentList()), list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, commands_1.enterKeyCommand, list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, commands_1.backspaceKeyCommand, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map