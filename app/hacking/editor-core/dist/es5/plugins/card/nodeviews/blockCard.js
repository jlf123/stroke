"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var smart_card_1 = require("@atlaskit/smart-card");
var PropTypes = require("prop-types");
var wrapper_click_area_1 = require("../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area");
var react_nodeview_1 = require("../../../plugins/base/pm-plugins/react-nodeview");
var BlockCardNode = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardNode, _super);
    function BlockCardNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { };
        return _this;
    }
    BlockCardNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected;
        var _b = node.attrs, url = _b.url, data = _b.data;
        var cardContext = this.context.contextAdapter
            ? this.context.contextAdapter.card
            : undefined;
        // render an empty span afterwards to get around Webkit bug
        // that puts caret in next editable text element
        var cardInner = (React.createElement(React.Fragment, null,
            React.createElement(smart_card_1.Card, { url: url, data: data, appearance: "block", isSelected: selected, onClick: this.onClick }),
            React.createElement("span", { contentEditable: true })));
        return (React.createElement("div", null, cardContext ? (React.createElement(cardContext.Provider, { value: cardContext.value }, cardInner)) : (cardInner)));
    };
    BlockCardNode.contextTypes = {
        contextAdapter: PropTypes.object,
    };
    return BlockCardNode;
}(React.Component));
var ClickableBlockCard = wrapper_click_area_1.default(BlockCardNode);
var WrappedInline = /** @class */ (function (_super) {
    tslib_1.__extends(WrappedInline, _super);
    function WrappedInline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrappedInline.prototype.render = function () {
        return (React.createElement(ClickableBlockCard, tslib_1.__assign({}, this.props, { pluginState: react_nodeview_1.stateKey.getState(this.props.view.state) })));
    };
    return WrappedInline;
}(React.PureComponent));
exports.default = WrappedInline;
//# sourceMappingURL=blockCard.js.map