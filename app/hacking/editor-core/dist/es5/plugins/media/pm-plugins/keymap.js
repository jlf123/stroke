"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var main_1 = require("../pm-plugins/main");
function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, removeMediaNode, list);
    keymaps.bindKeymapWithCommand(keymaps.undo.common, ignoreLinksInSteps, list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, splitMediaGroup, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, splitMediaGroup, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
var removeMediaNode = function (state) {
    var mediaPluginState = main_1.stateKey.getState(state);
    return mediaPluginState.removeSelectedMediaNode();
};
var ignoreLinksInSteps = function (state) {
    var mediaPluginState = main_1.stateKey.getState(state);
    mediaPluginState.ignoreLinks = true;
    return false;
};
var splitMediaGroup = function (state) {
    var mediaPluginState = main_1.stateKey.getState(state);
    return mediaPluginState.splitMediaGroup();
};
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map