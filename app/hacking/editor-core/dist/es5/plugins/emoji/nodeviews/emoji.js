"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var Emoji_1 = require("../ui/Emoji");
// tslint:disable-next-line:variable-name
var Wrapper = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  user-select: all;\n"], ["\n  user-select: all;\n"])));
var EmojiNode = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiNode, _super);
    function EmojiNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiNode.prototype.render = function () {
        var _a = this.props, node = _a.node, providerFactory = _a.providerFactory;
        var _b = node.attrs, shortName = _b.shortName, id = _b.id, text = _b.text;
        return (React.createElement(Wrapper, null,
            React.createElement(Emoji_1.default, { providers: providerFactory, id: id, shortName: shortName, fallback: text })));
    };
    return EmojiNode;
}(React.PureComponent));
exports.default = EmojiNode;
var templateObject_1;
//# sourceMappingURL=emoji.js.map