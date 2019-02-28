import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import * as commands from '../../../commands';
import { trackAndInvoke } from '../../../analytics';
export function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.insertRule.common, trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', commands.insertRule()), list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        return true;
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map