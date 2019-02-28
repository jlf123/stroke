import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { uuid } from '@atlaskit/adf-schema';
import { decisionItemNodeView } from '../nodeviews/decisionItem';
import { taskItemNodeViewFactory } from '../nodeviews/taskItem';
export var stateKey = new PluginKey('tasksAndDecisionsPlugin');
export function createPlugin(portalProviderAPI, providerFactory) {
    return new Plugin({
        props: {
            nodeViews: {
                taskItem: taskItemNodeViewFactory(portalProviderAPI, providerFactory),
                decisionItem: decisionItemNodeView(portalProviderAPI),
            },
        },
        key: stateKey,
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
                            tr.setNodeMarkup(pos, undefined, tslib_1.__assign({ localId: uuid.generate() }, rest));
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
//# sourceMappingURL=main.js.map