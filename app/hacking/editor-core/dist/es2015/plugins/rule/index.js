import * as React from 'react';
import HorizontalRuleIcon from '@atlaskit/icon/glyph/editor/divider';
import { rule } from '@atlaskit/adf-schema';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import { tagSpec as tag } from './tag';

var rulePlugin = {
    nodes: function() {
        return [
            { name: 'rule', node: rule }
        ];
    },
    pmPlugins: function() {
        return [
            {
                name: 'ruleInputRule',
                plugin: function(_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                }
            },
            {
                name: 'ruleKeymap',
                plugin: function(_a) {
                    var schema = _a.schema;
                    return keymapPlugin(schema);
                }
            }
        ];
    },
    pluginsOptions: {
        quickInsert: function(_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.horizontalRule),
                    keywords: ['horizontal rule', 'rule', 'line'],
                    priority: 1200,
                    icon: function() {
                        return React.createElement(HorizontalRuleIcon, {
                            label: formatMessage(messages.horizontalRule)
                        });
                    },
                    action: function(insert, state) {
                        return insert(state.schema.nodes.rule.createChecked());
                    }
                }
            ];
        }
    }
};
export default rulePlugin;
//# sourceMappingURL=index.js.map
