"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var analytics_1 = require("../../../analytics");
var input_rules_1 = require("../../../utils/input-rules");
var utils_1 = require("../utils");
var actions_1 = require("../../card/pm-plugins/actions");
function createLinkInputRule(regexp, formatUrl) {
    return input_rules_1.createInputRule(regexp, function (state, match, start, end) {
        var schema = state.schema;
        if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
            return null;
        }
        var _a = tslib_1.__read(match, 1), link = _a[0];
        var markType = schema.mark('link', { href: link.url });
        analytics_1.analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        var tr = state.tr
            .addMark(start - (link.input.length - link.lastIndex), end - (link.input.length - link.lastIndex), markType)
            .insertText(' ');
        return actions_1.queueCards([
            {
                url: link.url,
                pos: start - (link.input.length - link.lastIndex),
                appearance: 'inline',
            },
        ])(tr);
    });
}
exports.createLinkInputRule = createLinkInputRule;
function createInputRulePlugin(schema) {
    if (!schema.marks.link) {
        return;
    }
    var urlWithASpaceRule = createLinkInputRule(new utils_1.LinkMatcher(), function (match) { return (match[3] ? match[1] : "https?://" + match[1]); });
    // [something](link) should convert to a hyperlink
    var markdownLinkRule = input_rules_1.createInputRule(/(^|[^!])\[(.*?)\]\((\S+)\)$/, function (state, match, start, end) {
        var schema = state.schema;
        var _a = tslib_1.__read(match, 4), prefix = _a[1], linkText = _a[2], linkUrl = _a[3];
        var url = utils_1.normalizeUrl(linkUrl);
        var markType = schema.mark('link', { href: url });
        analytics_1.analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        return state.tr.replaceWith(start + prefix.length, end, schema.text(linkText, [markType]));
    });
    return prosemirror_inputrules_1.inputRules({
        rules: [urlWithASpaceRule, markdownLinkRule],
    });
}
exports.createInputRulePlugin = createInputRulePlugin;
exports.default = createInputRulePlugin;
//# sourceMappingURL=input-rule.js.map