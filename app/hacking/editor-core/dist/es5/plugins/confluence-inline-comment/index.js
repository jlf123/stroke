"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
// tslint:disable-next-line:variable-name
var confluenceInlineCommentPlugin = {
    marks: function () {
        return [
            {
                name: 'confluenceInlineComment',
                mark: adf_schema_1.confluenceInlineComment,
            },
        ];
    },
};
exports.default = confluenceInlineCommentPlugin;
//# sourceMappingURL=index.js.map