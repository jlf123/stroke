"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var messageEditorPropsPreset = {
    appearance: 'message',
    saveOnEnter: true,
    allowLists: true,
    allowTextColor: true,
    allowInlineAction: true,
    allowCodeBlocks: true,
    allowTasksAndDecisions: true,
    allowHelpDialog: true,
};
function getPropsPreset(appearance) {
    switch (appearance) {
        case 'message':
            return tslib_1.__assign({}, messageEditorPropsPreset);
        default:
            return {};
    }
}
exports.default = getPropsPreset;
//# sourceMappingURL=get-props-preset.js.map