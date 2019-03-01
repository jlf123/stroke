"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_transform_1 = require("prosemirror-transform");
var keymaps_1 = require("../keymaps");
var editor_json_transformer_1 = require("@atlaskit/editor-json-transformer");
var cursor_1 = require("../plugins/fake-text-cursor/cursor");
var prosemirror_utils_1 = require("prosemirror-utils");
var selection_1 = require("../plugins/gap-cursor/selection");
tslib_1.__exportStar(require("./document"), exports);
tslib_1.__exportStar(require("./action"), exports);
tslib_1.__exportStar(require("./step"), exports);
tslib_1.__exportStar(require("./mark"), exports);
var filter_1 = require("./filter");
exports.filterContentByType = filter_1.filterContentByType;
function validateNode(node) {
    return false;
}
function isMarkTypeCompatibleWithMark(markType, mark) {
    return !mark.type.excludes(markType) && !markType.excludes(mark.type);
}
function isMarkTypeAllowedInNode(markType, state) {
    return prosemirror_commands_1.toggleMark(markType)(state);
}
function closest(node, s) {
    var el = node;
    if (!el) {
        return null;
    }
    if (!document.documentElement || !document.documentElement.contains(el)) {
        return null;
    }
    var matches = el.matches ? 'matches' : 'msMatchesSelector';
    do {
        if (el[matches](s)) {
            return el;
        }
        el = (el.parentElement || el.parentNode);
    } while (el !== null && el.nodeType === 1);
    return null;
}
exports.isImage = function (fileType) {
    return !!fileType && fileType.indexOf('image/') > -1;
};
function canMoveUp(state) {
    var selection = state.selection, doc = state.doc;
    /**
     * If there's a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof prosemirror_state_1.NodeSelection) {
        if (selection.node.type.name === 'media') {
            /** Weird way of checking if the previous element is a paragraph */
            var mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
            return !!(mediaAncestorNode && mediaAncestorNode.type.name === 'paragraph');
        }
        else if (selection.node.type.name === 'mediaGroup') {
            var mediaGroupAncestorNode = selection.$anchor.nodeBefore;
            return !!(mediaGroupAncestorNode &&
                mediaGroupAncestorNode.type.name === 'paragraph');
        }
    }
    if (selection instanceof prosemirror_state_1.TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheBeginningOfDoc(state);
}
exports.canMoveUp = canMoveUp;
function canMoveDown(state) {
    var selection = state.selection, doc = state.doc;
    /**
     * If there's a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof prosemirror_state_1.NodeSelection) {
        if (selection.node.type.name === 'media') {
            var nodeAfter = doc.nodeAt(selection.$head.after());
            return !!(nodeAfter && nodeAfter.type.name === 'paragraph');
        }
        else if (selection.node.type.name === 'mediaGroup') {
            return !(selection.$head.parentOffset === selection.$anchor.parent.content.size);
        }
    }
    if (selection instanceof prosemirror_state_1.TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheEndOfDoc(state);
}
exports.canMoveDown = canMoveDown;
function atTheEndOfDoc(state) {
    var selection = state.selection, doc = state.doc;
    return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}
exports.atTheEndOfDoc = atTheEndOfDoc;
function atTheBeginningOfDoc(state) {
    var selection = state.selection;
    return selection.$from.pos === selection.$from.depth;
}
exports.atTheBeginningOfDoc = atTheBeginningOfDoc;
function atTheEndOfBlock(state) {
    var selection = state.selection;
    var $to = selection.$to;
    if (selection instanceof selection_1.GapCursorSelection) {
        return false;
    }
    if (selection instanceof prosemirror_state_1.NodeSelection && selection.node.isBlock) {
        return true;
    }
    return endPositionOfParent($to) === $to.pos + 1;
}
exports.atTheEndOfBlock = atTheEndOfBlock;
function atTheBeginningOfBlock(state) {
    var selection = state.selection;
    var $from = selection.$from;
    if (selection instanceof selection_1.GapCursorSelection) {
        return false;
    }
    if (selection instanceof prosemirror_state_1.NodeSelection && selection.node.isBlock) {
        return true;
    }
    return startPositionOfParent($from) === $from.pos;
}
exports.atTheBeginningOfBlock = atTheBeginningOfBlock;
function startPositionOfParent(resolvedPos) {
    return resolvedPos.start(resolvedPos.depth);
}
exports.startPositionOfParent = startPositionOfParent;
function endPositionOfParent(resolvedPos) {
    return resolvedPos.end(resolvedPos.depth) + 1;
}
exports.endPositionOfParent = endPositionOfParent;
function getCursor(selection) {
    return selection.$cursor || undefined;
}
exports.getCursor = getCursor;
/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */
function isMarkTypeAllowedInCurrentSelection(markType, state) {
    if (state.selection instanceof cursor_1.FakeTextCursorSelection) {
        return true;
    }
    if (!isMarkTypeAllowedInNode(markType, state)) {
        return false;
    }
    var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
    if (empty && !$cursor) {
        return false;
    }
    var isCompatibleMarkType = function (mark) {
        return isMarkTypeCompatibleWithMark(markType, mark);
    };
    // Handle any new marks in the current transaction
    if (state.tr.storedMarks &&
        !state.tr.storedMarks.every(isCompatibleMarkType)) {
        return false;
    }
    if ($cursor) {
        return $cursor.marks().every(isCompatibleMarkType);
    }
    // Check every node in a selection - ensuring that it is compatible with the current mark type
    return ranges.every(function (_a) {
        var $from = _a.$from, $to = _a.$to;
        var allowedInActiveMarks = $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;
        state.doc.nodesBetween($from.pos, $to.pos, function (node) {
            allowedInActiveMarks =
                allowedInActiveMarks && node.marks.every(isCompatibleMarkType);
        });
        return allowedInActiveMarks;
    });
}
exports.isMarkTypeAllowedInCurrentSelection = isMarkTypeAllowedInCurrentSelection;
/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn't of the specified type
 */
function isRangeOfType(doc, $from, $to, nodeType) {
    return (getAncestorNodesBetween(doc, $from, $to).filter(function (node) { return node.type !== nodeType; }).length === 0);
}
exports.isRangeOfType = isRangeOfType;
function createSliceWithContent(content, state) {
    return new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(state.schema.text(content)), 0, 0);
}
exports.createSliceWithContent = createSliceWithContent;
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
function canJoinDown(selection, doc, nodeType) {
    var res = doc.resolve(selection.$to.after(findAncestorPosition(doc, selection.$to).depth));
    return res.nodeAfter && res.nodeAfter.type === nodeType;
}
exports.canJoinDown = canJoinDown;
exports.setNodeSelection = function (view, pos) {
    var state = view.state, dispatch = view.dispatch;
    if (!isFinite(pos)) {
        return;
    }
    var tr = state.tr.setSelection(prosemirror_state_1.NodeSelection.create(state.doc, pos));
    dispatch(tr);
};
function setTextSelection(view, anchor, head) {
    var state = view.state;
    var tr = state.tr.setSelection(prosemirror_state_1.TextSelection.create(state.doc, anchor, head));
    view.dispatch(tr);
}
exports.setTextSelection = setTextSelection;
function setGapCursorSelection(view, pos, side) {
    var state = view.state;
    view.dispatch(state.tr.setSelection(new selection_1.GapCursorSelection(state.doc.resolve(pos), side)));
}
exports.setGapCursorSelection = setGapCursorSelection;
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
function canJoinUp(selection, doc, nodeType) {
    var res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
    return res.nodeBefore && res.nodeBefore.type === nodeType;
}
exports.canJoinUp = canJoinUp;
/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
function getAncestorNodesBetween(doc, $from, $to) {
    var nodes = Array();
    var maxDepth = findAncestorPosition(doc, $from).depth;
    var current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        var depth = Math.min(current.depth, maxDepth);
        var node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        var next = doc.resolve(current.after(depth));
        if (next.start(depth) >= doc.nodeSize - 2) {
            break;
        }
        if (next.depth !== current.depth) {
            next = doc.resolve(next.pos + 2);
        }
        if (next.depth) {
            current = doc.resolve(next.start(next.depth));
        }
        else {
            current = doc.resolve(next.end(next.depth));
        }
    }
    return nodes;
}
exports.getAncestorNodesBetween = getAncestorNodesBetween;
/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
function getGroupsInRange(doc, $from, $to, isNodeValid) {
    if (isNodeValid === void 0) { isNodeValid = validateNode; }
    var groups = Array();
    var commonAncestor = hasCommonAncestor(doc, $from, $to);
    var fromAncestor = findAncestorPosition(doc, $from);
    if (commonAncestor ||
        (fromAncestor.depth === 1 && isNodeValid($from.node(1)))) {
        groups.push({ $from: $from, $to: $to });
    }
    else {
        var current = $from;
        while (current.pos < $to.pos) {
            var ancestorPos = findAncestorPosition(doc, current);
            while (ancestorPos.depth > 1) {
                ancestorPos = findAncestorPosition(doc, ancestorPos);
            }
            var endPos = doc.resolve(Math.min(
            // should not be smaller then start position in case of an empty paragraph for example.
            Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 3), $to.pos));
            groups.push({
                $from: current,
                $to: endPos,
            });
            current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
        }
    }
    return groups;
}
exports.getGroupsInRange = getGroupsInRange;
/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
function findAncestorPosition(doc, pos) {
    var nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];
    if (pos.depth === 1) {
        return pos;
    }
    var node = pos.node(pos.depth);
    var newPos = pos;
    while (pos.depth >= 1) {
        pos = doc.resolve(pos.before(pos.depth));
        node = pos.node(pos.depth);
        if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
            newPos = pos;
        }
    }
    return newPos;
}
exports.findAncestorPosition = findAncestorPosition;
/**
 * Determine if two positions have a common ancestor.
 */
