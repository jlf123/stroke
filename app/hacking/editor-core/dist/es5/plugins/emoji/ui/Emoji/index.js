"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var emoji_1 = require("@atlaskit/emoji");
var editor_common_1 = require("@atlaskit/editor-common");
var EmojiNode = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiNode, _super);
    function EmojiNode(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, allowTextFallback = _a.allowTextFallback, shortName = _a.shortName, id = _a.id, fallback = _a.fallback, fitToHeight = _a.fitToHeight;
            if (allowTextFallback && !providers.emojiProvider) {
                return React.createElement("span", null, fallback || shortName);
            }
            return (React.createElement(emoji_1.ResourcedEmoji, { emojiId: { id: id, fallback: fallback, shortName: shortName }, emojiProvider: providers.emojiProvider, showTooltip: true, fitToHeight: fitToHeight }));
        };
        _this.providerFactory = props.providers || new editor_common_1.ProviderFactory();
        return _this;
    }
    EmojiNode.prototype.componentWillUnmount = function () {
        if (!this.props.providers) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    EmojiNode.prototype.render = function () {
        return (React.createElement(editor_common_1.WithProviders, { providers: ['emojiProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return EmojiNode;
}(react_1.PureComponent));
exports.default = EmojiNode;
//# sourceMappingURL=index.js.map