"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../pm-plugins/main");
exports.setCurrentIndex = function (currentIndex) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.SET_CURRENT_INDEX,
            params: { currentIndex: currentIndex },
        }));
    }
    return true;
}; };
//# sourceMappingURL=set-current-index.js.map