"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var WithPluginState_1 = require("../../ui/WithPluginState");
var main_1 = require("./pm-plugins/main");
exports.textColorPluginKey = main_1.pluginKey;
var ToolbarTextColor_1 = require("./ui/ToolbarTextColor");
var change_color_1 = require("./commands/change-color");
var pluginConfig = function (textColorConfig) {
    if (!textColorConfig || typeof textColorConfig === 'boolean') {
        return undefined;
    }
    return textColorConfig;
};
var textColorPlugin = {
    name: 'textColor',
    marks: function () {
        return [{ name: 'textColor', mark: adf_schema_1.textColor }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'textColor',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return main_1.createPlugin(dispatch, pluginConfig(props.allowTextColor));
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                textColor: main_1.pluginKey,
            }, render: function (_a) {
                var textColor = _a.textColor;
                return (React.createElement(ToolbarTextColor_1.default, { pluginState: textColor, isReducedSpacing: isToolbarReducedSpacing, changeColor: function (color) {
                        return change_color_1.changeColor(color)(editorView.state, editorView.dispatch);
                    }, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
            } }));
    },
};
exports.default = textColorPlugin;
//# sourceMappingURL=index.js.map