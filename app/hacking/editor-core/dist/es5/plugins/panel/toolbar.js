"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_intl_1 = require("react-intl");
var success_1 = require("@atlaskit/icon/glyph/editor/success");
var info_1 = require("@atlaskit/icon/glyph/editor/info");
var note_1 = require("@atlaskit/icon/glyph/editor/note");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var warning_1 = require("@atlaskit/icon/glyph/editor/warning");
var error_1 = require("@atlaskit/icon/glyph/editor/error");
var messages_1 = require("../../messages");
var actions_1 = require("./actions");
var main_1 = require("./pm-plugins/main");
exports.messages = react_intl_1.defineMessages({
    info: {
        id: 'fabric.editor.info',
        defaultMessage: 'Info',
        description: 'Panels provide a way to highlight text. The info panel has a blue background.',
    },
    note: {
        id: 'fabric.editor.note',
        defaultMessage: 'Note',
        description: 'Panels provide a way to highlight text. The note panel has a purple background.',
    },
    success: {
        id: 'fabric.editor.success',
        defaultMessage: 'Success',
        description: 'Panels provide a way to highlight text. The success panel has a green background.',
    },
    warning: {
        id: 'fabric.editor.warning',
        defaultMessage: 'Warning',
        description: 'Panels provide a way to highlight text. The warning panel has a yellow background.',
    },
    error: {
        id: 'fabric.editor.error',
        defaultMessage: 'Error',
        description: 'Panels provide a way to highlight text. The error panel has a red background.',
    },
});
exports.getToolbarConfig = function (state, _a) {
    var formatMessage = _a.formatMessage;
    var panelState = main_1.pluginKey.getState(state);
    if (panelState && panelState.toolbarVisible && panelState.element) {
        var activePanelType = panelState.activePanelType;
        return {
            title: 'Panel floating controls',
            getDomRef: function () { return panelState.element; },
            nodeType: state.schema.nodes.panel,
            items: [
                {
                    type: 'button',
                    icon: info_1.default,
                    onClick: actions_1.changePanelType('info'),
                    selected: activePanelType === 'info',
                    title: formatMessage(exports.messages.info),
                },
                {
                    type: 'button',
                    icon: note_1.default,
                    onClick: actions_1.changePanelType('note'),
                    selected: activePanelType === 'note',
                    title: formatMessage(exports.messages.note),
                },
                {
                    type: 'button',
                    icon: success_1.default,
                    onClick: actions_1.changePanelType('success'),
                    selected: activePanelType === 'success',
                    title: formatMessage(exports.messages.success),
                },
                {
                    type: 'button',
                    icon: warning_1.default,
                    onClick: actions_1.changePanelType('warning'),
                    selected: activePanelType === 'warning',
                    title: formatMessage(exports.messages.warning),
                },
                {
                    type: 'button',
                    icon: error_1.default,
                    onClick: actions_1.changePanelType('error'),
                    selected: activePanelType === 'error',
                    title: formatMessage(exports.messages.error),
                },
                {
                    type: 'separator',
                },
                {
                    type: 'button',
                    appearance: 'danger',
                    icon: remove_1.default,
                    onClick: actions_1.removePanel(),
                    title: formatMessage(messages_1.default.remove),
                },
            ],
        };
    }
};
//# sourceMappingURL=toolbar.js.map