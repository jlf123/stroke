"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_utils_1 = require("prosemirror-utils");
var analytics_1 = require("../../../analytics");
var utils_1 = require("../../../utils");
var main_1 = require("../pm-plugins/main");
var find_query_mark_1 = require("../utils/find-query-mark");
var dismiss_1 = require("./dismiss");
exports.selectCurrentItem = function (mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        var _a = main_1.pluginKey.getState(state), active = _a.active, currentIndex = _a.currentIndex, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
        if (!active || !typeAheadHandler) {
            return false;
        }
        if (!typeAheadHandler.selectItem || !items[currentIndex]) {
            return exports.withTypeAheadQueryMarkPosition(state, function (start, end) {
                return exports.insertFallbackCommand(start, end)(state, dispatch);
            });
        }
        return exports.selectItem(typeAheadHandler, items[currentIndex], mode)(state, dispatch);
    };
};
exports.selectSingleItemOrDismiss = function (mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        var _a = main_1.pluginKey.getState(state), active = _a.active, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
        if (!active || !typeAheadHandler || !typeAheadHandler.selectItem) {
            return false;
        }
        if (items.length === 1) {
            return exports.selectItem(typeAheadHandler, items[0], mode)(state, dispatch);
        }
        if (!items || items.length === 0) {
            dismiss_1.dismissCommand()(state, dispatch);
            return false;
        }
        return false;
    };
};
exports.selectByIndex = function (index) { return function (state, dispatch) {
    var _a = main_1.pluginKey.getState(state), active = _a.active, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
    if (!active ||
        !typeAheadHandler ||
        !typeAheadHandler.selectItem ||
        !items[index]) {
        return false;
    }
    return exports.selectItem(typeAheadHandler, items[index])(state, dispatch);
}; };
exports.selectItem = function (handler, item, mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        return exports.withTypeAheadQueryMarkPosition(state, function (start, end) {
            var insert = function (maybeNode, opts) {
                if (opts === void 0) { opts = {}; }
                var tr = state.tr;
                tr = tr
                    .setMeta(main_1.pluginKey, { action: main_1.ACTIONS.SELECT_CURRENT })
                    .replaceWith(start, end, prosemirror_model_1.Fragment.empty);
                if (!maybeNode) {
                    return tr;
                }
                var node;
                try {
                    node =
                        maybeNode instanceof prosemirror_model_1.Node
                            ? maybeNode
                            : typeof maybeNode === 'string'
                                ? state.schema.text(maybeNode)
                                : prosemirror_model_1.Node.fromJSON(state.schema, maybeNode);
                }
                catch (e) {
                    // tslint:disable-next-line:no-console
                    console.error(e);
                    return tr;
                }
                if (node.isText) {
                    tr = tr.replaceWith(start, start, node);
                    /**
                     *
                     * Replacing a type ahead query mark with a block node.
                     *
                     */
                }
                else if (node.isBlock) {
                    tr = prosemirror_utils_1.safeInsert(node)(tr);
                    /**
                     *
                     * Replacing a type ahead query mark with an inline node.
                     *
                     */
                }
                else if (node.isInline) {
                    var fragment = prosemirror_model_1.Fragment.fromArray([node, state.schema.text(' ')]);
                    tr = tr.replaceWith(start, start, fragment);
                    // This problem affects Chrome v58-62. See: https://github.com/ProseMirror/prosemirror/issues/710
                    if (utils_1.isChromeWithSelectionBug) {
                        var selection = document.getSelection();
                        if (selection) {
                            selection.empty();
                        }
                    }
                    if (opts.selectInlineNode) {
                        // Select inserted node
                        tr = tr.setSelection(prosemirror_state_1.NodeSelection.create(tr.doc, start));
                    }
                    else {
                        // Placing cursor after node + space.
                        tr = tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(start + fragment.size)));
                    }
                }
                return tr;
            };
            analytics_1.analyticsService.trackEvent('atlassian.editor.typeahead.select', { mode: mode });
            var tr = handler.selectItem(state, item, insert, { mode: mode });
            if (tr === false) {
                return exports.insertFallbackCommand(start, end)(state, dispatch);
            }
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        });
    };
};
exports.insertFallbackCommand = function (start, end) { return function (state, dispatch) {
    var _a = main_1.pluginKey.getState(state), query = _a.query, trigger = _a.trigger;
    var node = state.schema.text(trigger + query);
    if (dispatch) {
        dispatch(state.tr.replaceWith(start, end, node));
    }
    return true;
}; };
exports.withTypeAheadQueryMarkPosition = function (state, cb) {
    var queryMark = find_query_mark_1.findTypeAheadQuery(state);
    if (!queryMark || queryMark.start === -1) {
        return false;
    }
    return cb(queryMark.start, queryMark.end);
};
//# sourceMappingURL=select-item.js.map