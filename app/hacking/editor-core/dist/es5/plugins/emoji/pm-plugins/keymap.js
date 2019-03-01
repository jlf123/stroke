"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var main_1 = require("./main");
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectPrevious();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectNext();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectCurrent(keymaps.enter.common);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        emojisPlugin.onSelectCurrent(keymaps.insertNewLine.common);
        return false;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.tab.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectCurrent(keymaps.tab.common);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        /**
         * Jira uses escape to toggle the collapsed editor
         * stop the event propagation when the picker is open
         */
        if (window.event) {
            window.event.stopPropagation();
        }
        return emojisPlugin.dismiss();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.space.common, function (state, dispatch) {
        var emojisPlugin = main_1.emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.trySelectCurrentWithSpace(keymaps.space.common);
    }, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map