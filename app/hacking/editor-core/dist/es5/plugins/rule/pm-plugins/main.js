"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keymap_1 = require("./keymap");
var input_rule_1 = require("./input-rule");
var plugins = function (schema) {
    return [input_rule_1.default(schema), keymap_1.default(schema)].filter(function (plugin) { return !!plugin; });
};
exports.default = plugins;
//# sourceMappingURL=main.js.map