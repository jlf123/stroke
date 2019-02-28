"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var input_rules_1 = require("../../../utils/input-rules");
var main_1 = require("./main");
function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.emoji && schema.marks.emojiQuery) {
        var regex = new RegExp("(^|[\\s(" + input_rules_1.leafNodeReplacementCharacter + "]):$");
        var emojiQueryRule = input_rules_1.createInputRule(regex, function (state, match, start, end) {
            var emojisState = main_1.emojiPluginKey.getState(state);
            if (!emojisState.emojiProvider) {
                return null;
            }
            if (!emojisState.isEnabled()) {
                return null;
            }
            var mark = schema.mark('emojiQuery');
            var tr = state.tr;
            var emojiText = schema.text(':', [mark]);
            return tr.replaceSelectionWith(emojiText, false);
        });
        rules.push(emojiQueryRule);
    }
    if (rules.length !== 0) {
        return prosemirror_inputrules_1.inputRules({ rules: rules });
    }
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rules.js.map