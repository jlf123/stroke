"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var WithPluginState_1 = require("../../ui/WithPluginState");
var main_1 = require("./pm-plugins/main");
var input_rules_1 = require("./pm-plugins/input-rules");
var keymap_1 = require("./pm-plugins/keymap");
var TypeAhead_1 = require("./ui/TypeAhead");
var typeAheadPlugin = {
    name: 'typeAhead',
    marks: function () {
        return [{ name: 'typeAheadQuery', mark: adf_schema_1.typeAheadQuery }];
    },
    pmPlugins: function (typeAhead) {
        if (typeAhead === void 0) { typeAhead = []; }
        return [
            {
                name: 'typeAhead',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, reactContext = _a.reactContext;
                    return main_1.createPlugin(dispatch, reactContext, typeAhead);
                },
            },
            {
                name: 'typeAheadInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rules_1.inputRulePlugin(schema, typeAhead);
                },
            },
            {
                name: 'typeAheadKeymap',
                plugin: function () { return keymap_1.keymapPlugin(); },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                typeAhead: main_1.pluginKey,
            }, render: function (_a) {
                var _b = _a.typeAhead, typeAhead = _b === void 0 ? main_1.createInitialPluginState() : _b;
                var queryMarkPos = typeAhead.queryMarkPos;
                var domRef = queryMarkPos !== null ? editorView.domAtPos(queryMarkPos) : null;
                var anchorElement = domRef
                    ? domRef.node.childNodes[domRef.offset]
                    : undefined;
                return (React.createElement(TypeAhead_1.TypeAhead, { editorView: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, anchorElement: anchorElement, active: typeAhead.active, isLoading: !!typeAhead.itemsLoader, items: typeAhead.items, currentIndex: typeAhead.currentIndex }));
            } }));
    },
};
exports.default = typeAheadPlugin;
//# sourceMappingURL=index.js.map