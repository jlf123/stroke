import * as tslib_1 from "tslib";
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
export default function getPropsPreset(appearance) {
    switch (appearance) {
        case 'message':
            return tslib_1.__assign({}, messageEditorPropsPreset);
        default:
            return {};
    }
}
//# sourceMappingURL=get-props-preset.js.map