"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var PluginSlot_1 = require("../PluginSlot");
var WithPluginState_1 = require("../WithPluginState");
var ContentStyles_1 = require("../ContentStyles");
var max_content_size_1 = require("../../plugins/max-content-size");
var styles_1 = require("../styles");
var WithFlash_1 = require("../WithFlash");
// tslint:disable-next-line:variable-name
var ChromelessEditor = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 20px;\n  height: auto;\n  min-height: 30px;\n  ", " overflow-x: hidden;\n  overflow-y: auto;\n  ", " max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"], ["\n  line-height: 20px;\n  height: auto;\n  min-height: 30px;\n  ",
    " overflow-x: hidden;\n  overflow-y: auto;\n  ", " max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"])), function (props) {
    return props.maxHeight
        ? 'max-height: ' + props.maxHeight + 'px;'
        : '';
}, styles_1.scrollbarStyles);
ChromelessEditor.displayName = 'ChromelessEditor';
// tslint:disable-next-line:variable-name
var ContentArea = styled_components_1.default(ContentStyles_1.default)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
ContentArea.displayName = 'ContentArea';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'chromeless';
        _this.renderChrome = function (_a) {
            var maxContentSize = _a.maxContentSize;
            var _b = _this.props, editorDOMElement = _b.editorDOMElement, editorView = _b.editorView, editorActions = _b.editorActions, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, contentComponents = _b.contentComponents, customContentComponents = _b.customContentComponents, maxHeight = _b.maxHeight, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement, disabled = _b.disabled;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash_1.default, { animate: maxContentSizeReached },
                React.createElement(ChromelessEditor, { maxHeight: maxHeight, innerRef: function (ref) { return (_this.containerElement = ref); } },
                    React.createElement(ContentArea, null,
                        customContentComponents,
                        React.createElement(PluginSlot_1.default, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement, disabled: !!disabled }),
                        editorDOMElement))));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        return (React.createElement(WithPluginState_1.default, { plugins: { maxContentSize: max_content_size_1.pluginKey }, render: this.renderChrome }));
    };
    Editor.displayName = 'ChromelessEditorAppearance';
    return Editor;
}(React.Component));
exports.default = Editor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Chromeless.js.map