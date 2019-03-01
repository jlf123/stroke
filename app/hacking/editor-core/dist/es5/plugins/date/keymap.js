"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var actions_1 = require("./actions");
var keymaps = require("../../keymaps");
var plugin_1 = require("./plugin");
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var datePlugin = plugin_1.pluginKey.getState(state);
        if (!datePlugin.showDatePickerAt) {
            return false;
        }
        actions_1.closeDatePicker()(state, dispatch);
        return true;
    }, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map