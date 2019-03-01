import { toggleColor } from './toggle-color';
import { removeColor } from './remove-color';
import { pluginKey } from '../pm-plugins/main';
export var changeColor = function (color) { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    if (textColor) {
        var pluginState = pluginKey.getState(state);
        if (pluginState.disabled) {
            return false;
        }
        if (color === pluginState.defaultColor) {
            removeColor()(state, dispatch);
            return true;
        }
        toggleColor(color)(state, dispatch);
        return true;
    }
    return false;
}; };
//# sourceMappingURL=change-color.js.map