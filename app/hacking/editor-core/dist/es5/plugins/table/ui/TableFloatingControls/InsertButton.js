"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_intl_1 = require("react-intl");
var editor_common_1 = require("@atlaskit/editor-common");
var types_1 = require("../../types");
var styles_1 = require("../styles");
var messages_1 = require("../messages");
var utils_1 = require("../../../../utils/");
var getInsertLineHeight = function (tableRef) {
    return tableRef.offsetHeight + styles_1.tableToolbarSize;
};
var getToolbarSize = function (tableRef) {
    var parent = utils_1.closestElement(tableRef, "." + types_1.TableCssClassName.TABLE_CONTAINER);
    if (parent) {
        return parent.querySelector("." + types_1.TableCssClassName.NUMBERED_COLUMN)
            ? styles_1.tableToolbarSize + editor_common_1.akEditorTableNumberColumnWidth - 1
            : styles_1.tableToolbarSize;
    }
    return styles_1.tableToolbarSize;
};
var getInsertLineWidth = function (tableRef) {
    var parentElement = tableRef.parentElement, offsetWidth = tableRef.offsetWidth;
    var parentOffsetWidth = parentElement.offsetWidth;
    var scrollLeft = parentElement.scrollLeft;
    var diff = offsetWidth - parentOffsetWidth;
    var toolbarSize = getToolbarSize(tableRef);
    return Math.min(offsetWidth + toolbarSize, parentOffsetWidth + toolbarSize - Math.max(scrollLeft - diff, 0));
};
var InsertButton = function (_a) {
    var onMouseDown = _a.onMouseDown, index = _a.index, tableRef = _a.tableRef, showInsertButton = _a.showInsertButton, type = _a.type, formatMessage = _a.intl.formatMessage;
    return (React.createElement("div", { "data-index": index, className: types_1.TableCssClassName.CONTROLS_INSERT_BUTTON_WRAP + " " + (type === 'row'
            ? types_1.TableCssClassName.CONTROLS_INSERT_ROW
            : types_1.TableCssClassName.CONTROLS_INSERT_COLUMN) },
        showInsertButton && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_INSERT_BUTTON_INNER },
                React.createElement("button", { type: "button", title: formatMessage(type === 'row'
                        ? messages_1.default.insertRow
                        : messages_1.default.insertColumn), className: types_1.TableCssClassName.CONTROLS_INSERT_BUTTON, onMouseDown: onMouseDown },
                    React.createElement("svg", { className: types_1.TableCssClassName.CONTROLS_BUTTON_ICON },
                        React.createElement("path", { d: "M10 4a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1z", fill: "currentColor", fillRule: "evenodd" })))),
            React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_INSERT_LINE, style: type === 'row'
                    ? { width: getInsertLineWidth(tableRef) }
                    : { height: getInsertLineHeight(tableRef) } }))),
        React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_INSERT_MARKER })));
};
exports.default = react_intl_1.injectIntl(InsertButton);
//# sourceMappingURL=InsertButton.js.map