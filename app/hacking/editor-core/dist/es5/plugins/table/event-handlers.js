"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_tables_1 = require("prosemirror-tables");
var editor_common_1 = require("@atlaskit/editor-common");
var utils_1 = require("../../utils/");
var utils_2 = require("./utils");
var actions_1 = require("./actions");
exports.handleBlur = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    // fix for issue ED-4665
    if (editor_common_1.browser.ie_version !== 11) {
        actions_1.setEditorFocus(false)(state, dispatch);
    }
    event.preventDefault();
    return false;
};
exports.handleFocus = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    actions_1.setEditorFocus(true)(state, dispatch);
    event.preventDefault();
    return false;
};
exports.handleClick = function (view, event) {
    var element = event.target;
    var table = prosemirror_utils_1.findTable(view.state.selection);
    /**
     * Check if the table cell with an image is clicked
     * and its not the image itself
     */
    var matches = element.matches ? 'matches' : 'msMatchesSelector';
    if (!table ||
        !utils_1.isElementInTableCell(element) ||
        element[matches]('table .image, table p, table .image div')) {
        return false;
    }
    var map = prosemirror_tables_1.TableMap.get(table.node);
    /** Getting the offset of current item clicked */
    var colElement = (utils_1.closestElement(element, 'td') ||
        utils_1.closestElement(element, 'th'));
    var colIndex = colElement && colElement.cellIndex;
    var rowElement = utils_1.closestElement(element, 'tr');
    var rowIndex = rowElement && rowElement.rowIndex;
    var cellIndex = map.width * rowIndex + colIndex;
    var posInTable = map.map[cellIndex + 1];
    var dispatch = view.dispatch, _a = view.state, tr = _a.tr, paragraph = _a.schema.nodes.paragraph;
    var editorElement = table.node.nodeAt(map.map[cellIndex]);
    /** Only if the last item is media group, insert a paragraph */
    if (utils_1.isLastItemMediaGroup(editorElement)) {
        tr.insert(posInTable + table.pos, paragraph.create());
        dispatch(tr);
        utils_1.setNodeSelection(view, posInTable + table.pos);
    }
    return true;
};
exports.handleMouseOver = function (view, mouseEvent) {
    var state = view.state, dispatch = view.dispatch;
    var target = mouseEvent.target;
    if (utils_2.isInsertColumnButton(target)) {
        return actions_1.showInsertColumnButton(utils_2.getIndex(target))(state, dispatch);
    }
    if (utils_2.isInsertRowButton(target)) {
        return actions_1.showInsertRowButton(utils_2.getIndex(target))(state, dispatch);
    }
    if (actions_1.hideInsertColumnOrRowButton(state, dispatch)) {
        return true;
    }
    return false;
};
exports.handleMouseLeave = function (view) {
    var state = view.state, dispatch = view.dispatch;
    if (actions_1.hideInsertColumnOrRowButton(state, dispatch)) {
        return true;
    }
    return false;
};
function handleTripleClick(view, pos) {
    var state = view.state, dispatch = view.dispatch;
    var $cellPos = prosemirror_tables_1.cellAround(state.doc.resolve(pos));
    if (!$cellPos) {
        return false;
    }
    var cell = state.doc.nodeAt($cellPos.pos);
    if (cell) {
        var selFrom = prosemirror_state_1.Selection.findFrom($cellPos, 1, true);
        var selTo = prosemirror_state_1.Selection.findFrom(state.doc.resolve($cellPos.pos + cell.nodeSize), -1, true);
        if (selFrom && selTo) {
            dispatch(state.tr.setSelection(new prosemirror_state_1.TextSelection(selFrom.$from, selTo.$to)));
            return true;
        }
    }
    return false;
}
exports.handleTripleClick = handleTripleClick;
exports.handleMouseDown = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    // shift-selecting table rows/columns
    if (actions_1.handleShiftSelection(event)(state, dispatch)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=event-handlers.js.map