function hasCommonAncestor(doc, $from, $to) {
    var current;
    var target;
    if ($from.depth > $to.depth) {
        current = findAncestorPosition(doc, $from);
        target = findAncestorPosition(doc, $to);
    }
    else {
        current = findAncestorPosition(doc, $to);
        target = findAncestorPosition(doc, $from);
    }
    while (current.depth > target.depth && current.depth > 1) {
        current = findAncestorPosition(doc, current);
    }
    return current.node(current.depth) === target.node(target.depth);
}
exports.hasCommonAncestor = hasCommonAncestor;
/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
function liftSelection(tr, doc, $from, $to) {
    var startPos = $from.start($from.depth);
    var endPos = $to.end($to.depth);
    var target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);
    tr.doc.nodesBetween(startPos, endPos, function (node, pos) {
        if (node.isText || // Text node
            (node.isTextblock && !node.textContent) // Empty paragraph
        ) {
            var res = tr.doc.resolve(tr.mapping.map(pos));
            var sel = new prosemirror_state_1.NodeSelection(res);
            var range = sel.$from.blockRange(sel.$to);
            if (prosemirror_transform_1.liftTarget(range) !== undefined) {
                tr.lift(range, target);
            }
        }
    });
    startPos = tr.mapping.map(startPos);
    endPos = tr.mapping.map(endPos);
    endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node
    tr.setSelection(new prosemirror_state_1.TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));
    return {
        tr: tr,
        $from: tr.doc.resolve(startPos),
        $to: tr.doc.resolve(endPos),
    };
}
exports.liftSelection = liftSelection;
/**
 * Lift nodes in block to one level above.
 */
