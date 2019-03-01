"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var _1 = require("./");
var assert = require("assert");
var editor_common_1 = require("@atlaskit/editor-common");
var prosemirror_utils_1 = require("prosemirror-utils");
exports.insertMacroFromMacroBrowser = function (macroProvider, macroNode, isEditing) { return function (state, dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var newMacro, currentLayout, node, bodiedExtension, tr, nonSelectedBodiedExtension;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!macroProvider) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, macroProvider.openMacroBrowser(macroNode)];
            case 1:
                newMacro = _a.sent();
                if (newMacro) {
                    currentLayout = (macroNode && macroNode.attrs.layout) || 'default';
                    node = exports.resolveMacro(newMacro, state, { layout: currentLayout });
                    if (!node) {
                        return [2 /*return*/, false];
                    }
                    bodiedExtension = state.schema.nodes.bodiedExtension;
                    tr = state.tr;
                    nonSelectedBodiedExtension = macroNode.type === bodiedExtension &&
                        !(tr.selection instanceof prosemirror_state_1.NodeSelection);
                    if (nonSelectedBodiedExtension && !isEditing) {
                        tr = prosemirror_utils_1.safeInsert(node)(tr);
                    }
                    else if (nonSelectedBodiedExtension) {
                        tr = prosemirror_utils_1.replaceParentNodeOfType(bodiedExtension, node)(tr);
                    }
                    else if (tr.selection instanceof prosemirror_state_1.NodeSelection) {
                        tr = prosemirror_utils_1.replaceSelectedNode(node)(tr);
                    }
                    dispatch(tr.scrollIntoView());
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
        }
    });
}); }; };
exports.resolveMacro = function (macro, state, optionalAttrs) {
    if (!macro || !state) {
        return null;
    }
    var schema = state.schema;
    var _a = editor_common_1.getValidNode(macro, schema), type = _a.type, attrs = _a.attrs;
    var node;
    if (type === 'extension') {
        node = schema.nodes.extension.create(tslib_1.__assign({}, attrs, optionalAttrs));
    }
    else if (type === 'bodiedExtension') {
        node = schema.nodes.bodiedExtension.create(tslib_1.__assign({}, attrs, optionalAttrs), schema.nodeFromJSON(macro).content);
    }
    else if (type === 'inlineExtension') {
        node = schema.nodes.inlineExtension.create(attrs);
    }
    return node;
};
// gets the macroProvider from the state and tries to autoConvert a given text
exports.runMacroAutoConvert = function (state, text) {
    var macroPluginState = _1.pluginKey.getState(state);
    var macroProvider = macroPluginState && macroPluginState.macroProvider;
    if (!macroProvider || !macroProvider.autoConvert) {
        return null;
    }
    var macroAttributes = macroProvider.autoConvert(text);
    if (!macroAttributes) {
        return null;
    }
    // decides which kind of macro to render (inline|bodied|bodyless) - will be just inline atm.
    return exports.resolveMacro(macroAttributes, state);
};
exports.setMacroProvider = function (provider) { return function (view) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var resolvedProvider, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, provider];
            case 1:
                resolvedProvider = _a.sent();
                assert(resolvedProvider && resolvedProvider.openMacroBrowser, "MacroProvider promise did not resolve to a valid instance of MacroProvider - " + resolvedProvider);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                resolvedProvider = null;
                return [3 /*break*/, 3];
            case 3:
                view.dispatch(view.state.tr.setMeta(_1.pluginKey, { macroProvider: resolvedProvider }));
                return [2 /*return*/, true];
        }
    });
}); }; };
//# sourceMappingURL=actions.js.map