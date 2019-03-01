"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var commands = require("../../../commands");
var analytics_1 = require("../../../analytics");
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.insertRule.common, analytics_1.trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', commands.insertRule()), list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        return true;
    }, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map