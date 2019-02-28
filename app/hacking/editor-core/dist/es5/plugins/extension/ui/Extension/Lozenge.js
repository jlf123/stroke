"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var file_1 = require("@atlaskit/icon/glyph/editor/file");
var editor_common_1 = require("@atlaskit/editor-common");
var styles_1 = require("./styles");
exports.capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.ICON_SIZE = 24;
var ExtensionLozenge = /** @class */ (function (_super) {
    tslib_1.__extends(ExtensionLozenge, _super);
    function ExtensionLozenge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionLozenge.prototype.render = function () {
        var node = this.props.node;
        var imageData = editor_common_1.getExtensionLozengeData({ node: node, type: 'image' });
        if (imageData) {
            return this.renderImage(imageData);
        }
        var iconData = editor_common_1.getExtensionLozengeData({ node: node, type: 'icon' });
        return this.renderFallback(iconData);
    };
    ExtensionLozenge.prototype.renderImage = function (lozengeData) {
        var extensionKey = this.props.node.attrs.extensionKey;
        var url = lozengeData.url, rest = tslib_1.__rest(lozengeData, ["url"]);
        return React.createElement("img", tslib_1.__assign({ src: url }, rest, { alt: extensionKey }));
    };
    ExtensionLozenge.prototype.renderFallback = function (lozengeData) {
        var _a = this.props.node.attrs, parameters = _a.parameters, extensionKey = _a.extensionKey;
        var params = parameters && parameters.macroParams;
        var title = (parameters && parameters.extensionTitle) || extensionKey;
        return (React.createElement(styles_1.PlaceholderFallback, null,
            lozengeData ? (this.renderImage(tslib_1.__assign({ height: exports.ICON_SIZE, width: exports.ICON_SIZE }, lozengeData))) : (React.createElement(file_1.default, { label: title })),
            React.createElement("span", { className: "extension-title" }, exports.capitalizeFirstLetter(title)),
            params && (React.createElement(styles_1.PlaceholderFallbackParams, null, Object.keys(params).map(function (key) { return key && " | " + key + " = " + params[key].value; })))));
    };
    return ExtensionLozenge;
}(react_1.Component));
exports.default = ExtensionLozenge;
//# sourceMappingURL=Lozenge.js.map