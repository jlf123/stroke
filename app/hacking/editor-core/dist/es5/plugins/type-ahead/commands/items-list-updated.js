"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../pm-plugins/main");
exports.itemsListUpdated = function (items) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.ITEMS_LIST_UPDATED,
            items: items,
        }));
    }
    return true;
}; };
//# sourceMappingURL=items-list-updated.js.map