function liftSiblingNodes(view) {
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    var range = blockStart.blockRange(blockEnd);
    view.dispatch(tr.lift(range, blockStart.depth - 1));
}
exports.liftSiblingNodes = liftSiblingNodes;
/**
 * Lift sibling nodes to document-level and select them.
 */
function liftAndSelectSiblingNodes(view) {
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    // TODO: [ts30] handle void and null properly
    var range = blockStart.blockRange(blockEnd);
    tr.setSelection(new prosemirror_state_1.TextSelection(blockStart, blockEnd));
    tr.lift(range, blockStart.depth - 1);
    return tr;
}
exports.liftAndSelectSiblingNodes = liftAndSelectSiblingNodes;
function wrapIn(nodeType, tr, $from, $to) {
    var range = $from.blockRange($to);
    var wrapping = range && prosemirror_transform_1.findWrapping(range, nodeType);
    if (wrapping) {
        tr = tr.wrap(range, wrapping).scrollIntoView();
    }
    return tr;
}
exports.wrapIn = wrapIn;
var transformer = new editor_json_transformer_1.JSONTransformer();
function toJSON(node) {
    return transformer.encode(node);
}
exports.toJSON = toJSON;
/**
 * Repeating string for multiple times
 */
function stringRepeat(text, length) {
    var result = '';
    for (var x = 0; x < length; x++) {
        result += text;
    }
    return result;
}
exports.stringRepeat = stringRepeat;
/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
function arrayFrom(obj) {
    return Array.prototype.slice.call(obj);
}
exports.arrayFrom = arrayFrom;
/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */
function closestElement(node, s) {
    return closest(node, s);
}
exports.closestElement = closestElement;
function moveLeft(view) {
    var event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
    });
    event.keyCode = keymaps_1.LEFT;
    view.dispatchEvent(event);
}
exports.moveLeft = moveLeft;
/**
 * Function will create a list of wrapper blocks present in a selection.
 */
