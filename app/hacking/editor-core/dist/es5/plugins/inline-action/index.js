"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
exports.stateKey = new prosemirror_state_1.PluginKey('inlineActionPlugin');
var inlineActionPlugin = {
    marks: function () { return [{ name: 'action', mark: adf_schema_1.action }]; },
};
exports.default = inlineActionPlugin;
//# sourceMappingURL=index.js.map