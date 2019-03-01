"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var ExtensionComponent_1 = require("./ExtensionComponent");
var Extension = /** @class */ (function (_super) {
    tslib_1.__extends(Extension, _super);
    function Extension(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, node = _a.node, editorView = _a.editorView, handleContentDOMRef = _a.handleContentDOMRef, extensionHandlers = _a.extensionHandlers;
            var macroProvider = providers.macroProvider;
            return (React.createElement(ExtensionComponent_1.default, { editorView: editorView, node: node, macroProvider: macroProvider, handleContentDOMRef: handleContentDOMRef, extensionHandlers: extensionHandlers }));
        };
        _this.providerFactory = props.providerFactory || new editor_common_1.ProviderFactory();
        return _this;
    }
    Extension.prototype.componentWillUnmount = function () {
        if (!this.props.providerFactory) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    Extension.prototype.render = function () {
        return (React.createElement(editor_common_1.WithProviders, { providers: ['macroProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return Extension;
}(react_1.Component));
exports.default = Extension;
//# sourceMappingURL=index.js.map