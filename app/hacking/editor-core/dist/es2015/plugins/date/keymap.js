import { keymap } from 'prosemirror-keymap';
import { closeDatePicker } from './actions';
import * as keymaps from '../../keymaps';
import { pluginKey } from './plugin';
export function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var datePlugin = pluginKey.getState(state);
        if (!datePlugin.showDatePickerAt) {
            return false;
        }
        closeDatePicker()(state, dispatch);
        return true;
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map