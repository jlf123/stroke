import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@atlaskit/theme';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
var G50 = colors.G50, P50 = colors.P50, B50 = colors.B50, Y50 = colors.Y50, R50 = colors.R50, G400 = colors.G400, P400 = colors.P400, B400 = colors.B400, Y400 = colors.Y400, R400 = colors.R400;
var panelColor = {
    info: B50,
    note: P50,
    tip: G50,
    success: G50,
    warning: Y50,
    error: R50,
};
var iconColor = {
    info: B400,
    note: P400,
    tip: G400,
    success: G400,
    warning: Y400,
    error: R400,
};
var panelIcons = {
    info: InfoIcon,
    success: SuccessIcon,
    note: NoteIcon,
    tip: TipIcon,
    warning: WarningIcon,
    error: ErrorIcon,
};
var PanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanelComponent, _super);
    function PanelComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.panelType !== nextProps.panelType;
    };
    PanelComponent.prototype.render = function () {
        var _a = this.props, panelType = _a.panelType, forwardRef = _a.forwardRef;
        var Icon = panelIcons[panelType];
        return (React.createElement("div", { style: { background: panelColor[panelType] }, className: "ak-editor-panel" },
            React.createElement("span", { style: { color: iconColor[panelType] }, className: "ak-editor-panel__icon" },
                React.createElement(Icon, { label: "Panel " + panelType })),
            React.createElement("div", { className: "ak-editor-panel__content", ref: forwardRef })));
    };
    return PanelComponent;
}(React.Component));
var Panel = /** @class */ (function (_super) {
    tslib_1.__extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.createDomRef = function () {
        var domRef = document.createElement('div');
        domRef.setAttribute('data-panel-type', this.node.attrs.panelType);
        return domRef;
    };
    Panel.prototype.getContentDOM = function () {
        var dom = document.createElement('div');
        dom.className = 'panel-content-dom';
        return { dom: dom };
    };
    Panel.prototype.render = function (props, forwardRef) {
        var panelType = this.node.attrs.panelType;
        return React.createElement(PanelComponent, { panelType: panelType, forwardRef: forwardRef });
    };
    Panel.prototype.update = function (node, decorations) {
        return _super.prototype.update.call(this, node, decorations, function (currentNode, newNode) {
            return currentNode.attrs.panelType === newNode.attrs.panelType;
        });
    };
    return Panel;
}(ReactNodeView));
export var panelNodeView = function (portalProviderAPI) { return function (node, view, getPos) {
    return new Panel(node, view, getPos, portalProviderAPI).init();
}; };
//# sourceMappingURL=panel.js.map