"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
var commands = require("../commands/text-formatting");
function keymapPlugin(schema) {
    var list = {};
    if (schema.marks.strong) {
        var eventName = analyticsEventName(schema.marks.strong);
        keymaps.bindKeymapWithCommand(keymaps.toggleBold.common, analytics_1.trackAndInvoke(eventName, commands.toggleStrong()), list);
    }
    if (schema.marks.em) {
        var eventName = analyticsEventName(schema.marks.em);
        keymaps.bindKeymapWithCommand(keymaps.toggleItalic.common, analytics_1.trackAndInvoke(eventName, commands.toggleEm()), list);
    }
    if (schema.marks.code) {
        var eventName = analyticsEventName(schema.marks.code);
        keymaps.bindKeymapWithCommand(keymaps.toggleCode.common, analytics_1.trackAndInvoke(eventName, commands.toggleCode()), list);
    }
    if (schema.marks.strike) {
        var eventName = analyticsEventName(schema.marks.strike);
        keymaps.bindKeymapWithCommand(keymaps.toggleStrikethrough.common, analytics_1.trackAndInvoke(eventName, commands.toggleStrike()), list);
    }
    if (schema.marks.underline) {
        var eventName = analyticsEventName(schema.marks.underline);
        keymaps.bindKeymapWithCommand(keymaps.toggleUnderline.common, analytics_1.trackAndInvoke(eventName, commands.toggleUnderline()), list);
    }
    return prosemirror_keymap_1.keymap(list);
}
exports.default = keymapPlugin;
function analyticsEventName(markType) {
    return "atlassian.editor.format." + markType.name + ".keyboard";
}
//# sourceMappingURL=keymap.js.map