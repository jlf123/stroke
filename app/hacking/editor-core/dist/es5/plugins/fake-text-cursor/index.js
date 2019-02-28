"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_state_2 = require("prosemirror-state");
var cursor_1 = require("./cursor");
exports.stateKey = new prosemirror_state_2.PluginKey('fakeTextCursorPlugin');
exports.createPlugin = function () {
    return new prosemirror_state_1.Plugin({
        key: exports.stateKey,
        props: {
            decorations: cursor_1.drawFakeTextCursor,
        },
    });
};
var fakeTextCursorPlugin = {
    pmPlugins: function () {
        return [{ name: 'fakeTextCursor', plugin: function () { return exports.createPlugin(); } }];
    },
};
exports.default = fakeTextCursorPlugin;
//# sourceMappingURL=index.js.map