"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_query_mark_1 = require("../utils/find-query-mark");
var analytics_1 = require("../../../analytics");
var main_1 = require("../pm-plugins/main");
exports.dismissCommand = function () { return function (state, dispatch) {
    var queryMark = find_query_mark_1.findTypeAheadQuery(state);
    if (queryMark === null) {
        return false;
    }
    var start = queryMark.start, end = queryMark.end;
    var schema = state.schema;
    var markType = schema.marks.typeAheadQuery;
    if (start === -1) {
        return false;
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.typeahead.dismiss');
    var typeAheadHandler = main_1.pluginKey.getState(state).typeAheadHandler;
    if (typeAheadHandler && typeAheadHandler.dismiss) {
        typeAheadHandler.dismiss(state);
    }
    if (dispatch) {
        dispatch(state.tr.removeMark(start, end, markType).removeStoredMark(markType));
    }
    return true;
}; };
//# sourceMappingURL=dismiss.js.map