"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
var decisionItem_1 = require("../nodeviews/decisionItem");
var taskItem_1 = require("../nodeviews/taskItem");
exports.stateKey = new prosemirror_state_1.PluginKey('tasksAndDecisionsPlugin');
function createPlugin(portalProviderAPI, providerFactory) {
    return new prosemirror_state_1.Plugin({
        props: {
            nodeViews: {
                taskItem: taskItem_1.taskItemNodeViewFactory(portalProviderAPI, providerFactory),
                decisionItem: decisionItem_1.decisionItemNodeView(portalProviderAPI),
            },
        },
        key: exports.stateKey,
        /*
         * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
         * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
         * Prosemirror capabibility where node attributes could be generated dynamically.
         * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
         *
         * Note: we currently do not handle the edge case where two nodes may have the same localId
         */
        appendTransaction: function (transactions, oldState, newState) {
            var tr = newState.tr;
            var modified = false;
            if (transactions.some(function (transaction) { return transaction.docChanged; })) {
                // Adds a unique id to a node
                newState.doc.descendants(function (node, pos) {
                    var _a = newState.schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
                    if (!!node.type &&
                        (node.type === decisionList ||
                            node.type === decisionItem ||
                            node.type === taskList ||
                            node.type === taskItem)) {
                        var _b = node.attrs, localId = _b.localId, rest = tslib_1.__rest(_b, ["localId"]);
                        if (localId === undefined || localId === null || localId === '') {
                            tr.setNodeMarkup(pos, undefined, tslib_1.__assign({ localId: adf_schema_1.uuid.generate() }, rest));
                            modified = true;
                        }
                    }
                });
            }
            if (modified) {
                return tr;
            }
        },
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=main.js.map