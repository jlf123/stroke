"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var edit_1 = require("@atlaskit/icon/glyph/editor/edit");
var media_full_width_1 = require("@atlaskit/icon/glyph/editor/media-full-width");
var media_wide_1 = require("@atlaskit/icon/glyph/editor/media-wide");
var media_center_1 = require("@atlaskit/icon/glyph/editor/media-center");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var styles_1 = require("./styles");
var extensionIcons = [
    {
        key: 'default',
        icon: media_center_1.default,
        label: 'Centered',
    },
    {
        key: 'wide',
        icon: media_wide_1.default,
        label: 'Wide',
    },
    {
        key: 'full-width',
        icon: media_full_width_1.default,
        label: 'Full width',
    },
];
function ExtensionEditPanel(props) {
    var _this = this;
    var element = props.element, stickToolbarToBottom = props.stickToolbarToBottom, layout = props.layout, showLayoutOptions = props.showLayoutOptions;
    if (!element) {
        return null;
    }
    return (React.createElement(editor_common_1.Popup, { target: element, offset: [0, 8], alignX: "right", stickToBottom: stickToolbarToBottom, ariaLabel: "Extension options" },
        React.createElement(styles_1.Toolbar, null,
            React.createElement(ToolbarButton_1.default, { onClick: props.onEdit, iconBefore: React.createElement(edit_1.default, { label: "Edit extension" }) }),
            showLayoutOptions &&
                extensionIcons.map(function (toolbarLayoutOption, value) {
                    var Icon = toolbarLayoutOption.icon, key = toolbarLayoutOption.key, label = toolbarLayoutOption.label;
                    return (React.createElement(ToolbarButton_1.default, { onClick: props.onLayoutChange.bind(_this, key), iconBefore: React.createElement(Icon, { label: label }), selected: layout === key, key: key }));
                }),
            React.createElement(styles_1.Separator, null),
            React.createElement(ToolbarButton_1.default, { onClick: props.onRemove, iconBefore: React.createElement(remove_1.default, { label: "Remove extension" }) }))));
}
exports.default = ExtensionEditPanel;
//# sourceMappingURL=index.js.map