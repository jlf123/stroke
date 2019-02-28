"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var editor_common_1 = require("@atlaskit/editor-common");
var cross_1 = require("@atlaskit/icon/glyph/cross");
var modal_dialog_1 = require("@atlaskit/modal-dialog");
var styles_1 = require("./styles");
var keymaps = require("../../../keymaps");
var ToolbarButton_1 = require("../../../ui/ToolbarButton");
var ToolbarTextFormatting_1 = require("../../text-formatting/ui/ToolbarTextFormatting");
var ToolbarAdvancedTextFormatting_1 = require("../../text-formatting/ui/ToolbarAdvancedTextFormatting");
var types_1 = require("../../block-type/types");
var messages_1 = require("../../lists/messages");
var ToolbarInsertBlock_1 = require("../../insert-block/ui/ToolbarInsertBlock");
var __1 = require("../");
var messages = react_intl_1.defineMessages({
    editorHelp: {
        id: 'fabric.editor.editorHelp',
        defaultMessage: 'Editor help',
        description: 'Title of editor help dialog.',
    },
    helpDialogTips: {
        id: 'fabric.editor.helpDialogTips',
        defaultMessage: 'Press {keyMap} to quickly open this dialog at any time',
        description: 'Hint about how to open a dialog quickly using a shortcut.',
    },
    keyboardShortcuts: {
        id: 'fabric.editor.keyboardShortcuts',
        defaultMessage: 'Keyboard shortcuts',
        description: '',
    },
    markdown: {
        id: 'fabric.editor.markdown',
        defaultMessage: 'Markdown',
        description: 'It is a name of popular markup language.',
    },
    undo: {
        id: 'fabric.editor.undo',
        defaultMessage: 'Undo',
        description: '',
    },
    redo: {
        id: 'fabric.editor.redo',
        defaultMessage: 'Redo',
        description: '',
    },
    pastePlainText: {
        id: 'fabric.editor.pastePlainText',
        defaultMessage: 'Paste plain text',
        description: '',
    },
    altText: {
        id: 'fabric.editor.altText',
        defaultMessage: 'Alt text',
        description: 'Alternative text for image.',
    },
    closeHelpDialog: {
        id: 'fabric.editor.closeHelpDialog',
        defaultMessage: 'Close help dialog',
        description: '',
    },
    // TODO: Move it inside quick insert plugin
    quickInsert: {
        id: 'fabric.editor.quickInsert',
        defaultMessage: 'Quick insert',
        description: 'Name of a feature, which let you insert items quickly.',
    },
});
var AkModalDialog = modal_dialog_1.default;
exports.formatting = function (_a) {
    var formatMessage = _a.formatMessage;
    return [
        {
            name: formatMessage(ToolbarTextFormatting_1.messages.bold),
            type: 'strong',
            keymap: function () { return keymaps.toggleBold; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null,
                    "**",
                    React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, ToolbarTextFormatting_1.messages.bold)),
                    "**"))); },
        },
        {
            name: formatMessage(ToolbarTextFormatting_1.messages.italic),
            type: 'em',
            keymap: function () { return keymaps.toggleItalic; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null,
                    "*",
                    React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, ToolbarTextFormatting_1.messages.italic)),
                    "*"))); },
        },
        {
            name: formatMessage(ToolbarAdvancedTextFormatting_1.messages.underline),
            type: 'underline',
            keymap: function () { return keymaps.toggleUnderline; },
        },
        {
            name: formatMessage(ToolbarAdvancedTextFormatting_1.messages.strike),
            type: 'strike',
            keymap: function () { return keymaps.toggleStrikethrough; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null,
                    "~~",
                    React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, ToolbarAdvancedTextFormatting_1.messages.strike)),
                    "~~"))); },
        },
        {
            name: formatMessage(types_1.messages.heading1),
            type: 'heading',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeSm, null, "#"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(types_1.messages.heading2),
            type: 'heading',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, "##"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(messages_1.messages.orderedList),
            type: 'orderedList',
            keymap: function () { return keymaps.toggleOrderedList; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeSm, null, "1."),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(messages_1.messages.unorderedList),
            type: 'bulletList',
            keymap: function () { return keymaps.toggleBulletList; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeSm, null, "*"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(types_1.messages.blockquote),
            type: 'blockquote',
            keymap: function () { return keymaps.toggleBlockQuote; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, ">"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(types_1.messages.codeblock),
            type: 'codeBlock',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, "```"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.horizontalRule),
            type: 'rule',
            keymap: function () { return keymaps.insertRule; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, "---"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.link),
            type: 'link',
            keymap: function (_a) {
                var appearance = _a.appearance;
                return appearance && appearance !== 'message' ? keymaps.addLink : undefined;
            },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null,
                    "[",
                    React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, ToolbarInsertBlock_1.messages.link)),
                    "](http://a.com)"))); },
        },
        {
            name: formatMessage(ToolbarAdvancedTextFormatting_1.messages.code),
            type: 'code',
            keymap: function () { return keymaps.toggleCode; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null,
                    "`",
                    React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, ToolbarAdvancedTextFormatting_1.messages.code)),
                    "`"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.action),
            type: 'taskItem',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeSm, null, "[]"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.decision),
            type: 'decisionItem',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeSm, null, "<>"),
                " ",
                React.createElement(styles_1.CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.emoji),
            type: 'emoji',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, ":"))); },
        },
        {
            name: formatMessage(ToolbarInsertBlock_1.messages.mention),
            type: 'mention',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(styles_1.CodeLg, null, "@"))); },
        },
    ];
};
var shortcutNamesWithoutKeymap = [
    'emoji',
    'mention',
    'quickInsert',
];
var otherFormatting = function (_a) {
    var formatMessage = _a.formatMessage;
    return [
        {
            name: formatMessage(ToolbarAdvancedTextFormatting_1.messages.clearFormatting),
            type: 'clearFormatting',
            keymap: function () { return keymaps.clearFormatting; },
        },
        {
            name: formatMessage(messages.undo),
            type: 'undo',
            keymap: function () { return keymaps.undo; },
        },
        {
            name: formatMessage(messages.redo),
            type: 'redo',
            keymap: function () { return keymaps.redo; },
        },
        {
            name: formatMessage(messages.pastePlainText),
            type: 'paste',
            keymap: function () { return keymaps.pastePlainText; },
        },
    ];
};
var imageAutoFormat = {
    name: 'Image',
    type: 'image',
    autoFormatting: function () { return (React.createElement("span", null,
        React.createElement(styles_1.CodeLg, null,
            "![",
            React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages.altText)),
            "](http://www.image.com)"))); },
};
var quickInsertAutoFormat = function (_a) {
    var formatMessage = _a.formatMessage;
    return ({
        name: formatMessage(messages.quickInsert),
        type: 'quickInsert',
        autoFormatting: function () { return (React.createElement("span", null,
            React.createElement(styles_1.CodeLg, null, "/"))); },
    });
};
exports.getSupportedFormatting = function (schema, intl, imageEnabled, quickInsertEnabled) {
    var supportedBySchema = exports.formatting(intl).filter(function (format) { return schema.nodes[format.type] || schema.marks[format.type]; });
    return tslib_1.__spread(supportedBySchema, (imageEnabled ? [imageAutoFormat] : []), (quickInsertEnabled ? [quickInsertAutoFormat(intl)] : []), otherFormatting(intl));
};
exports.getComponentFromKeymap = function (keymap) {
    var shortcut = keymap[editor_common_1.browser.mac ? 'mac' : 'windows'];
    var keyParts = shortcut.replace(/\-(?=.)/g, ' + ').split(' ');
    return (React.createElement("span", null, keyParts.map(function (part, index) {
        if (part === '+') {
            return React.createElement("span", { key: shortcut + "-" + index }, ' + ');
        }
        else if (part === 'Cmd') {
            return React.createElement(styles_1.CodeSm, { key: shortcut + "-" + index }, "\u2318");
        }
        else if (['ctrl', 'alt', 'opt', 'shift'].indexOf(part.toLowerCase()) >= 0) {
            return React.createElement(styles_1.CodeMd, { key: shortcut + "-" + index }, part);
        }
        return (React.createElement(styles_1.CodeSm, { key: shortcut + "-" + index }, part.toUpperCase()));
    })));
};
var ModalHeader = react_intl_1.injectIntl(function (_a) {
    var onClose = _a.onClose, showKeyline = _a.showKeyline, formatMessage = _a.intl.formatMessage;
    return (React.createElement(styles_1.Header, { showKeyline: showKeyline },
        React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages.editorHelp)),
        React.createElement("div", null,
            React.createElement(ToolbarButton_1.default, { onClick: onClose, title: formatMessage(messages.closeHelpDialog), spacing: "compact", iconBefore: React.createElement(cross_1.default, { label: formatMessage(messages.closeHelpDialog), size: "medium" }) }))));
});
var ModalFooter = function (_a) {
    var showKeyline = _a.showKeyline;
    return (React.createElement(styles_1.Footer, { showKeyline: showKeyline },
        React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages.helpDialogTips, { values: { keyMap: exports.getComponentFromKeymap(keymaps.openHelp) } }))));
};
var HelpDialog = /** @class */ (function (_super) {
    tslib_1.__extends(HelpDialog, _super);
    function HelpDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.closeDialog = function () {
            var _a = _this.props.editorView, tr = _a.state.tr, dispatch = _a.dispatch;
            __1.closeHelpCommand(tr, dispatch);
        };
        _this.handleEsc = function (e) {
            if (e.key === 'Escape' && _this.props.isVisible) {
                _this.closeDialog();
            }
        };
        return _this;
    }
    HelpDialog.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.handleEsc);
    };
    HelpDialog.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.handleEsc);
    };
    HelpDialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorView = _a.editorView, intl = _a.intl, imageEnabled = _a.imageEnabled, quickInsertEnabled = _a.quickInsertEnabled;
        this.formatting = exports.getSupportedFormatting(editorView.state.schema, intl, imageEnabled, quickInsertEnabled);
        return (React.createElement(modal_dialog_1.ModalTransition, null, this.props.isVisible ? (React.createElement(AkModalDialog, { width: "large", onClose: this.closeDialog, header: ModalHeader, footer: ModalFooter },
            React.createElement(styles_1.ContentWrapper, null,
                React.createElement(styles_1.Line, null),
                React.createElement(styles_1.Content, null,
                    React.createElement(styles_1.ColumnLeft, null,
                        React.createElement(styles_1.Title, null,
                            React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages.keyboardShortcuts))),
                        React.createElement("div", null,
                            this.formatting
                                .filter(function (form) {
                                var keymap = form.keymap && form.keymap(_this.props);
                                return (keymap && keymap[editor_common_1.browser.mac ? 'mac' : 'windows']);
                            })
                                .map(function (form) { return (React.createElement(styles_1.Row, { key: "textFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                exports.getComponentFromKeymap(form.keymap({ appearance: _this.props.appearance })))); }),
                            this.formatting
                                .filter(function (form) {
                                return shortcutNamesWithoutKeymap.indexOf(form.type) !== -1;
                            })
                                .filter(function (form) { return form.autoFormatting; })
                                .map(function (form) { return (React.createElement(styles_1.Row, { key: "autoFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                form.autoFormatting())); }))),
                    React.createElement(styles_1.Line, null),
                    React.createElement(styles_1.ColumnRight, null,
                        React.createElement(styles_1.Title, null,
                            React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages.markdown))),
                        React.createElement("div", null, this.formatting
                            .filter(function (form) {
                            return shortcutNamesWithoutKeymap.indexOf(form.type) === -1;
                        })
                            .map(function (form) {
                            return form.autoFormatting && (React.createElement(styles_1.Row, { key: "autoFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                form.autoFormatting()));
                        }))))))) : null));
    };
    return HelpDialog;
}(React.Component));
exports.default = react_intl_1.injectIntl(HelpDialog);
//# sourceMappingURL=index.js.map