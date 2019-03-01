"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var theme_1 = require("@atlaskit/theme");
var info_1 = require("@atlaskit/icon/glyph/editor/info");
var success_1 = require("@atlaskit/icon/glyph/editor/success");
var note_1 = require("@atlaskit/icon/glyph/editor/note");
var warning_1 = require("@atlaskit/icon/glyph/editor/warning");
var error_1 = require("@atlaskit/icon/glyph/editor/error");
var hint_1 = require("@atlaskit/icon/glyph/editor/hint");
var ReactNodeView_1 = require("../../../nodeviews/ReactNodeView");
var G50 = theme_1.colors.G50, P50 = theme_1.colors.P50, B50 = theme_1.colors.B50, Y50 = theme_1.colors.Y50, R50 = theme_1.colors.R50, G400 = theme_1.colors.G400, P400 = theme_1.colors.P400, B400 = theme_1.colors.B400, Y400 = theme_1.colors.Y400, R400 = theme_1.colors.R400;
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
    info: info_1.default,
    success: success_1.default,
    note: note_1.default,
    tip: hint_1.default,
    warning: warning_1.default,
    error: error_1.default,
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
}(ReactNodeView_1.default));
exports.panelNodeView = function (portalProviderAPI) { return function (node, view, getPos) {
    return new Panel(node, view, getPos, portalProviderAPI).init();
}; };
//# sourceMappingURL=panel.js.map