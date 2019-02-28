import {
    textblockTypeInputRule,
    wrappingInputRule,
    inputRules,
    InputRule
} from 'prosemirror-inputrules';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import {
    createInputRule,
    defaultInputRuleHandler,
    leafNodeReplacementCharacter
} from '../../../utils/input-rules';
import {
    isConvertableToCodeBlock,
    transformToCodeBlockAction
} from '../commands/transform-to-code-block';
import { insertBlock } from '../commands/insert-block';
import { safeInsert } from 'prosemirror-utils';
export function headingRule(nodeType, maxLevel) {
    return textblockTypeInputRule(
        new RegExp('^(#{1,' + maxLevel + '})\\s$'),
        nodeType,
        function(match) {
            return { level: match[1].length };
        }
    );
}
export function blockQuoteRule(nodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
}
export function codeBlockRule(nodeType) {
    return textblockTypeInputRule(/^```$/, nodeType);
}
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.heading) {
        // '# ' for h1, '## ' for h2 and etc
        var rule = defaultInputRuleHandler(
            headingRule(schema.nodes.heading, 6),
            true
        );
        var currentHandler_1 = rule.handler;
        rule.handler = function(state, match, start, end) {
            analyticsService.trackEvent(
                'atlassian.editor.format.heading' +
                    match[1].length +
                    '.autoformatting'
            );
            return currentHandler_1(state, match, start, end);
        };
        rules.push(rule);
        rules.push(
            createInputRule(
                new RegExp(leafNodeReplacementCharacter + '(#{1,6})\\s$'),
                function(state, match, start, end) {
                    var level = match[1].length;
                    return insertBlock(
                        state,
                        schema.nodes.heading,
                        'heading' + level,
                        start,
                        end,
                        { level: level }
                    );
                },
                true
            )
        );
    }
    if (schema.nodes.blockquote) {
        // '> ' for blockquote
        var rule = defaultInputRuleHandler(
            blockQuoteRule(schema.nodes.blockquote),
            true
        );
        rule.handler = trackAndInvoke(
            'atlassian.editor.format.blockquote.autoformatting',
            rule.handler
        );
        rules.push(rule);
        rules.push(
            createInputRule(
                new RegExp(leafNodeReplacementCharacter + '\\s*>\\s$'),
                function(state, match, start, end) {
                    return insertBlock(
                        state,
                        schema.nodes.blockquote,
                        'blockquote',
                        start,
                        end
                    );
                },
                true
            )
        );
    }

    console.log('got the tag: ', schema.nodes.tag);
    rules.push(
        new InputRule(/^#([A-Z]|[a-z])+ /, (state, match, start, end) => {
            const tag = state.schema.nodes.tag.create();
            return state.tr.replaceWith(
                start,
                end,
                state.config.schema.nodes.tag.create({ id: match[0] })
            );
        })
    );

    if (schema.nodes.codeBlock) {
        rules.push(
            createInputRule(
                /((^`{3,})|(\s`{3,}))(\S*)$/,
                function(state, match, start, end) {
                    var attributes = {};
                    if (match[4]) {
                        attributes.language = match[4];
                    }
                    var newStart = match[0][0] === ' ' ? start + 1 : start;
                    if (isConvertableToCodeBlock(state)) {
                        analyticsService.trackEvent(
                            'atlassian.editor.format.codeblock.autoformatting'
                        );
                        return (
                            transformToCodeBlockAction(state, attributes)
                                // remove markdown decorator ```
                                .delete(newStart, end)
                                .scrollIntoView()
                        );
                    }
                    var tr = state.tr;
                    tr = tr.delete(newStart, end);
                    var codeBlock = state.schema.nodes.codeBlock.createChecked();
                    return safeInsert(codeBlock)(tr);
                },
                true
            )
        );
        rules.push(
            createInputRule(
                new RegExp(
                    '((' +
                        leafNodeReplacementCharacter +
                        '`{3,})|(\\s`{3,}))(\\S*)$'
                ),
                function(state, match, start, end) {
                    var attributes = {};
                    if (match[4]) {
                        attributes.language = match[4];
                    }
                    return insertBlock(
                        state,
                        schema.nodes.codeBlock,
                        'codeblock',
                        start,
                        end,
                        attributes
                    );
                },
                true
            )
        );
    }
    if (rules.length !== 0) {
        return inputRules({ rules: rules });
    }
}
export default inputRulePlugin;
//# sourceMappingURL=input-rule.js.map
