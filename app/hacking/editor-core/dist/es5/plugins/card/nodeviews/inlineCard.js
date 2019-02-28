"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var smart_card_1 = require("@atlaskit/smart-card");
var wrapper_click_area_1 = require("../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area");
var react_nodeview_1 = require("../../../plugins/base/pm-plugins/react-nodeview");
var InlineCardNode = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardNode, _super);
    function InlineCardNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { };
        return _this;
    }
    InlineCardNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected;
        var _b = node.attrs, url = _b.url, data = _b.data;
        var cardContext = this.context.contextAdapter
            ? this.context.contextAdapter.card
            : undefined;
        var card = (React.createElement(smart_card_1.Card, { url: url, data: data, appearance: "inline", isSelected: selected, onClick: this.onClick }));
        return cardContext ? (React.createElement(cardContext.Provider, { value: cardContext.value }, card)) : (card);
    };
    InlineCardNode.contextTypes = {
        contextAdapter: PropTypes.object,
    };
    return InlineCardNode;
}(React.PureComponent));
var WrappedInline = /** @class */ (function (_super) {
    tslib_1.__extends(WrappedInline, _super);
    function WrappedInline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrappedInline.prototype.render = function () {
        var WrappedComponent = wrapper_click_area_1.default(InlineCardNode, true);
        return (React.createElement(WrappedComponent, tslib_1.__assign({}, this.props, { pluginState: react_nodeview_1.stateKey.getState(this.props.view.state) })));
    };
    return WrappedInline;
}(React.PureComponent));
exports.default = WrappedInline;
//# sourceMappingURL=inlineCard.js.map