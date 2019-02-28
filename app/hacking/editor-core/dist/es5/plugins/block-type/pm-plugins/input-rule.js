"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
var transform_to_code_block_1 = require("../commands/transform-to-code-block");
var insert_block_1 = require("../commands/insert-block");
var prosemirror_utils_1 = require("prosemirror-utils");
function headingRule(nodeType, maxLevel) {
    return prosemirror_inputrules_1.textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, function (match) { return ({ level: match[1].length }); });
}
exports.headingRule = headingRule;
function blockQuoteRule(nodeType) {
    return prosemirror_inputrules_1.wrappingInputRule(/^\s*>\s$/, nodeType);
}
exports.blockQuoteRule = blockQuoteRule;
function codeBlockRule(nodeType) {
    return prosemirror_inputrules_1.textblockTypeInputRule(/^```$/, nodeType);
}
exports.codeBlockRule = codeBlockRule;
function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.heading) {
        // '# ' for h1, '## ' for h2 and etc
        var rule = input_rules_1.defaultInputRuleHandler(headingRule(schema.nodes.heading, 6), true);
        var currentHandler_1 = rule.handler;
        rule.handler = function (state, match, start, end) {
            analytics_1.analyticsService.trackEvent("atlassian.editor.format.heading" + match[1].length + ".autoformatting");
            return currentHandler_1(state, match, start, end);
        };
        rules.push(rule);
        rules.push(input_rules_1.createInputRule(new RegExp(input_rules_1.leafNodeReplacementCharacter + "(#{1,6})\\s$"), function (state, match, start, end) {
            var level = match[1].length;
            return insert_block_1.insertBlock(state, schema.nodes.heading, "heading" + level, start, end, { level: level });
        }, true));
    }
    if (schema.nodes.blockquote) {
        // '> ' for blockquote
        var rule = input_rules_1.defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote), true);
        rule.handler = analytics_1.trackAndInvoke('atlassian.editor.format.blockquote.autoformatting', rule.handler);
        rules.push(rule);
        rules.push(input_rules_1.createInputRule(new RegExp(input_rules_1.leafNodeReplacementCharacter + "\\s*>\\s$"), function (state, match, start, end) {
            return insert_block_1.insertBlock(state, schema.nodes.blockquote, 'blockquote', start, end);
        }, true));
    }
    if (schema.nodes.codeBlock) {
        rules.push(input_rules_1.createInputRule(/((^`{3,})|(\s`{3,}))(\S*)$/, function (state, match, start, end) {
            var attributes = {};
            if (match[4]) {
                attributes.language = match[4];
            }
            var newStart = match[0][0] === ' ' ? start + 1 : start;
            if (transform_to_code_block_1.isConvertableToCodeBlock(state)) {
                analytics_1.analyticsService.trackEvent("atlassian.editor.format.codeblock.autoformatting");
                return (transform_to_code_block_1.transformToCodeBlockAction(state, attributes)
                    // remove markdown decorator ```
                    .delete(newStart, end)
                    .scrollIntoView());
            }
            var tr = state.tr;
            tr = tr.delete(newStart, end);
            var codeBlock = state.schema.nodes.codeBlock.createChecked();
            return prosemirror_utils_1.safeInsert(codeBlock)(tr);
        }, true));
        rules.push(input_rules_1.createInputRule(new RegExp("((" + input_rules_1.leafNodeReplacementCharacter + "`{3,})|(\\s`{3,}))(\\S*)$"), function (state, match, start, end) {
            var attributes = {};
            if (match[4]) {
                attributes.language = match[4];
            }
            return insert_block_1.insertBlock(state, schema.nodes.codeBlock, 'codeblock', start, end, attributes);
        }, true));
    }
    if (rules.length !== 0) {
        return prosemirror_inputrules_1.inputRules({ rules: rules });
    }
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rule.js.map