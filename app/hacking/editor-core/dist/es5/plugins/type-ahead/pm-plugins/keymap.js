"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var main_1 = require("./main");
var select_item_1 = require("../commands/select-item");
var dismiss_1 = require("../commands/dismiss");
function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return select_item_1.selectCurrentItem('enter')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.SELECT_PREV }));
        }
        return true;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.SELECT_NEXT }));
        }
        return true;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return select_item_1.selectCurrentItem('shift-enter')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.tab.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return select_item_1.selectCurrentItem('tab')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        /**
         * Jira uses escape to toggle the collapsed editor
         * stop the event propagation when the picker is open
         */
        if (window.event) {
            window.event.stopPropagation();
        }
        return dismiss_1.dismissCommand()(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.space.common, function (state, dispatch) {
        var pluginState = main_1.pluginKey.getState(state);
        if (pluginState && pluginState.active) {
            return select_item_1.selectSingleItemOrDismiss('space')(state, dispatch);
        }
        return false;
    }, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.keymapPlugin = keymapPlugin;
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map