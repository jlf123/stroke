"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./pm-plugins/main");
var input_rule_1 = require("./pm-plugins/input-rule");
var imageUpload = {
    pmPlugins: function () {
        return [
            {
                name: 'imageUpload',
                plugin: main_1.createPlugin,
            },
            {
                name: 'imageUploadInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.default(schema);
                },
            },
        ];
    },
};
exports.default = imageUpload;
//# sourceMappingURL=index.js.map