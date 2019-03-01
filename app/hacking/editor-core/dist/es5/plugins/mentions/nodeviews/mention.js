"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Mention_1 = require("../ui/Mention");
var MentionNode = /** @class */ (function (_super) {
    tslib_1.__extends(MentionNode, _super);
    function MentionNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MentionNode.prototype.render = function () {
        var _a = this.props, node = _a.node, providerFactory = _a.providerFactory;
        var _b = node.attrs, id = _b.id, text = _b.text, accessLevel = _b.accessLevel;
        return (React.createElement(Mention_1.default, { id: id, text: text, accessLevel: accessLevel, providers: providerFactory }));
    };
    return MentionNode;
}(React.PureComponent));
exports.default = MentionNode;
//# sourceMappingURL=mention.js.map