"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var input_rules_1 = require("../../../utils/input-rules");
var analytics_1 = require("../../../analytics");
var main_1 = require("./main");
function inputRulePlugin(schema, typeAheads) {
    var triggersRegex = typeAheads
        .map(function (t) { return t.customRegex || t.trigger; })
        .join('|');
    if (!triggersRegex.length) {
        return;
    }
    var regex = new RegExp("(^|[.!?\\s" + input_rules_1.leafNodeReplacementCharacter + "])(" + triggersRegex + ")$");
    var typeAheadInputRule = input_rules_1.createInputRule(regex, function (state, match, start, end) {
        var typeAheadState = main_1.pluginKey.getState(state);
        /**
         * Why using match 2 and 3?  Regex:
         * (allowed characters before trigger)(joined|triggers|(sub capture groups))
         *            match[1]                     match[2]          match[3] – optional
         */
        var trigger = match[3] || match[2];
        if (!typeAheadState.isAllowed || !trigger) {
            return null;
        }
        var mark = schema.mark('typeAheadQuery', { trigger: trigger });
        var tr = state.tr, selection = state.selection;
        var marks = selection.$from.marks();
        analytics_1.analyticsService.trackEvent('atlassian.editor.typeahead.trigger', {
            trigger: trigger,
        });
        return tr.replaceSelectionWith(schema.text(trigger, tslib_1.__spread([mark], marks)), false);
    });
    return prosemirror_inputrules_1.inputRules({ rules: [typeAheadInputRule] });
}
exports.inputRulePlugin = inputRulePlugin;
exports.default = inputRulePlugin;
//# sourceMappingURL=input-rules.js.map