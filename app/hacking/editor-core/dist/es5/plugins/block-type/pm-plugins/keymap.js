"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_history_1 = require("prosemirror-history");
var keymaps = require("../../../keymaps");
var commands = require("../../../commands");
var analytics_1 = require("../../../analytics");
var blockTypes = require("../types");
var commands_1 = require("../../block-type/commands");
var analyticsEventName = function (blockTypeName, eventSource) {
    return "atlassian.editor.format." + blockTypeName + "." + eventSource;
};
var tryUndoInputRuleElseUndoHistory = prosemirror_commands_1.chainCommands(prosemirror_inputrules_1.undoInputRule, prosemirror_history_1.undo);
function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, analytics_1.trackAndInvoke('atlassian.editor.newline.keyboard', commands.insertNewLine()), list);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, analytics_1.trackAndInvoke('atlassian.editor.moveup.keyboard', commands.createNewParagraphAbove), list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, analytics_1.trackAndInvoke('atlassian.editor.movedown.keyboard', commands.createNewParagraphBelow), list);
    keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redo), analytics_1.trackAndInvoke('atlassian.editor.redo.keyboard', prosemirror_history_1.redo), list);
    keymaps.bindKeymapWithCommand(keymaps.undo.common, analytics_1.trackAndInvoke('atlassian.editor.undo.keyboard', tryUndoInputRuleElseUndoHistory), list);
    keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redoBarred), commands.preventDefault(), list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, commands_1.cleanUpAtTheStartOfDocument, list);
    [
        blockTypes.NORMAL_TEXT,
        blockTypes.HEADING_1,
        blockTypes.HEADING_2,
        blockTypes.HEADING_3,
        blockTypes.HEADING_4,
        blockTypes.HEADING_5,
        blockTypes.HEADING_6,
        blockTypes.BLOCK_QUOTE,
    ].forEach(function (blockType) {
        if (schema.nodes[blockType.nodeName]) {
            var shortcut = keymaps.findShortcutByDescription(blockType.title.defaultMessage);
            if (shortcut) {
                var eventName = analyticsEventName(blockType.name, 'keyboard');
                keymaps.bindKeymapWithCommand(shortcut, analytics_1.trackAndInvoke(eventName, commands_1.insertBlockType(blockType.name)), list);
            }
        }
    });
    return prosemirror_keymap_1.keymap(list);
}
exports.default = keymapPlugin;
//# sourceMappingURL=keymap.js.map