"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var prosemirror_utils_1 = require("prosemirror-utils");
var editor_common_1 = require("@atlaskit/editor-common");
var expand_1 = require("@atlaskit/icon/glyph/editor/expand");
var collapse_1 = require("@atlaskit/icon/glyph/editor/collapse");
var messages_1 = require("../../../../messages");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var types_1 = require("../../types");
var actions_1 = require("../../actions");
var styles_1 = require("../styles");
var POPUP_OFFSET = [
    -styles_1.layoutButtonSize - 5,
    -styles_1.layoutButtonSize - editor_common_1.tableMarginTop + 2,
];
var getTitle = function (layout) {
    switch (layout) {
        case 'default':
            return messages_1.default.layoutWide;
        case 'wide':
            return messages_1.default.layoutFullWidth;
        default:
            return messages_1.default.layoutFixedWidth;
    }
};
var LayoutButton = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutButton, _super);
    function LayoutButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.toggleTableLayout(state, dispatch);
        };
        return _this;
    }
    LayoutButton.prototype.render = function () {
        var _a = this.props, formatMessage = _a.intl.formatMessage, mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, targetRef = _a.targetRef, editorView = _a.editorView;
        if (!targetRef) {
            return null;
        }
        var table = prosemirror_utils_1.findTable(editorView.state.selection);
        if (!table) {
            return false;
        }
        var layout = table.node.attrs.layout;
        var title = formatMessage(getTitle(layout));
        return (React.createElement(editor_common_1.Popup, { ariaLabel: title, offset: POPUP_OFFSET, target: targetRef, alignY: "top", alignX: "right", stickToBottom: true, mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement },
            React.createElement("div", { className: types_1.TableCssClassName.LAYOUT_BUTTON },
                React.createElement(ToolbarButton_1.default, { title: title, onClick: this.handleClick, iconBefore: layout === 'full-width' ? (React.createElement(collapse_1.default, { label: title })) : (React.createElement(expand_1.default, { label: title })) }))));
    };
    return LayoutButton;
}(React.Component));
exports.default = react_intl_1.injectIntl(LayoutButton);
//# sourceMappingURL=index.js.map