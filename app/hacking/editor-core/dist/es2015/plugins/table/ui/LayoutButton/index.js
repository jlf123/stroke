import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { findTable } from 'prosemirror-utils';
import { Popup, tableMarginTop } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import commonMessages from '../../../../messages';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { TableCssClassName as ClassName } from '../../types';
import { toggleTableLayout } from '../../actions';
import { layoutButtonSize } from '../styles';
var POPUP_OFFSET = [
    -layoutButtonSize - 5,
    -layoutButtonSize - tableMarginTop + 2,
];
var getTitle = function (layout) {
    switch (layout) {
        case 'default':
            return commonMessages.layoutWide;
        case 'wide':
            return commonMessages.layoutFullWidth;
        default:
            return commonMessages.layoutFixedWidth;
    }
};
var LayoutButton = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutButton, _super);
    function LayoutButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            toggleTableLayout(state, dispatch);
        };
        return _this;
    }
    LayoutButton.prototype.render = function () {
        var _a = this.props, formatMessage = _a.intl.formatMessage, mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, targetRef = _a.targetRef, editorView = _a.editorView;
        if (!targetRef) {
            return null;
        }
        var table = findTable(editorView.state.selection);
        if (!table) {
            return false;
        }
        var layout = table.node.attrs.layout;
        var title = formatMessage(getTitle(layout));
        return (React.createElement(Popup, { ariaLabel: title, offset: POPUP_OFFSET, target: targetRef, alignY: "top", alignX: "right", stickToBottom: true, mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement },
            React.createElement("div", { className: ClassName.LAYOUT_BUTTON },
                React.createElement(ToolbarButton, { title: title, onClick: this.handleClick, iconBefore: layout === 'full-width' ? (React.createElement(CollapseIcon, { label: title })) : (React.createElement(ExpandIcon, { label: title })) }))));
    };
    return LayoutButton;
}(React.Component));
export default injectIntl(LayoutButton);
//# sourceMappingURL=index.js.map