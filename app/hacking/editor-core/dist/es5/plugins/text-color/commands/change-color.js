"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggle_color_1 = require("./toggle-color");
var remove_color_1 = require("./remove-color");
var main_1 = require("../pm-plugins/main");
exports.changeColor = function (color) { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    if (textColor) {
        var pluginState = main_1.pluginKey.getState(state);
        if (pluginState.disabled) {
            return false;
        }
        if (color === pluginState.defaultColor) {
            remove_color_1.removeColor()(state, dispatch);
            return true;
        }
        toggle_color_1.toggleColor(color)(state, dispatch);
        return true;
    }
    return false;
}; };
//# sourceMappingURL=change-color.js.map