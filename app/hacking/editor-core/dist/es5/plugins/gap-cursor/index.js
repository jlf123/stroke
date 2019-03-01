"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./pm-plugins/main");
var keymap_1 = require("./pm-plugins/keymap");
var selection_1 = require("./selection");
exports.GapCursorSelection = selection_1.GapCursorSelection;
exports.Side = selection_1.Side;
var actions_1 = require("./actions");
exports.setCursorForTopLevelBlocks = actions_1.setCursorForTopLevelBlocks;
exports.default = {
    pmPlugins: function () {
        return [
            {
                name: 'gapCursorKeymap',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return keymap_1.default();
                },
            },
            {
                name: 'gapCursor',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return main_1.default;
                },
            },
        ];
    },
};
//# sourceMappingURL=index.js.map