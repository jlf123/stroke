"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
var clear_formatting_1 = require("../commands/clear-formatting");
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.clearFormatting.common, analytics_1.trackAndInvoke('atlassian.editor.format.clear.keyboard', clear_formatting_1.clearFormatting()), list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=clear-formatting-keymap.js.map