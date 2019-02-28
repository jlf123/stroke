"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
function insertTypeAheadQuery(trigger) {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(prosemirror_utils_1.safeInsert(state.schema.text(trigger, [
                state.schema.marks.typeAheadQuery.create({ trigger: trigger }),
            ]))(state.tr));
        }
        return true;
    };
}
exports.insertTypeAheadQuery = insertTypeAheadQuery;
//# sourceMappingURL=insert-query.js.map