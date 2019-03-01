"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keymaps = require("../../../keymaps");
var analytics_1 = require("../../../analytics");
var utils_1 = require("../utils");
var main_1 = require("../pm-plugins/main");
var commands_1 = require("../commands");
var actions_1 = require("../../card/pm-plugins/actions");
function createKeymapPlugin(schema, props) {
    var list = {};
    if (props.appearance !== 'message') {
        keymaps.bindKeymapWithCommand(keymaps.addLink.common, analytics_1.trackAndInvoke('atlassian.editor.format.hyperlink.keyboard', commands_1.showLinkToolbar()), list);
    }
    keymaps.bindKeymapWithCommand(keymaps.enter.common, mayConvertLastWordToHyperlink, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, mayConvertLastWordToHyperlink, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch, view) {
        var hyperlinkPlugin = main_1.stateKey.getState(state);
        if (hyperlinkPlugin.activeLinkMark) {
            commands_1.hideLinkToolbar()(state, dispatch);
            if (view) {
                view.focus();
            }
            return false;
        }
        return false;
    }, list);
    return prosemirror_keymap_1.keymap(list);
}
exports.createKeymapPlugin = createKeymapPlugin;
var mayConvertLastWordToHyperlink = function (state, dispatch) {
    var nodeBefore = state.selection.$from.nodeBefore;
    if (!nodeBefore || !nodeBefore.isText) {
        return false;
    }
    var words = nodeBefore.text.split(' ');
    var lastWord = words[words.length - 1];
    var match = utils_1.getLinkMatch(lastWord);
    if (match) {
        var hyperlinkedText = match.raw;
        var start = state.selection.$from.pos - hyperlinkedText.length;
        var end = state.selection.$from.pos;
        if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
            return false;
        }
        var url = match.url;
        var markType = state.schema.mark('link', { href: url });
        var tr = actions_1.queueCards([
            {
                url: url,
                pos: start,
                appearance: 'inline',
            },
        ])(state.tr.addMark(start, end, markType));
        analytics_1.analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        if (dispatch) {
            dispatch(tr);
        }
    }
    return false;
};
exports.default = createKeymapPlugin;
//# sourceMappingURL=keymap.js.map