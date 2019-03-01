"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var React = require("react");
var styled_components_1 = require("styled-components");
var item_1 = require("@atlaskit/item");
var theme_1 = require("@atlaskit/theme");
var itemTheme = (_a = {},
    _a[item_1.itemThemeNamespace] = {
        padding: {
            default: {
                bottom: 12,
                left: 12,
                right: 12,
                top: 12,
            },
        },
        beforeItemSpacing: {
            default: function () { return 12; },
        },
        borderRadius: function () { return 0; },
        hover: {
            background: theme_1.colors.transparent,
            text: theme_1.colors.text,
            secondaryText: theme_1.colors.N200,
        },
        selected: {
            background: theme_1.themed({ light: theme_1.colors.N20, dark: theme_1.colors.DN70 }),
            text: theme_1.themed({ light: theme_1.colors.N800, dark: theme_1.colors.DN600 }),
            secondaryText: theme_1.themed({ light: theme_1.colors.N200, dark: theme_1.colors.DN300 }),
        },
    },
    _a);
function scrollIntoViewIfNeeded(element) {
    var offsetTop = element.offsetTop, offsetHeight = element.offsetHeight, offsetParent = element.offsetParent;
    var _a = offsetParent, offsetParentHeight = _a.offsetHeight, scrollTop = _a.scrollTop;
    var direction = offsetTop + offsetHeight > offsetParentHeight + scrollTop
        ? 1
        : scrollTop > offsetTop
            ? -1
            : 0;
    if (direction !== 0 && offsetParent) {
        offsetParent.scrollTop =
            direction === 1
                ? offsetTop + offsetHeight - offsetParentHeight
                : offsetTop;
    }
}
exports.scrollIntoViewIfNeeded = scrollIntoViewIfNeeded;
function TypeAheadItemsList(_a) {
    var items = _a.items, currentIndex = _a.currentIndex, insertByIndex = _a.insertByIndex, setCurrentIndex = _a.setCurrentIndex;
    if (!Array.isArray(items)) {
        return null;
    }
    return (React.createElement(styled_components_1.ThemeProvider, { theme: itemTheme },
        React.createElement(item_1.ItemGroup, null, items.map(function (item, index) {
            return item.render ? (React.createElement("div", { key: item.title, ref: index === currentIndex
                    ? function (ref) { return ref && scrollIntoViewIfNeeded(ref); }
                    : function () { return null; } }, item.render({
                onClick: function () { return insertByIndex(index); },
                onMouseMove: function () { return setCurrentIndex(index); },
                isSelected: index === currentIndex,
            }))) : (React.createElement(item_1.default, { key: item.title, onClick: function () { return insertByIndex(index); }, onMouseMove: function () { return setCurrentIndex(index); }, elemBefore: item.icon ? item.icon() : null, isSelected: index === currentIndex, ref: index === currentIndex
                    ? function (ref) { return ref && scrollIntoViewIfNeeded(ref.ref); }
                    : null }, item.title));
        }))));
}
exports.TypeAheadItemsList = TypeAheadItemsList;
//# sourceMappingURL=TypeAheadItemsList.js.map