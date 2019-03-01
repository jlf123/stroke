"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var gap_cursor_1 = require("../gap-cursor");
var getListTypes = function (listType, schema) {
    var _a = schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
    if (listType === 'taskList') {
        return {
            list: taskList,
            item: taskItem,
        };
    }
    return {
        list: decisionList,
        item: decisionItem,
    };
};
exports.insertTaskDecision = function (view, listType) {
    var state = view.state;
    var schema = state.schema;
    var _a = getListTypes(listType, schema), list = _a.list, item = _a.item;
    var tr = state.tr;
    var $to = state.selection.$to;
    if (!prosemirror_utils_1.findParentNodeOfType(list)(state.selection)) {
        // Not a list - convert to one.
        var created = exports.createListAtSelection(tr, list, item, schema, state);
        view.dispatch(tr);
        return created;
    }
    else if ($to.node().textContent.length > 0) {
        var pos = $to.end($to.depth);
        tr.split(pos, 1, [{ type: item, attrs: { localId: adf_schema_1.uuid.generate() } }]);
        tr.setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve(pos + $to.depth)));
        view.dispatch(tr);
        return true;
    }
    return false;
};
exports.isSupportedSourceNode = function (schema, selection) {
    var _a = schema.nodes, paragraph = _a.paragraph, blockquote = _a.blockquote, decisionList = _a.decisionList, taskList = _a.taskList;
    return prosemirror_utils_1.hasParentNodeOfType([blockquote, paragraph, decisionList, taskList])(selection);
};
exports.changeInDepth = function (before, after) {
    return after.depth - before.depth;
};
exports.createListAtSelection = function (tr, list, item, schema, state) {
    var selection = state.selection;
    var $from = selection.$from, $to = selection.$to;
    if ($from.parent !== $to.parent) {
        // ignore selections across multiple nodes
        return false;
    }
    var _a = schema.nodes, paragraph = _a.paragraph, blockquote = _a.blockquote, decisionList = _a.decisionList, taskList = _a.taskList, mediaGroup = _a.mediaGroup;
    if ($from.parent.type === mediaGroup) {
        return false;
    }
    var emptyList = list.create({ localId: adf_schema_1.uuid.generate() }, [
        item.create({ localId: adf_schema_1.uuid.generate() }),
    ]);
    // we don't take the content of a block node next to the gap cursor and always create an empty task
    if (selection instanceof gap_cursor_1.GapCursorSelection) {
        prosemirror_utils_1.safeInsert(emptyList)(tr);
        return true;
    }
    // try to replace any of the given nodeTypes
    if (exports.isSupportedSourceNode(schema, selection)) {
        var newTr = prosemirror_utils_1.replaceParentNodeOfType([blockquote, paragraph, decisionList, taskList], list.create({ localId: adf_schema_1.uuid.generate() }, [
            item.create({ localId: adf_schema_1.uuid.generate() }, $from.node($from.depth).content),
        ]))(tr);
        // Adjust depth for new selection, if it has changed (e.g. paragraph to list (ol > li))
        var depthAdjustment = exports.changeInDepth($to, newTr.selection.$to);
        tr = tr.setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve($to.pos + depthAdjustment)));
        // replacing successful
        if (newTr !== tr) {
            return true;
        }
    }
    prosemirror_utils_1.safeInsert(emptyList)(tr);
    return true;
};
exports.splitListAtSelection = function (tr, schema) {
    var selection = tr.selection;
    var $from = selection.$from, $to = selection.$to;
    if ($from.parent !== $to.parent) {
        // ignore selections across multiple nodes
        return tr;
    }
    var _a = schema.nodes, decisionItem = _a.decisionItem, decisionList = _a.decisionList, paragraph = _a.paragraph, taskItem = _a.taskItem, taskList = _a.taskList;
    var parentList = prosemirror_utils_1.findParentNodeOfType([decisionList, taskList])(selection);
    if (!parentList) {
        return tr;
    }
    var item = prosemirror_utils_1.findParentNodeOfType([decisionItem, taskItem])(selection);
    if (!item) {
        return tr;
    }
    var resolvedItemPos = tr.doc.resolve(item.pos);
    var newListIds = [
        parentList.node.attrs['localId'] || adf_schema_1.uuid.generate(),
        adf_schema_1.uuid.generate(),
    ];
    var beforeItems = [];
    var afterItems = [];
    parentList.node.content.forEach(function (item, offset, index) {
        if (offset < resolvedItemPos.parentOffset) {
            beforeItems.push(item);
        }
        else if (offset > resolvedItemPos.parentOffset) {
            afterItems.push(item);
        }
    });
    var content = [];
    if (beforeItems.length) {
        content.push(parentList.node.type.createChecked({
            localId: newListIds.shift(),
        }, beforeItems));
    }
    content.push(paragraph.createChecked({}, item.node.content));
    if (afterItems.length) {
        content.push(parentList.node.type.createChecked({
            localId: newListIds.shift(),
        }, afterItems));
    }
    // If no list remains at start, then the new selection is different relative to the original selection.
    var posAdjust = beforeItems.length === 0 ? -1 : 1;
    tr = tr.replaceWith(resolvedItemPos.start() - 1, resolvedItemPos.end() + 1, content);
    tr = tr.setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve($from.pos + posAdjust)));
    return tr;
};
//# sourceMappingURL=commands.js.map