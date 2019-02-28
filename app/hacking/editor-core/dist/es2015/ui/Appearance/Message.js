import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import PluginSlot from '../PluginSlot';
import WithPluginState from '../WithPluginState';
import ContentStyles from '../ContentStyles';
import { closestElement } from '../../utils';
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size';
import { pluginKey as isMultilineContentPluginKey } from '../../plugins/is-multiline-content';
import { AddonToolbar, ClickAreaInline } from '../Addon';
import { scrollbarStyles } from '../styles';
import WithFlash from '../WithFlash';
var MessageEditor = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  border: 1px solid\n    ", ";\n  border-radius: 3px;\n  height: auto;\n  min-height: 34px;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  border: 1px solid\n    ",
    ";\n  border-radius: 3px;\n  height: auto;\n  min-height: 34px;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"])), function (props) {
    return props.isMaxContentSizeReached ? '#FF8F73' : '#C1C7D0';
});
var ContentArea = styled(ContentStyles)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  line-height: 20px;\n  padding: 4px 16px 4px 8px;\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-width: inherit;\n  width: ", ";\n  max-height: ", ";\n\n  ", ";\n"], ["\n  line-height: 20px;\n  padding: 4px 16px 4px 8px;\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-width: inherit;\n  width: ", ";\n  max-height: ",
    ";\n\n  ", ";\n"])), function (props) { return (props.isMultiline ? '100%' : 'auto'); }, function (props) {
    return props.maxHeight ? props.maxHeight + 'px' : 'none';
}, scrollbarStyles);
var ToolbarArea = styled(ContentStyles)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  width: ", ";\n"], ["\n  display: flex;\n  width: ", ";\n"])), function (props) { return (props.isMultiline ? '100%' : 'auto'); });
var SecondaryToolbarContainer = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  padding: 2px 4px 0 0;\n  margin-bottom: -1px;\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: flex-end;\n  flex-shrink: 0;\n  display: flex;\n"], ["\n  padding: 2px 4px 0 0;\n  margin-bottom: -1px;\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: flex-end;\n  flex-shrink: 0;\n  display: flex;\n"])));
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'message';
        _this.focusEditor = function (e) {
            // Only focus for unhandled click events (e.g. so we don't focus on click events in pop ups)
            var target = e.target;
            var clickIsFromPopup = !!closestElement(target, '[data-editor-popup]');
            if (_this.props.editorActions && !clickIsFromPopup) {
                _this.props.editorActions.focus();
            }
        };
        _this.renderChrome = function (_a) {
            var maxContentSize = _a.maxContentSize, isMultilineContent = _a.isMultilineContent;
            var _b = _this.props, disabled = _b.disabled, editorDOMElement = _b.editorDOMElement, editorView = _b.editorView, editorActions = _b.editorActions, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, contentComponents = _b.contentComponents, secondaryToolbarComponents = _b.secondaryToolbarComponents, customContentComponents = _b.customContentComponents, customSecondaryToolbarComponents = _b.customSecondaryToolbarComponents, addonToolbarComponents = _b.addonToolbarComponents, maxHeight = _b.maxHeight, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash, { animate: maxContentSizeReached },
                React.createElement(MessageEditor, { onClick: _this.focusEditor, isMaxContentSizeReached: maxContentSizeReached, className: "akEditor" },
                    React.createElement(ContentArea, { maxHeight: maxHeight, isMultiline: isMultilineContent, innerRef: function (ref) { return (_this.containerElement = ref); } },
                        customContentComponents,
                        React.createElement(PluginSlot, { disabled: !!disabled, editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement }),
                        editorDOMElement),
                    React.createElement(ToolbarArea, { isMultiline: isMultilineContent },
                        React.createElement(ClickAreaInline, { editorView: editorView }),
                        React.createElement(SecondaryToolbarContainer, null,
                            React.createElement(PluginSlot, { disabled: disabled || maxContentSizeReached, editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: secondaryToolbarComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement }),
                            customSecondaryToolbarComponents,
                            React.createElement(AddonToolbar, { dropdownItems: addonToolbarComponents, isReducedSpacing: true }))))));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        var _a = this.props, eventDispatcher = _a.eventDispatcher, editorView = _a.editorView;
        return (React.createElement(WithPluginState, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
                maxContentSize: maxContentSizePluginKey,
                isMultilineContent: isMultilineContentPluginKey,
            }, render: this.renderChrome }));
    };
    Editor.displayName = 'MessageEditor';
    return Editor;
}(React.Component));
export default Editor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Message.js.map