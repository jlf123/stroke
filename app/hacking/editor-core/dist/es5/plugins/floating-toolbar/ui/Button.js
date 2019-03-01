"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var tooltip_1 = require("@atlaskit/tooltip");
var button_1 = require("@atlaskit/button");
var theme_1 = require("@atlaskit/theme");
var styled_components_1 = require("styled-components");
var editor_common_1 = require("@atlaskit/editor-common");
var editorButtonTheme = {
    danger: {
        background: {
            default: theme_1.themed({ light: 'none' }),
            hover: theme_1.themed({ light: theme_1.colors.N30A }),
            active: theme_1.themed({ light: editor_common_1.hexToRgba(theme_1.colors.B75, 0.6) }),
            disabled: theme_1.themed({ light: 'none' }),
            selected: theme_1.themed({ light: theme_1.colors.N700 }),
            focusSelected: theme_1.themed({ light: theme_1.colors.N700 }),
        },
        color: {
            default: theme_1.themed({ light: theme_1.colors.N400 }),
            hover: theme_1.themed({ light: theme_1.colors.R300 }),
            active: theme_1.themed({ light: theme_1.colors.R300 }),
            disabled: theme_1.themed({ light: theme_1.colors.N70 }),
            selected: theme_1.themed({ light: theme_1.colors.N20 }),
            focusSelected: theme_1.themed({ light: theme_1.colors.N20 }),
        },
    },
};
var Button = styled_components_1.default(button_1.default)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding: 0 2px;\n"], ["\n  padding: 0 2px;\n"])));
exports.default = (function (_a) {
    var title = _a.title, icon = _a.icon, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, selected = _a.selected, disabled = _a.disabled, _b = _a.appearance, appearance = _b === void 0 ? 'subtle' : _b;
    var _c;
    return (React.createElement(tooltip_1.default, { content: title, hideTooltipOnClick: true, position: "top" },
        React.createElement(styled_components_1.ThemeProvider, { theme: (_c = {}, _c[button_1.themeNamespace] = editorButtonTheme, _c) },
            React.createElement("div", { onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                React.createElement(Button, { ariaLabel: title, spacing: "compact", appearance: appearance, ariaHaspopup: true, iconBefore: icon, onClick: onClick, isSelected: selected, isDisabled: disabled })))));
});
var templateObject_1;
//# sourceMappingURL=Button.js.map