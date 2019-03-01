import * as tslib_1 from "tslib";
import { inputRules } from 'prosemirror-inputrules';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { Selection } from 'prosemirror-state';
/**
 * Creates an InputRuleHandler that will match on a regular expression of the
 * form `(prefix, content, suffix?)`, and replace it with some given text,
 * maintaining prefix and suffix around the replacement.
 *
 * @param text text to replace with
 */
function replaceTextUsingCaptureGroup(text, trackingEventName) {
    return function (state, match, start, end) {
        var _a = tslib_1.__read(match, 4), prefix = _a[1], suffix = _a[3];
        var replacement = (prefix || '') + text + (suffix || '');
        if (trackingEventName) {
            analyticsService.trackEvent("atlassian.editor.format." + trackingEventName + ".autoformatting");
        }
        var tr = state.tr, $to = state.selection.$to;
        tr.replaceWith(start, end, state.schema.text(replacement, $to.marks()));
        tr.setSelection(Selection.near(tr.doc.resolve(tr.selection.to)));
        return tr;
    };
}
function createReplacementRule(to, from, trackingEventName) {
    return createInputRule(from, replaceTextUsingCaptureGroup(to, trackingEventName));
}
function createReplacementRules(replMap, trackingEventName) {
    var e_1, _a;
    var rules = [];
    try {
        for (var _b = tslib_1.__values(Object.keys(replMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var replacement = _c.value;
            var regex = replMap[replacement];
            rules.push(createReplacementRule(replacement, regex, trackingEventName));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return rules;
}
// We don't agressively upgrade single quotes to smart quotes because
// they may clash with an emoji. Only do that when we have a matching
// single quote, or a contraction.
function createSingleQuotesRules(trackingEventName) {
    return [
        // wrapped text
        createInputRule(/(\s+|^)'(\S+.*\S+)'$/, function (state, match, start, end) {
            var _a = tslib_1.__read(match, 3), spacing = _a[1], innerContent = _a[2];
            var replacement = spacing + '‘' + innerContent + '’';
            analyticsService.trackEvent("atlassian.editor.format." + trackingEventName + ".autoformatting");
            return state.tr.insertText(replacement, start, end);
        }),
        // apostrophe
        createReplacementRule('’', /(\w)(')(\w)$/, trackingEventName),
    ];
}
export default inputRules({
    rules: tslib_1.__spread(createReplacementRules({
        Atlassian: /(\s+|^)(atlassian)(\s)$/,
        Jira: /(\s+|^)(jira|JIRA)(\s)$/,
        Bitbucket: /(\s+|^)(bitbucket|BitBucket)(\s)$/,
        Hipchat: /(\s+|^)(hipchat|HipChat)(\s)$/,
        Trello: /(\s+|^)(trello)(\s)$/,
    }, 'product'), createReplacementRules({
        '→': /(\s+|^)(--?>)(\s)$/,
        '←': /(\s+|^)(<--?)(\s)$/,
        '↔︎': /(\s+|^)(<->?)(\s)$/,
    }, 'arrow'), createReplacementRules({
        '–': /(\s+|^)(--)(\s)$/,
        '…': /()(\.\.\.)$/,
    }, 'typography'), createReplacementRules({
        '“': /((?:^|[\s\{\[\(\<'"\u2018\u201C]))(")$/,
        '”': /"$/,
    }, 'quote'), createSingleQuotesRules('quote')),
});
//# sourceMappingURL=smart-input-rule.js.map