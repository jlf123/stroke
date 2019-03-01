"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var button_1 = require("@atlaskit/button");
var theme_1 = require("@atlaskit/theme");
var Toolbar_1 = require("../Toolbar");
var PluginSlot_1 = require("../PluginSlot");
var WithPluginState_1 = require("../WithPluginState");
var ContentStyles_1 = require("../ContentStyles");
var max_content_size_1 = require("../../plugins/max-content-size");
var main_1 = require("../../plugins/media/pm-plugins/main");
var Addon_1 = require("../Addon");
var styles_1 = require("../../plugins/table/ui/styles");
var WithFlash_1 = require("../WithFlash");
var editor_common_1 = require("@atlaskit/editor-common");
var WidthEmitter_1 = require("../WidthEmitter");
var grid_1 = require("../../plugins/grid");
var classnames = require("classnames");
var CommentEditorMargin = 14;
var CommentEditorSmallerMargin = 8;
// tslint:disable-next-line:variable-name
var CommentEditor = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n\n  .less-margin .ProseMirror {\n    margin: 12px ", "px ", "px;\n  }\n\n  min-width: 272px;\n  /* Border + Toolbar + Footer + (Paragraph + ((Parahraph + Margin) * (DefaultLines - 1)) */\n  /* calc(2px + 40px + 24px + ( 20px + (32px * 2))) */\n  min-height: 150px;\n  height: auto;\n  ", " background-color: white;\n  border: 1px solid ", ";\n  box-sizing: border-box;\n  border-radius: ", "px;\n\n  max-width: inherit;\n  word-wrap: break-word;\n"], ["\n  display: flex;\n  flex-direction: column;\n\n  .less-margin .ProseMirror {\n    margin: 12px ", "px ", "px;\n  }\n\n  min-width: 272px;\n  /* Border + Toolbar + Footer + (Paragraph + ((Parahraph + Margin) * (DefaultLines - 1)) */\n  /* calc(2px + 40px + 24px + ( 20px + (32px * 2))) */\n  min-height: 150px;\n  height: auto;\n  ",
    " background-color: white;\n  border: 1px solid ", ";\n  box-sizing: border-box;\n  border-radius: ", "px;\n\n  max-width: inherit;\n  word-wrap: break-word;\n"])), CommentEditorSmallerMargin, CommentEditorSmallerMargin, function (props) {
    return props.maxHeight
        ? 'max-height: ' + props.maxHeight + 'px;'
        : '';
}, theme_1.colors.N40, theme_1.borderRadius());
CommentEditor.displayName = 'CommentEditor';
var TableControlsPadding = 16;
// tslint:disable-next-line:variable-name
var MainToolbar = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  align-items: center;\n  padding: ", "px ", "px 0;\n  display: flex;\n  height: auto;\n\n  padding-left: ", "px;\n\n  & > div > *:first-child {\n    margin-left: 0;\n  }\n\n  .block-type-btn {\n    padding-left: 0;\n  }\n"], ["\n  position: relative;\n  align-items: center;\n  padding: ", "px ", "px 0;\n  display: flex;\n  height: auto;\n\n  padding-left: ", "px;\n\n  & > div > *:first-child {\n    margin-left: 0;\n  }\n\n  .block-type-btn {\n    padding-left: 0;\n  }\n"])), theme_1.gridSize(), theme_1.gridSize(), TableControlsPadding);
MainToolbar.displayName = 'MainToolbar';
// tslint:disable-next-line:variable-name
var MainToolbarCustomComponentsSlot = styled_components_1.default.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-grow: 1;\n  padding-right: ", "px;\n  > div {\n    display: flex;\n    flex-shrink: 0;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-grow: 1;\n  padding-right: ", "px;\n  > div {\n    display: flex;\n    flex-shrink: 0;\n  }\n"])), TableControlsPadding);
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';
// tslint:disable-next-line:variable-name
var ContentArea = styled_components_1.default(ContentStyles_1.default)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  line-height: 24px;\n\n  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/\n  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/\n  .ProseMirror {\n    margin: 12px ", "px ", "px;\n  }\n\n  .gridParent {\n    margin-left: ", "px;\n    margin-right: ", "px;\n    width: calc(100% + ", "px);\n  }\n\n  padding: ", "px;\n\n  ", ";\n"], ["\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  line-height: 24px;\n\n  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/\n  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/\n  .ProseMirror {\n    margin: 12px ", "px ", "px;\n  }\n\n  .gridParent {\n    margin-left: ", "px;\n    margin-right: ", "px;\n    width: calc(100% + ", "px);\n  }\n\n  padding: ", "px;\n\n  ", ";\n"])), CommentEditorMargin, CommentEditorMargin, CommentEditorMargin - grid_1.GRID_GUTTER, CommentEditorMargin - grid_1.GRID_GUTTER, CommentEditorMargin - grid_1.GRID_GUTTER, TableControlsPadding, styles_1.tableCommentEditorStyles);
ContentArea.displayName = 'ContentArea';
// tslint:disable-next-line:variable-name
var SecondaryToolbar = styled_components_1.default.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: center;\n  display: flex;\n  padding: 12px 1px;\n"], ["\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: center;\n  display: flex;\n  padding: 12px 1px;\n"])));
SecondaryToolbar.displayName = 'SecondaryToolbar';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'comment';
        _this.handleSave = function () {
            if (_this.props.editorView && _this.props.onSave) {
                _this.props.onSave(_this.props.editorView);
            }
        };
        _this.handleCancel = function () {
            if (_this.props.editorView && _this.props.onCancel) {
                _this.props.onCancel(_this.props.editorView);
            }
        };
        _this.renderChrome = function (_a) {
            var maxContentSize = _a.maxContentSize, mediaState = _a.mediaState;
            var _b = _this.props, editorDOMElement = _b.editorDOMElement, editorView = _b.editorView, editorActions = _b.editorActions, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, contentComponents = _b.contentComponents, customContentComponents = _b.customContentComponents, customPrimaryToolbarComponents = _b.customPrimaryToolbarComponents, primaryToolbarComponents = _b.primaryToolbarComponents, customSecondaryToolbarComponents = _b.customSecondaryToolbarComponents, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement, maxHeight = _b.maxHeight, onSave = _b.onSave, onCancel = _b.onCancel, disabled = _b.disabled;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash_1.default, { animate: maxContentSizeReached },
                React.createElement(CommentEditor, { maxHeight: maxHeight, className: "akEditor" },
                    React.createElement(MainToolbar, null,
                        React.createElement(Toolbar_1.default, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: primaryToolbarComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, disabled: !!disabled }),
                        React.createElement(MainToolbarCustomComponentsSlot, null, customPrimaryToolbarComponents)),
                    React.createElement(Addon_1.ClickAreaBlock, { editorView: editorView },
                        React.createElement(editor_common_1.WidthConsumer, null, function (_a) {
                            var width = _a.width;
                            return (React.createElement(ContentArea, { innerRef: function (ref) { return (_this.containerElement = ref); }, className: classnames('ak-editor-content-area', {
                                    'less-margin': width < editor_common_1.akEditorMobileBreakoutPoint,
                                }) },
                                customContentComponents,
                                React.createElement(PluginSlot_1.default, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement, disabled: !!disabled }),
                                editorDOMElement));
                        })),
                    React.createElement(WidthEmitter_1.default, { editorView: editorView, contentArea: _this.containerElement })),
                React.createElement(SecondaryToolbar, null,
                    React.createElement(button_1.ButtonGroup, null,
                        !!onSave && (React.createElement(button_1.default, { appearance: "primary", onClick: _this.handleSave, isDisabled: disabled || (mediaState && !mediaState.allUploadsFinished) }, "Save")),
                        !!onCancel && (React.createElement(button_1.default, { appearance: "subtle", onClick: _this.handleCancel, isDisabled: disabled }, "Cancel"))),
                    React.createElement("span", { style: { flexGrow: 1 } }),
                    customSecondaryToolbarComponents)));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        return (React.createElement(WithPluginState_1.default, { plugins: {
                maxContentSize: max_content_size_1.pluginKey,
                mediaState: main_1.stateKey,
            }, render: this.renderChrome }));
    };
    Editor.displayName = 'CommentEditorAppearance';
    return Editor;
}(React.Component));
exports.default = Editor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Comment.js.map