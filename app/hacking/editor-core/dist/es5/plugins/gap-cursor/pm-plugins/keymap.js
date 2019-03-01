"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var actions_1 = require("../actions");
var direction_1 = require("../direction");
function keymapPlugin() {
    var map = {};
    keymaps.bindKeymapWithCommand(keymaps.moveLeft.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return actions_1.arrow(direction_1.Direction.LEFT, endOfTextblock)(state, dispatch);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveRight.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return actions_1.arrow(direction_1.Direction.RIGHT, endOfTextblock)(state, dispatch);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return actions_1.arrow(direction_1.Direction.UP, endOfTextblock)(state, dispatch);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return actions_1.arrow(direction_1.Direction.DOWN, endOfTextblock)(state, dispatch);
    }, map);
    // default PM's Backspace doesn't handle removing block nodes when cursor is after it
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, actions_1.deleteNode(direction_1.Direction.BACKWARD), map);
    // handle Delete key (remove node after the cursor)
    keymaps.bindKeymapWithCommand(keymaps.deleteKey.common, actions_1.deleteNode(direction_1.Direction.FORWARD), map);
    return prosemirror_keymap_1.keymap(map);
}
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map