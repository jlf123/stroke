import { inputRules } from 'prosemirror-inputrules';
import { createInputRule, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { emojiPluginKey } from './main';
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.emoji && schema.marks.emojiQuery) {
        var regex = new RegExp("(^|[\\s(" + leafNodeReplacementCharacter + "]):$");
        var emojiQueryRule = createInputRule(regex, function (state, match, start, end) {
            var emojisState = emojiPluginKey.getState(state);
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
        return inputRules({ rules: rules });
    }
}
export default inputRulePlugin;
//# sourceMappingURL=input-rules.js.map