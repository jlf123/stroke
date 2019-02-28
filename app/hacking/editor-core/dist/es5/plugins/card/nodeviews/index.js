"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var nodeviews_1 = require("../../../nodeviews");
var CardNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(CardNodeView, _super);
    function CardNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardNodeView.fromComponent = function (component, portalProviderAPI, props) {
        return function (node, view, getPos) {
            return new CardNodeView(node, view, getPos, portalProviderAPI, props, component, true).init();
        };
    };
    return CardNodeView;
}(nodeviews_1.ReactNodeView));
exports.CardNodeView = CardNodeView;
//# sourceMappingURL=index.js.map