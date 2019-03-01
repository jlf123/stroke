"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editor_common_1 = require("@atlaskit/editor-common");
exports.toggleBold = makeKeyMapWithCommon('Bold', 'Mod-b');
exports.toggleItalic = makeKeyMapWithCommon('Italic', 'Mod-i');
exports.toggleUnderline = makeKeyMapWithCommon('Underline', 'Mod-u');
exports.toggleStrikethrough = makeKeyMapWithCommon('Strikethrough', 'Mod-Shift-s');
exports.toggleCode = makeKeyMapWithCommon('Code', 'Mod-Shift-m');
exports.pastePlainText = makeKeyMapWithCommon('Paste Plain Text', 'Mod-Shift-v');
exports.clearFormatting = makeKeyMapWithCommon('Clear formatting', 'Mod-\\');
exports.setNormalText = makeKeymap('Normal text', '', 'Cmd-Alt-0');
exports.toggleHeading1 = makeKeymap('Heading 1', '', 'Cmd-Alt-1');
exports.toggleHeading2 = makeKeymap('Heading 2', '', 'Cmd-Alt-2');
exports.toggleHeading3 = makeKeymap('Heading 3', '', 'Cmd-Alt-3');
exports.toggleHeading4 = makeKeymap('Heading 4', '', 'Cmd-Alt-4');
exports.toggleHeading5 = makeKeymap('Heading 5', '', 'Cmd-Alt-5');
exports.toggleOrderedList = makeKeymap('Numbered list', '', 'Cmd-Shift-7');
exports.toggleBulletList = makeKeymap('Bullet list', '', 'Cmd-Shift-8');
exports.toggleBlockQuote = makeKeymap('Block quote', '', 'Cmd-Alt-9');
exports.insertNewLine = makeKeyMapWithCommon('Insert new line', 'Shift-Enter');
exports.shiftBackspace = makeKeyMapWithCommon('Shift Backspace', 'Shift-Backspace');
exports.splitCodeBlock = makeKeyMapWithCommon('Split code block', 'Enter');
exports.splitListItem = makeKeyMapWithCommon('Split list item', 'Enter');
exports.insertRule = makeKeyMapWithCommon('Insert horizontal rule', 'Mod-Shift--');
exports.undo = makeKeyMapWithCommon('Undo', 'Mod-z');
exports.moveUp = makeKeyMapWithCommon('Move up', 'ArrowUp');
exports.moveDown = makeKeyMapWithCommon('Move down', 'ArrowDown');
exports.moveLeft = makeKeyMapWithCommon('Move left', 'ArrowLeft');
exports.moveRight = makeKeyMapWithCommon('Move right', 'ArrowRight');
exports.indentList = makeKeyMapWithCommon('Indent List', 'Tab');
exports.outdentList = makeKeyMapWithCommon('Outdent List', 'Shift-Tab');
exports.redo = makeKeymap('Redo', 'Ctrl-y', 'Cmd-Shift-z');
exports.redoBarred = makeKeymap('Redo Barred', 'Ctrl-Shift-z', 'Cmd-y');
exports.openHelp = makeKeyMapWithCommon('Open Help', 'Mod-/');
exports.addLink = makeKeyMapWithCommon('Link', 'Mod-k');
exports.submit = makeKeyMapWithCommon('Submit Content', 'Mod-Enter');
exports.enter = makeKeyMapWithCommon('Enter', 'Enter');
exports.tab = makeKeyMapWithCommon('Tab', 'Tab');
exports.indent = makeKeyMapWithCommon('Indent', 'Tab');
exports.outdent = makeKeyMapWithCommon('Outdent', 'Shift-Tab');
exports.backspace = makeKeyMapWithCommon('Backspace', 'Backspace');
exports.deleteKey = makeKeyMapWithCommon('Delete', 'Delete');
exports.space = makeKeyMapWithCommon('Space', 'Space');
exports.escape = makeKeyMapWithCommon('Escape', 'Escape');
exports.nextCell = makeKeyMapWithCommon('Next cell', 'Tab');
exports.previousCell = makeKeyMapWithCommon('Previous cell', 'Shift-Tab');
exports.toggleTable = makeKeyMapWithCommon('Table', 'Shift-Alt-t');
exports.addRowBefore = makeKeyMapWithCommon('Add Row Above', 'Ctrl-Alt-ArrowUp');
exports.addRowAfter = makeKeyMapWithCommon('Add Row Below', 'Ctrl-Alt-ArrowDown');
exports.addColumnAfter = makeKeyMapWithCommon('Add Column After', 'Ctrl-Alt-ArrowRight');
exports.addColumnBefore = makeKeyMapWithCommon('Add Column Before', 'Ctrl-Alt-ArrowLeft');
exports.cut = makeKeyMapWithCommon('Cut', 'Mod-x');
exports.copy = makeKeyMapWithCommon('Copy', 'Mod-c');
exports.paste = makeKeyMapWithCommon('Paste', 'Mod-v');
exports.altPaste = makeKeyMapWithCommon('Paste', 'Mod-Shift-v');
function tooltip(keymap, description) {
    if (keymap) {
        var shortcut = void 0;
        if (editor_common_1.browser.mac) {
            shortcut = keymap.mac
                .replace(/Cmd/i, '⌘')
                .replace(/Shift/i, '⇧')
                .replace(/Ctrl/i, '^')
                .replace(/Alt/i, '⌥');
        }
        else {
            shortcut = keymap.windows;
        }
        var keys = shortcut.split('-');
        keys[keys.length - 1] = keys[keys.length - 1].toUpperCase();
        shortcut = keys.join(editor_common_1.browser.mac ? '' : '+');
        return description ? description + " " + shortcut : shortcut;
    }
}
exports.tooltip = tooltip;
function findKeymapByDescription(description) {
    var matches = ALL.filter(function (keymap) { return keymap.description.toUpperCase() === description.toUpperCase(); });
    return matches[0];
}
exports.findKeymapByDescription = findKeymapByDescription;
function findShortcutByDescription(description) {
    var keymap = findKeymapByDescription(description);
    if (keymap) {
        return findShortcutByKeymap(keymap);
    }
}
exports.findShortcutByDescription = findShortcutByDescription;
function findShortcutByKeymap(keymap) {
    if (editor_common_1.browser.mac) {
        return keymap.mac;
    }
    return keymap.windows;
}
exports.findShortcutByKeymap = findShortcutByKeymap;
var ALL = [
    exports.toggleOrderedList,
    exports.toggleBulletList,
    exports.toggleBold,
    exports.toggleItalic,
    exports.toggleUnderline,
    exports.toggleStrikethrough,
    exports.toggleCode,
    exports.setNormalText,
    exports.toggleHeading1,
    exports.toggleHeading2,
    exports.toggleHeading3,
    exports.toggleHeading4,
    exports.toggleHeading5,
    exports.toggleBlockQuote,
    exports.insertNewLine,
    exports.insertRule,
    exports.splitCodeBlock,
    exports.splitListItem,
    exports.redo,
    exports.undo,
];
function makeKeymap(description, windows, mac, common) {
    return {
        description: description,
        windows: windows,
        mac: mac,
        common: common,
    };
}
function makeKeyMapWithCommon(description, common) {
    var windows = common.replace(/Mod/i, 'Ctrl');
    var mac = common.replace(/Mod/i, 'Cmd');
    return makeKeymap(description, windows, mac, common);
}
function bindKeymapWithCommand(shortcut, cmd, keymap) {
    var oldCmd = keymap[shortcut];
    var newCmd = cmd;
    if (keymap[shortcut]) {
        newCmd = function (state, dispatch, editorView) {
            return oldCmd(state, dispatch) || cmd(state, dispatch, editorView);
        };
    }
    keymap[shortcut] = newCmd;
}
exports.bindKeymapWithCommand = bindKeymapWithCommand;
function findKeyMapForBrowser(kayMap) {
    if (kayMap) {
        if (editor_common_1.browser.mac) {
            return kayMap.mac;
        }
        return kayMap.windows;
    }
}
exports.findKeyMapForBrowser = findKeyMapForBrowser;
exports.LEFT = 37;
exports.RIGHT = 39;
exports.UP = 38;
exports.DOWN = 40;
//# sourceMappingURL=index.js.map