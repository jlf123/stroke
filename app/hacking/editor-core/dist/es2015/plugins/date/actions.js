import { NodeSelection, Selection, } from 'prosemirror-state';
import { pluginKey } from './plugin';
export var insertDate = function (date) { return function (state, dispatch) {
    var schema = state.schema;
    var timestamp;
    if (date) {
        timestamp = Date.UTC(date.year, date.month - 1, date.day).toString();
    }
    else {
        var currentDate = new Date();
        timestamp = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toString();
    }
    var tr = state.tr;
    var showDatePickerAt = pluginKey.getState(state).showDatePickerAt;
    if (!showDatePickerAt) {
        var dateNode = schema.nodes.date.createChecked({ timestamp: timestamp });
        dispatch(tr.replaceSelectionWith(dateNode).scrollIntoView());
        return true;
    }
    if (state.doc.nodeAt(showDatePickerAt)) {
        dispatch(tr
            .setNodeMarkup(showDatePickerAt, schema.nodes.date, {
            timestamp: timestamp,
        })
            .setSelection(Selection.near(tr.doc.resolve(showDatePickerAt + 2)))
            .setMeta(pluginKey, { showDatePickerAt: null })
            .scrollIntoView());
        return true;
    }
    return false;
}; };
export var setDatePickerAt = function (showDatePickerAt) { return function (state, dispatch) {
    dispatch(state.tr.setMeta(pluginKey, { showDatePickerAt: showDatePickerAt }));
    return true;
}; };
export var closeDatePicker = function () { return function (state, dispatch) {
    var showDatePickerAt = pluginKey.getState(state).showDatePickerAt;
    if (!showDatePickerAt) {
        return false;
    }
    dispatch(state.tr
        .setMeta(pluginKey, { showDatePickerAt: null })
        .setSelection(Selection.near(state.tr.doc.resolve(showDatePickerAt + 2))));
}; };
export var openDatePicker = function (domAtPos) { return function (state, dispatch) {
    var $from = state.selection.$from;
    var start = $from.parent.childAfter($from.parentOffset).offset +
        $from.start($from.depth);
    var parent = domAtPos(start).node;
    if (parent && parent.childNodes.length) {
        var index = $from.index($from.depth);
        var element = parent.childNodes[index - 1];
        if (element) {
            var showDatePickerAt = $from.pos - 1;
            dispatch(state.tr
                .setMeta(pluginKey, { showDatePickerAt: showDatePickerAt })
                .setSelection(NodeSelection.create(state.doc, showDatePickerAt)));
        }
    }
    return false;
}; };
//# sourceMappingURL=actions.js.map