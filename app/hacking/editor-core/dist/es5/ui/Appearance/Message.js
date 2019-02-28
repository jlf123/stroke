"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var PluginSlot_1 = require("../PluginSlot");
var WithPluginState_1 = require("../WithPluginState");
var ContentStyles_1 = require("../ContentStyles");
var utils_1 = require("../../utils");
var max_content_size_1 = require("../../plugins/max-content-size");
var is_multiline_content_1 = require("../../plugins/is-multiline-content");
var Addon_1 = require("../Addon");
var styles_1 = require("../styles");
var WithFlash_1 = require("../WithFlash");
var MessageEditor = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  border: 1px solid\n    ", ";\n  border-radius: 3px;\n  height: auto;\n  min-height: 34px;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  border: 1px solid\n    ",
    ";\n  border-radius: 3px;\n  height: auto;\n  min-height: 34px;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"])), function (props) {
    return props.isMaxContentSizeReached ? '#FF8F73' : '#C1C7D0';
});
var ContentArea = styled_components_1.default(ContentStyles_1.default)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  line-height: 20px;\n  padding: 4px 16px 4px 8px;\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-width: inherit;\n  width: ", ";\n  max-height: ", ";\n\n  ", ";\n"], ["\n  line-height: 20px;\n  padding: 4px 16px 4px 8px;\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-width: inherit;\n  width: ", ";\n  max-height: ",
    ";\n\n  ", ";\n"])), function (props) { return (props.isMultiline ? '100%' : 'auto'); }, function (props) {
    return props.maxHeight ? props.maxHeight + 'px' : 'none';
}, styles_1.scrollbarStyles);
var ToolbarArea = styled_components_1.default(ContentStyles_1.default)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  width: ", ";\n"], ["\n  display: flex;\n  width: ", ";\n"])), function (props) { return (props.isMultiline ? '100%' : 'auto'); });
var SecondaryToolbarContainer = styled_components_1.default.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  padding: 2px 4px 0 0;\n  margin-bottom: -1px;\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: flex-end;\n  flex-shrink: 0;\n  display: flex;\n"], ["\n  padding: 2px 4px 0 0;\n  margin-bottom: -1px;\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: flex-end;\n  flex-shrink: 0;\n  display: flex;\n"])));
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'message';
        _this.focusEditor = function (e) {
            // Only focus for unhandled click events (e.g. so we don't focus on click events in pop ups)
            var target = e.target;
            var clickIsFromPopup = !!utils_1.closestElement(target, '[data-editor-popup]');
            if (_this.props.editorActions && !clickIsFromPopup) {
                _this.props.editorActions.focus();
            }
        };
        _this.renderChrome = function (_a) {
            var maxContentSize = _a.maxContentSize, isMultilineContent = _a.isMultilineContent;
            var _b = _this.props, disabled = _b.disabled, editorDOMElement = _b.editorDOMElement, editorView = _b.editorView, editorActions = _b.editorActions, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, contentComponents = _b.contentComponents, secondaryToolbarComponents = _b.secondaryToolbarComponents, customContentComponents = _b.customContentComponents, customSecondaryToolbarComponents = _b.customSecondaryToolbarComponents, addonToolbarComponents = _b.addonToolbarComponents, maxHeight = _b.maxHeight, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash_1.default, { animate: maxContentSizeReached },
                React.createElement(MessageEditor, { onClick: _this.focusEditor, isMaxContentSizeReached: maxContentSizeReached, className: "akEditor" },
                    React.createElement(ContentArea, { maxHeight: maxHeight, isMultiline: isMultilineContent, innerRef: function (ref) { return (_this.containerElement = ref); } },
                        customContentComponents,
                        React.createElement(PluginSlot_1.default, { disabled: !!disabled, editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement }),
                        editorDOMElement),
                    React.createElement(ToolbarArea, { isMultiline: isMultilineContent },
                        React.createElement(Addon_1.ClickAreaInline, { editorView: editorView }),
                        React.createElement(SecondaryToolbarContainer, null,
                            React.createElement(PluginSlot_1.default, { disabled: disabled || maxContentSizeReached, editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: secondaryToolbarComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement }),
                            customSecondaryToolbarComponents,
                            React.createElement(Addon_1.AddonToolbar, { dropdownItems: addonToolbarComponents, isReducedSpacing: true }))))));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        var _a = this.props, eventDispatcher = _a.eventDispatcher, editorView = _a.editorView;
        return (React.createElement(WithPluginState_1.default, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
                maxContentSize: max_content_size_1.pluginKey,
                isMultilineContent: is_multiline_content_1.pluginKey,
            }, render: this.renderChrome }));
    };
    Editor.displayName = 'MessageEditor';
    return Editor;
}(React.Component));
exports.default = Editor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Message.js.map