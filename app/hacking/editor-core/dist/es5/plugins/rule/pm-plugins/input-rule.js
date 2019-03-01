"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_model_1 = require("prosemirror-model");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
exports.createHorizontalRule = function (state, start, end) {
    if (!state.selection.empty) {
        return null;
    }
    var $from = state.selection.$from;
    var $afterRule = state.doc.resolve($from.after());
    var paragraph = state.schema.nodes.paragraph;
    if ($afterRule.nodeAfter && $afterRule.nodeAfter.type === paragraph) {
        // if there's already a paragraph after, just insert the rule into
        // the current paragraph
        end = end + 1;
    }
    return state.tr.replaceWith(start, end, prosemirror_model_1.Fragment.from(state.schema.nodes.rule.createChecked()));
};
var createHorizontalRuleAutoformat = function (state, start, end) {
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.horizontalrule.autoformatting");
    return exports.createHorizontalRule(state, start, end);
};
function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.rule) {
        // '---' and '***' for hr
        rules.push(
        // -1, so that it also replaces the container paragraph
        input_rules_1.createInputRule(/^(\-\-\-|\*\*\*)$/, function (state, match, start, end) {
            return createHorizontalRuleAutoformat(state, start - 1, end);
        }, true));
        // '---' and '***' after shift+enter for hr
        rules.push(input_rules_1.createInputRule(new RegExp(input_rules_1.leafNodeReplacementCharacter + "(\\-\\-\\-|\\*\\*\\*)"), function (state, match, start, end) {
            var hardBreak = state.schema.nodes.hardBreak;
            if (state.doc.resolve(start).nodeAfter.type !== hardBreak) {
                return null;
            }
            return createHorizontalRuleAutoformat(state, start, end);
        }, true));
    }
    if (rules.length !== 0) {
        return prosemirror_inputrules_1.inputRules({ rules: rules });
    }
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rule.js.map