"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var adf_schema_1 = require("@atlaskit/adf-schema");
var focus_handler_1 = require("./pm-plugins/focus-handler");
var inline_cursor_target_1 = require("./pm-plugins/inline-cursor-target");
var react_nodeview_1 = require("./pm-plugins/react-nodeview");
var basePlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'inlineCursorTargetPlugin',
                plugin: function () { return inline_cursor_target_1.default(); },
            },
            {
                name: 'focusHandlerPlugin',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return focus_handler_1.default(dispatch);
                },
            },
            { name: 'reactNodeView', plugin: function () { return react_nodeview_1.plugin; } },
            { name: 'history', plugin: function () { return prosemirror_history_1.history(); } },
            // should be last :(
            {
                name: 'codeBlockIndent',
                plugin: function () {
                    return prosemirror_keymap_1.keymap(tslib_1.__assign({}, prosemirror_commands_1.baseKeymap, { 'Mod-[': function () { return true; }, 'Mod-]': function () { return true; } }));
                },
            },
        ];
    },
    nodes: function () {
        return [
            { name: 'doc', node: adf_schema_1.doc },
            { name: 'paragraph', node: adf_schema_1.paragraph },
            { name: 'text', node: adf_schema_1.text },
        ];
    },
};
exports.default = basePlugin;
//# sourceMappingURL=index.js.map