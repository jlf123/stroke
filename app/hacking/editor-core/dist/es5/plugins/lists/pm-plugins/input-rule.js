"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
function createInputRule(regexp, nodeType) {
    return prosemirror_inputrules_1.wrappingInputRule(regexp, nodeType, {}, function (_, node) { return node.type === nodeType; });
}
exports.createInputRule = createInputRule;
exports.insertList = function (state, listType, listTypeName, start, end, matchSize) {
    // To ensure that match is done after HardBreak.
    var hardBreak = state.schema.nodes.hardBreak;
    if (state.doc.resolve(start).nodeAfter.type !== hardBreak) {
        return null;
    }
    // To ensure no nesting is done.
    if (state.doc.resolve(start).depth > 1) {
        return null;
    }
    // Track event
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.list." + listTypeName + ".autoformatting");
    // Split at the start of autoformatting and delete formatting characters.
    var tr = state.tr.delete(start, end).split(start);
    // If node has more content split at the end of autoformatting.
    var currentNode = tr.doc.nodeAt(start + 1);
    tr.doc.nodesBetween(start, start + currentNode.nodeSize, function (node, pos) {
        if (node.type === hardBreak) {
            tr = tr.split(pos + 1).delete(pos, pos + 1);
        }
    });
    // Wrap content in list node
    var listItem = state.schema.nodes.listItem;
    var position = tr.doc.resolve(start + 2);
    var range = position.blockRange(position);
    tr = tr.wrap(range, [{ type: listType }, { type: listItem }]);
    return tr;
};
function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.bulletList) {
        // NOTE: we decided to restrict the creation of bullet lists to only "*"x
        var rule = input_rules_1.defaultInputRuleHandler(createInputRule(/^\s*([\*\-]) $/, schema.nodes.bulletList), true);
        rule.handler = analytics_1.trackAndInvoke('atlassian.editor.format.list.bullet.autoformatting', rule.handler);
        rules.push(rule);
        rules.push(input_rules_1.createInputRule(new RegExp(input_rules_1.leafNodeReplacementCharacter + "\\s*([\\*\\-]) $"), function (state, match, start, end) {
            return exports.insertList(state, schema.nodes.bulletList, 'bullet', start, end, 1);
        }, true));
    }
    if (schema.nodes.orderedList) {
        // NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
        // input rule will allow for a list to start at any given number, which isn't allowed in
        // markdown (where a ordered list will always start on 1). This is a slightly modified
        // version of that input rule.
        var rule = input_rules_1.defaultInputRuleHandler(createInputRule(/^(1)[\.\)] $/, schema.nodes.orderedList), true);
        rule.handler = analytics_1.trackAndInvoke('atlassian.editor.format.list.numbered.autoformatting', rule.handler);
        rules.push(rule);
        rules.push(input_rules_1.createInputRule(new RegExp(input_rules_1.leafNodeReplacementCharacter + "(1)[\\.\\)] $"), function (state, match, start, end) {
            return exports.insertList(state, schema.nodes.orderedList, 'numbered', start, end, 2);
        }, true));
    }
    if (rules.length !== 0) {
        return prosemirror_inputrules_1.inputRules({ rules: rules });
    }
}
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rule.js.map