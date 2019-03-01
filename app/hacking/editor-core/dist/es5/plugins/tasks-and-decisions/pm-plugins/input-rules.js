"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_state_1 = require("prosemirror-state");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
var prosemirror_utils_1 = require("prosemirror-utils");
var commands_1 = require("../commands");
var createListRule = function (regex, name, list, item, schema, analyticType) {
    var _a = schema.nodes, paragraph = _a.paragraph, hardBreak = _a.hardBreak;
    return input_rules_1.createInputRule(regex, function (state, match, start, end) {
        var tr = state.tr, $from = state.selection.$from;
        var content = $from.node($from.depth).content;
        var shouldBreakNode = false;
        content.forEach(function (node, offset) {
            if (node.type === hardBreak && offset < start) {
                shouldBreakNode = true;
            }
        });
        var $end = state.doc.resolve(end);
        var $endOfParent = state.doc.resolve($end.after());
        // Only allow creating list in nodes that support them.
        // Parent must be a paragraph as we don't want this applying to headings
        if ($end.parent.type !== paragraph ||
            !prosemirror_utils_1.canInsert($endOfParent, list.createAndFill())) {
            return null;
        }
        var where = $from.before($from.depth);
        analytics_1.analyticsService.trackEvent("atlassian.fabric." + analyticType + ".trigger.shortcut");
        if (!shouldBreakNode) {
            tr.delete(where, $from.end($from.depth))
                .replaceSelectionWith(list.create({ localId: adf_schema_1.uuid.generate() }, [
                item.create({ localId: adf_schema_1.uuid.generate() }, content),
            ]))
                .delete(start + 1, end + 1)
                .setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve(start + 1)));
        }
        else {
            var depthAdjustment = commands_1.changeInDepth($from, tr.selection.$from);
            tr.split($from.pos)
                .setSelection(new prosemirror_state_1.NodeSelection(tr.doc.resolve($from.pos + 1)))
                .replaceSelectionWith(list.create({ localId: adf_schema_1.uuid.generate() }, [
                item.create({ localId: adf_schema_1.uuid.generate() }, 
                // TODO: [ts30] handle void and null properly
                tr.doc.nodeAt($from.pos + 1).content),
            ]))
                .setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve($from.pos + depthAdjustment)))
                .delete(start, end + 1);
        }
        return tr;
    }, true);
};
function inputRulePlugin(schema) {
    var rules = [];
    var _a = schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
    if (decisionList && decisionItem) {
        rules.push(createListRule(new RegExp("(^|" + input_rules_1.leafNodeReplacementCharacter + ")\\<\\>\\s$"), 'decisionlist', decisionList, decisionItem, schema, 'decision'));
    }
    if (taskList && taskItem) {
        rules.push(createListRule(new RegExp("(^|" + input_rules_1.leafNodeReplacementCharacter + ")\\[\\]\\s$"), 'tasklist', taskList, taskItem, schema, 'action'));
    }
    return prosemirror_inputrules_1.inputRules({ rules: rules });
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rules.js.map