"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var utils_1 = require("../utils");
function preventDefault() {
    return function (state, dispatch) {
        return true;
    };
}
exports.preventDefault = preventDefault;
function insertNewLine() {
    return function (state, dispatch) {
        var $from = state.selection.$from;
        var parent = $from.parent;
        var hardBreak = state.schema.nodes.hardBreak;
        if (hardBreak) {
            var hardBreakNode = hardBreak.create();
            if (parent && parent.type.validContent(prosemirror_model_1.Fragment.from(hardBreakNode))) {
                if (dispatch) {
                    dispatch(state.tr.replaceSelectionWith(hardBreakNode));
                }
                return true;
            }
        }
        if (state.selection instanceof prosemirror_state_1.TextSelection) {
            if (dispatch) {
                dispatch(state.tr.insertText('\n'));
            }
            return true;
        }
        return false;
    };
}
exports.insertNewLine = insertNewLine;
function insertRule() {
    return function (state, dispatch) {
        var to = state.selection.to;
        var rule = state.schema.nodes.rule;
        if (rule) {
            var ruleNode = rule.create();
            if (dispatch) {
                dispatch(state.tr.insert(to + 1, ruleNode));
            }
            return true;
        }
        return false;
    };
}
exports.insertRule = insertRule;
function shouldAppendParagraphAfterBlockNode(state) {
    return utils_1.atTheEndOfDoc(state) && utils_1.atTheBeginningOfBlock(state);
}
exports.shouldAppendParagraphAfterBlockNode = shouldAppendParagraphAfterBlockNode;
function insertNodesEndWithNewParagraph(nodes) {
    return function (state, dispatch) {
        var tr = state.tr, schema = state.schema;
        var paragraph = schema.nodes.paragraph;
        var head = state.selection.head;
        if (shouldAppendParagraphAfterBlockNode(state)) {
            nodes.push(paragraph.create());
        }
        /** If table cell, the default is to move to the next cell, override to select paragraph */
        tr.replaceSelection(new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(nodes), 0, 0));
        if (utils_1.isTableCell(state)) {
            tr.setSelection(prosemirror_state_1.TextSelection.create(state.doc, head, head));
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
exports.insertNodesEndWithNewParagraph = insertNodesEndWithNewParagraph;
exports.createNewParagraphAbove = function (state, dispatch) {
    var append = false;
    if (!utils_1.canMoveUp(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }
    return false;
};
exports.createNewParagraphBelow = function (state, dispatch) {
    var append = true;
    if (!utils_1.canMoveDown(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }
    return false;
};
function canCreateParagraphNear(state) {
    var $from = state.selection.$from;
    var node = $from.node($from.depth);
    var insideCodeBlock = !!node && node.type === state.schema.nodes.codeBlock;
    var isNodeSelection = state.selection instanceof prosemirror_state_1.NodeSelection;
    return $from.depth > 1 || isNodeSelection || insideCodeBlock;
}
function createParagraphNear(append) {
    if (append === void 0) { append = true; }
    return function (state, dispatch) {
        var paragraph = state.schema.nodes.paragraph;
        if (!paragraph) {
            return false;
        }
        var insertPos;
        if (state.selection instanceof prosemirror_state_1.TextSelection) {
            if (topLevelNodeIsEmptyTextBlock(state)) {
                return false;
            }
            insertPos = getInsertPosFromTextBlock(state, append);
        }
        else {
            insertPos = getInsertPosFromNonTextBlock(state, append);
        }
        var tr = state.tr.insert(insertPos, paragraph.createAndFill());
        tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, insertPos + 1));
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
exports.createParagraphNear = createParagraphNear;
function getInsertPosFromTextBlock(state, append) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var pos;
    if (!append) {
        pos = $from.start(0);
    }
    else {
        pos = $to.end(0);
    }
    return pos;
}
function getInsertPosFromNonTextBlock(state, append) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var nodeAtSelection = state.selection instanceof prosemirror_state_1.NodeSelection &&
        state.doc.nodeAt(state.selection.$anchor.pos);
    var isMediaSelection = nodeAtSelection && nodeAtSelection.type.name === 'mediaGroup';
    var pos;
    if (!append) {
        // The start position is different with text block because it starts from 0
        pos = $from.start($from.depth);
        // The depth is different with text block because it starts from 0
        pos = $from.depth > 0 && !isMediaSelection ? pos - 1 : pos;
    }
    else {
        pos = $to.end($to.depth);
        pos = $to.depth > 0 && !isMediaSelection ? pos + 1 : pos;
    }
    return pos;
}
function topLevelNodeIsEmptyTextBlock(state) {
    var topLevelNode = state.selection.$from.node(1);
    return (topLevelNode.isTextblock &&
        topLevelNode.type !== state.schema.nodes.codeBlock &&
        topLevelNode.nodeSize === 2);
}
function createParagraphAtEnd() {
    return function (state, dispatch) {
        var doc = state.doc, tr = state.tr, nodes = state.schema.nodes;
        if (doc.lastChild &&
            !(doc.lastChild.type === nodes.paragraph &&
                doc.lastChild.content.size === 0)) {
            tr.insert(doc.content.size, nodes.paragraph.createAndFill());
        }
        tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, tr.doc.content.size - 1));
        tr.scrollIntoView();
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
exports.createParagraphAtEnd = createParagraphAtEnd;
exports.changeImageAlignment = function (align) { return function (state, dispatch) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var tr = state.tr;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        if (node.type === state.schema.nodes.mediaSingle) {
            tr.setNodeMarkup(pos, undefined, tslib_1.__assign({}, node.attrs, { layout: align === 'center' ? 'center' : "align-" + align }));
        }
    });
    if (tr.docChanged && dispatch) {
        dispatch(tr.scrollIntoView());
        return true;
    }
    return false;
}; };
/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
exports.toggleBlockMark = function (markType, getAttrs, allowedBlocks) { return function (state, dispatch) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var markApplied = false;
    var tr = state.tr;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        if (!node.type.isBlock) {
            return false;
        }
        if ((!allowedBlocks ||
            (Array.isArray(allowedBlocks)
                ? allowedBlocks.indexOf(node.type) > -1
                : allowedBlocks(state.schema, node, parent))) &&
            parent.type.allowsMarkType(markType)) {
            var oldMarks = node.marks.filter(function (mark) { return mark.type === markType; });
            var newAttrs = getAttrs(oldMarks.length ? oldMarks[0].attrs : undefined);
            if (newAttrs !== undefined) {
                tr.setNodeMarkup(pos, node.type, node.attrs, node.marks
                    .filter(function (mark) { return !markType.excludes(mark.type); })
                    .concat(newAttrs === false ? [] : markType.create(newAttrs)));
                markApplied = true;
            }
        }
    });
    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }
    return false;
}; };
//# sourceMappingURL=index.js.map