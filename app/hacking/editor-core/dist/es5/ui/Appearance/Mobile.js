"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var PluginSlot_1 = require("../PluginSlot");
var WithPluginState_1 = require("../WithPluginState");
var ContentStyles_1 = require("../ContentStyles");
var max_content_size_1 = require("../../plugins/max-content-size");
var mentions_1 = require("../../plugins/mentions");
var WithFlash_1 = require("../WithFlash");
// tslint:disable-next-line:variable-name
var MobileEditor = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 100%;\n  min-height: 30px;\n  width: 100%;\n  max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"], ["\n  height: 100%;\n  min-height: 30px;\n  width: 100%;\n  max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"])));
MobileEditor.displayName = 'MobileEditor';
// tslint:disable-next-line:variable-name
var ContentArea = styled_components_1.default(ContentStyles_1.default)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  height: 100%;\n\n  .ProseMirror {\n    /** Make it full page minus the padding */\n    min-height: calc(100vh - 40px);\n  }\n"], ["\n  height: 100%;\n\n  .ProseMirror {\n    /** Make it full page minus the padding */\n    min-height: calc(100vh - 40px);\n  }\n"])));
ContentArea.displayName = 'ContentArea';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'mobile';
        _this.handleRef = function (ref) {
            _this.containerElement = ref;
            if (_this.props.onUiReady) {
                _this.props.onUiReady(ref);
            }
        };
        _this.renderMobile = function (_a) {
            var maxContentSize = _a.maxContentSize, mentions = _a.mentions;
            var _b = _this.props, editorView = _b.editorView, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, customContentComponents = _b.customContentComponents, maxHeight = _b.maxHeight, disabled = _b.disabled, editorDOMElement = _b.editorDOMElement;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash_1.default, { animate: maxContentSizeReached },
                React.createElement(MobileEditor, { isMaxContentSizeReached: maxContentSizeReached, maxHeight: maxHeight },
                    React.createElement(ContentArea, { innerRef: _this.handleRef },
                        customContentComponents,
                        React.createElement(PluginSlot_1.default, { editorView: editorView, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, containerElement: _this.containerElement, disabled: !!disabled }),
                        editorDOMElement))));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        var _a = this.props, eventDispatcher = _a.eventDispatcher, editorView = _a.editorView;
        return (React.createElement(WithPluginState_1.default, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
                maxContentSize: max_content_size_1.pluginKey,
                mentions: mentions_1.mentionPluginKey,
            }, render: this.renderMobile }));
    };
    Editor.displayName = 'MobileEditor';
    return Editor;
}(React.Component));
exports.default = Editor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Mobile.js.map