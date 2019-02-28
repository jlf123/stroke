"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
var keymap_1 = require("./pm-plugins/keymap");
var indentationPlugin = {
    name: 'indentationPlugin',
    marks: function () {
        return [{ name: 'indentation', mark: adf_schema_1.indentation }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'indentationKeymap',
                plugin: function () { return keymap_1.keymapPlugin(); },
            },
        ];
    },
};
exports.default = indentationPlugin;
//# sourceMappingURL=index.js.map