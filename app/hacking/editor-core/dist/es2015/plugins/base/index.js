import * as tslib_1 from "tslib";
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { doc, paragraph, text } from '@atlaskit/adf-schema';
import focusHandlerPlugin from './pm-plugins/focus-handler';
import inlineCursorTargetPlugin from './pm-plugins/inline-cursor-target';
import { plugin as reactNodeView } from './pm-plugins/react-nodeview';
var basePlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'inlineCursorTargetPlugin',
                plugin: function () { return inlineCursorTargetPlugin(); },
            },
            {
                name: 'focusHandlerPlugin',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return focusHandlerPlugin(dispatch);
                },
            },
            { name: 'reactNodeView', plugin: function () { return reactNodeView; } },
            { name: 'history', plugin: function () { return history(); } },
            // should be last :(
            {
                name: 'codeBlockIndent',
                plugin: function () {
                    return keymap(tslib_1.__assign({}, baseKeymap, { 'Mod-[': function () { return true; }, 'Mod-]': function () { return true; } }));
                },
            },
        ];
    },
    nodes: function () {
        return [
            { name: 'doc', node: doc },
            { name: 'paragraph', node: paragraph },
            { name: 'text', node: text },
        ];
    },
};
export default basePlugin;
//# sourceMappingURL=index.js.map