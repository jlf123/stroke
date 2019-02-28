"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_model_1 = require("prosemirror-model");
var FakeTextCursorBookmark = /** @class */ (function () {
    function FakeTextCursorBookmark(pos) {
        this.pos = undefined;
        this.visible = false;
        this.pos = pos;
    }
    FakeTextCursorBookmark.prototype.map = function (mapping) {
        return new FakeTextCursorBookmark(mapping.map(this.pos));
    };
    FakeTextCursorBookmark.prototype.resolve = function (doc) {
        var $pos = doc.resolve(this.pos);
        return prosemirror_state_1.Selection.near($pos);
    };
    return FakeTextCursorBookmark;
}());
exports.FakeTextCursorBookmark = FakeTextCursorBookmark;
var FakeTextCursorSelection = /** @class */ (function (_super) {
    tslib_1.__extends(FakeTextCursorSelection, _super);
    function FakeTextCursorSelection($pos) {
        return _super.call(this, $pos, $pos) || this;
    }
    FakeTextCursorSelection.prototype.map = function (doc, mapping) {
        var $pos = doc.resolve(mapping.map(this.$head.pos));
        return new FakeTextCursorSelection($pos);
    };
    FakeTextCursorSelection.content = function () {
        return prosemirror_model_1.Slice.empty;
    };
    FakeTextCursorSelection.prototype.eq = function (other) {
        return other instanceof FakeTextCursorSelection && other.head === this.head;
    };
    FakeTextCursorSelection.prototype.toJSON = function () {
        return { type: 'Cursor', pos: this.head };
    };
    FakeTextCursorSelection.fromJSON = function (doc, json) {
        return new FakeTextCursorSelection(doc.resolve(json.pos));
    };
    FakeTextCursorSelection.prototype.getBookmark = function () {
        return new FakeTextCursorBookmark(this.anchor);
    };
    return FakeTextCursorSelection;
}(prosemirror_state_1.Selection));
exports.FakeTextCursorSelection = FakeTextCursorSelection;
prosemirror_state_1.Selection.jsonID('fake-text-cursor', FakeTextCursorSelection);
exports.addFakeTextCursor = function (state, dispatch) {
    var selection = state.selection;
    if (selection.empty) {
        var $from = state.selection.$from;
        dispatch(state.tr.setSelection(new FakeTextCursorSelection($from)));
    }
};
exports.removeFakeTextCursor = function (state, dispatch) {
    if (state.selection instanceof FakeTextCursorSelection) {
        var $from = state.selection.$from;
        dispatch(state.tr.setSelection(new prosemirror_state_1.TextSelection($from)));
    }
};
exports.drawFakeTextCursor = function (state) {
    if (!(state.selection instanceof FakeTextCursorSelection)) {
        return null;
    }
    var node = document.createElement('div');
    node.className = 'ProseMirror-fake-text-cursor';
    return prosemirror_view_1.DecorationSet.create(state.doc, [
        prosemirror_view_1.Decoration.widget(state.selection.head, node, { key: 'Cursor' }),
    ]);
};
//# sourceMappingURL=cursor.js.map