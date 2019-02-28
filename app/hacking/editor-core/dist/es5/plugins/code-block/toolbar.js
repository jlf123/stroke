"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_intl_1 = require("react-intl");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var adf_schema_1 = require("@atlaskit/adf-schema");
var prosemirror_utils_1 = require("prosemirror-utils");
var actions_1 = require("./actions");
var messages_1 = require("../../messages");
var main_1 = require("./pm-plugins/main");
var create_breakout_toolbar_items_1 = require("../breakout/utils/create-breakout-toolbar-items");
exports.messages = react_intl_1.defineMessages({
    selectLanguage: {
        id: 'fabric.editor.selectLanguage',
        defaultMessage: 'Select language',
        description: 'Code blocks display software code. A prompt to select the software language the code is written in.',
    },
});
exports.getToolbarConfig = function (state, _a) {
    var formatMessage = _a.formatMessage;
    var codeBlockState = main_1.pluginKey.getState(state);
    if (codeBlockState &&
        codeBlockState.toolbarVisible &&
        codeBlockState.element) {
        var parent_1 = prosemirror_utils_1.findParentNodeOfType(state.schema.nodes.codeBlock)(state.selection);
        var language_1 = parent_1 && parent_1.node.attrs ? parent_1.node.attrs.language : undefined;
        var options = adf_schema_1.createLanguageList(adf_schema_1.DEFAULT_LANGUAGES).map(function (lang) { return ({
            label: lang.name,
            value: adf_schema_1.getLanguageIdentifier(lang),
        }); });
        var languageSelect = {
            type: 'select',
            onChange: function (option) { return actions_1.changeLanguage(option.value); },
            defaultValue: language_1
                ? options.find(function (option) { return option.value === language_1; })
                : undefined,
            placeholder: formatMessage(exports.messages.selectLanguage),
            options: options,
        };
        var breakoutToolbar = create_breakout_toolbar_items_1.createBreakoutToolbarItems(state, {
            formatMessage: formatMessage,
        });
        var separator = {
            type: 'separator',
        };
        var deleteButton = {
            type: 'button',
            appearance: 'danger',
            icon: remove_1.default,
            onClick: actions_1.removeCodeBlock,
            title: formatMessage(messages_1.default.remove),
        };
        return {
            title: 'CodeBlock floating controls',
            getDomRef: function () { return codeBlockState.element; },
            nodeType: state.schema.nodes.codeBlock,
            items: tslib_1.__spread([
                languageSelect
            ], (breakoutToolbar ? tslib_1.__spread([separator], breakoutToolbar) : []), [
                separator,
                deleteButton,
            ]),
        };
    }
};
//# sourceMappingURL=toolbar.js.map