function getSelectedWrapperNodes(state) {
    var nodes = [];
    if (state.selection) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var _b = state.schema.nodes, blockquote_1 = _b.blockquote, panel_1 = _b.panel, orderedList_1 = _b.orderedList, bulletList_1 = _b.bulletList, listItem_1 = _b.listItem, codeBlock_1 = _b.codeBlock;
        state.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
            if ((node.isBlock &&
                [blockquote_1, panel_1, orderedList_1, bulletList_1, listItem_1].indexOf(node.type) >= 0) ||
                node.type === codeBlock_1) {
                nodes.push(node.type);
            }
        });
    }
    return nodes;
}
/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */
function areBlockTypesDisabled(state) {
    var nodesTypes = getSelectedWrapperNodes(state);
    var panel = state.schema.nodes.panel;
    return nodesTypes.filter(function (type) { return type !== panel; }).length > 0;
}
exports.areBlockTypesDisabled = areBlockTypesDisabled;
exports.isTemporary = function (id) {
    return id.indexOf('temporary:') === 0;
};
// @see: https://github.com/ProseMirror/prosemirror/issues/710
// @see: https://bugs.chromium.org/p/chromium/issues/detail?id=740085
// Chrome >= 58
exports.isChromeWithSelectionBug = parseInt((navigator.userAgent.match(/Chrome\/(\d{2})/) || [])[1], 10) >= 58;
exports.isEmptyNode = function (schema) {
    var _a = schema.nodes, doc = _a.doc, paragraph = _a.paragraph, codeBlock = _a.codeBlock, blockquote = _a.blockquote, panel = _a.panel, heading = _a.heading, listItem = _a.listItem, bulletList = _a.bulletList, orderedList = _a.orderedList, taskList = _a.taskList, taskItem = _a.taskItem, decisionList = _a.decisionList, decisionItem = _a.decisionItem, media = _a.media, mediaGroup = _a.mediaGroup, mediaSingle = _a.mediaSingle;
    var innerIsEmptyNode = function (node) {
        switch (node.type) {
            case media:
            case mediaGroup:
            case mediaSingle:
                return false;
            case paragraph:
            case codeBlock:
            case heading:
            case taskItem:
            case decisionItem:
                return node.content.size === 0;
            case blockquote:
            case panel:
            case listItem:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case bulletList:
            case orderedList:
                return (node.content.size === 4 && innerIsEmptyNode(node.content.firstChild));
            case taskList:
            case decisionList:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case doc:
                var isEmpty_1 = true;
                node.content.forEach(function (child) {
                    isEmpty_1 = isEmpty_1 && innerIsEmptyNode(child);
                });
                return isEmpty_1;
            default:
                throw new Error(node.type.name + " node is not implemented");
        }
    };
    return innerIsEmptyNode;
};
exports.isTableCell = function (state) {
    var _a = state.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    return prosemirror_utils_1.hasParentNodeOfType([tableCell, tableHeader])(state.selection);
};
exports.isElementInTableCell = function (element) {
    return closest(element, 'td') || closest(element, 'th');
};
exports.isLastItemMediaGroup = function (node) {
    var content = node.content;
    return !!content.lastChild && content.lastChild.type.name === 'mediaGroup';
};
exports.isInListItem = function (state) {
    return prosemirror_utils_1.hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};
exports.hasOpenEnd = function (slice) {
    return slice.openStart > 0 || slice.openEnd > 0;
};
function filterChildrenBetween(doc, from, to, predicate) {
    var results = [];
    doc.nodesBetween(from, to, function (node, pos, parent) {
        if (predicate(node, pos, parent)) {
            results.push({ node: node, pos: pos });
        }
    });
    return results;
}
exports.filterChildrenBetween = filterChildrenBetween;
function dedupe(list, iteratee) {
    if (list === void 0) { list = []; }
    var transformed = iteratee ? list.map(iteratee) : list;
    return transformed
        .map(function (item, index, list) { return (list.indexOf(item) === index ? item : null); })
        .reduce(function (acc, item, index) { return (!!item ? acc.concat(list[index]) : acc); }, []);
}
exports.dedupe = dedupe;
exports.isTextSelection = function (selection) { return selection instanceof prosemirror_state_1.TextSelection; };
/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
function compose(func) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    var allFuncs = tslib_1.__spread([func], funcs);
    return function composed(raw) {
        return allFuncs.reduceRight(function (memo, func) { return func(memo); }, raw);
    };
}
exports.compose = compose;
//# sourceMappingURL=index.js.map