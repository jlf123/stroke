"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var InlineExtension_1 = require("./InlineExtension");
var Extension_1 = require("./Extension");
var utils_1 = require("../../../../utils");
var ExtensionComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExtensionComponent, _super);
    function ExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.mounted = false;
        _this.handleMacroProvider = function (macroProvider) {
            if (_this.mounted) {
                _this.setState({ macroProvider: macroProvider });
            }
        };
        _this.handleSelectExtension = function (hasBody) {
            var _a = _this.props.editorView, state = _a.state, _b = _a.state, selection = _b.selection, schema = _b.schema, dispatch = _a.dispatch;
            var tr = state.tr;
            if (hasBody) {
                tr = prosemirror_utils_1.selectParentNodeOfType([schema.nodes.bodiedExtension])(state.tr);
                dispatch(tr);
            }
            else if (!prosemirror_utils_1.findSelectedNodeOfType([
                schema.nodes.inlineExtension,
                schema.nodes.extension,
                schema.nodes.bodiedExtension,
            ])(selection)) {
                utils_1.setNodeSelection(_this.props.editorView, selection.$from.pos - 1);
            }
        };
        _this.handleExtension = function (node) {
            var _a = _this.props, extensionHandlers = _a.extensionHandlers, editorView = _a.editorView;
            var _b = node.attrs, extensionType = _b.extensionType, extensionKey = _b.extensionKey, parameters = _b.parameters;
            var isBodiedExtension = node.type.name === 'bodiedExtension';
            if (!extensionHandlers ||
                !extensionHandlers[extensionType] ||
                isBodiedExtension) {
                return;
            }
            return extensionHandlers[extensionType]({
                type: node.type.name,
                extensionType: extensionType,
                extensionKey: extensionKey,
                parameters: parameters,
                content: node.content,
            }, editorView.state.doc);
        };
        return _this;
    }
    ExtensionComponent.prototype.componentWillMount = function () {
        this.mounted = true;
    };
    ExtensionComponent.prototype.componentDidMount = function () {
        var macroProvider = this.props.macroProvider;
        if (macroProvider) {
            macroProvider.then(this.handleMacroProvider);
        }
    };
    ExtensionComponent.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    ExtensionComponent.prototype.componentWillReceiveProps = function (nextProps) {
        var macroProvider = nextProps.macroProvider;
        if (this.props.macroProvider !== macroProvider) {
            if (macroProvider) {
                macroProvider.then(this.handleMacroProvider);
            }
            else {
                this.setState({ macroProvider: macroProvider });
            }
        }
    };
    ExtensionComponent.prototype.render = function () {
        var macroProvider = this.state.macroProvider;
        var _a = this.props, node = _a.node, handleContentDOMRef = _a.handleContentDOMRef, editorView = _a.editorView;
        var extensionHandlerResult = this.tryExtensionHandler();
        switch (node.type.name) {
            case 'extension':
            case 'bodiedExtension':
                return (React.createElement(Extension_1.default, { node: node, macroProvider: macroProvider, handleContentDOMRef: handleContentDOMRef, onSelectExtension: this.handleSelectExtension, view: editorView }, extensionHandlerResult));
            case 'inlineExtension':
                return (React.createElement(InlineExtension_1.default, { node: node, macroProvider: macroProvider }, extensionHandlerResult));
            default:
                return null;
        }
    };
    ExtensionComponent.prototype.tryExtensionHandler = function () {
        var node = this.props.node;
        try {
            var extensionContent = this.handleExtension(node);
            if (extensionContent && React.isValidElement(extensionContent)) {
                return extensionContent;
            }
        }
        catch (e) {
            /* tslint:disable-next-line:no-console */
            console.error('Provided extension handler has thrown an error\n', e);
            /** We don't want this error to block renderer */
            /** We keep rendering the default content */
        }
        return null;
    };
    return ExtensionComponent;
}(react_1.Component));
exports.default = ExtensionComponent;
//# sourceMappingURL=ExtensionComponent.js.map