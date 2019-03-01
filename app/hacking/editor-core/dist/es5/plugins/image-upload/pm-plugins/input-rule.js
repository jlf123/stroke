"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
var utils_1 = require("../utils");
function inputRulePlugin(schema) {
    if (!schema.nodes.media || !schema.nodes.mediaSingle) {
        return;
    }
    // ![something](link) should convert to an image
    var imageRule = input_rules_1.createInputRule(/!\[(.*)\]\((\S+)\)$/, function (state, match, start, end) {
        var schema = state.schema;
        var attrs = {
            src: match[2],
            alt: match[1],
        };
        var node = utils_1.createExternalMediaNode(attrs.src, schema);
        if (node) {
            analytics_1.analyticsService.trackEvent('atlassian.editor.image.autoformatting');
            return state.tr.replaceWith(start, end, node);
        }
        return null;
    });
    return prosemirror_inputrules_1.inputRules({
        rules: [imageRule],
    });
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rule.js.map