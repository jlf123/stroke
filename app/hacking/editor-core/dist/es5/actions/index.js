"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var utils_1 = require("../utils");
var prosemirror_utils_1 = require("prosemirror-utils");
var EditorActions = /** @class */ (function () {
    function EditorActions() {
        this.listeners = [];
    }
    EditorActions.from = function (view, eventDispatcher, transformer) {
        var editorActions = new EditorActions();
        editorActions._privateRegisterEditor(view, eventDispatcher, transformer);
        return editorActions;
    };
    // This method needs to be public for context based helper components.
    EditorActions.prototype._privateGetEditorView = function () {
        return this.editorView;
    };
    EditorActions.prototype._privateGetEventDispatcher = function () {
        return this.eventDispatcher;
    };
    // This method needs to be public for EditorContext component.
    EditorActions.prototype._privateRegisterEditor = function (editorView, eventDispatcher, contentTransformer) {
        this.contentTransformer = contentTransformer;
        this.eventDispatcher = eventDispatcher;
        if (!this.editorView && editorView) {
            this.editorView = editorView;
            this.listeners.forEach(function (cb) { return cb(editorView, eventDispatcher); });
        }
        else if (this.editorView !== editorView) {
            throw new Error("Editor has already been registered! It's not allowed to re-register editor with the new Editor instance.");
        }
    };
    // This method needs to be public for EditorContext component.
    EditorActions.prototype._privateUnregisterEditor = function () {
        this.editorView = undefined;
        this.contentTransformer = undefined;
        this.eventDispatcher = undefined;
    };
    EditorActions.prototype._privateSubscribe = function (cb) {
        // If editor is registered and somebody is trying to add a listener,
        // just call it first.
        if (this.editorView && this.eventDispatcher) {
            cb(this.editorView, this.eventDispatcher);
        }
        this.listeners.push(cb);
    };
    EditorActions.prototype._privateUnsubscribe = function (cb) {
        this.listeners = this.listeners.filter(function (c) { return c !== cb; });
    };
    EditorActions.prototype.focus = function () {
        if (!this.editorView || this.editorView.hasFocus()) {
            return false;
        }
        this.editorView.focus();
        this.editorView.dispatch(this.editorView.state.tr.scrollIntoView());
        return true;
    };
    EditorActions.prototype.blur = function () {
        if (!this.editorView || !this.editorView.hasFocus()) {
            return false;
        }
        this.editorView.dom.blur();
        return true;
    };
    EditorActions.prototype.clear = function () {
        if (!this.editorView) {
            return false;
        }
        var editorView = this.editorView;
        var state = editorView.state;
        var tr = editorView.state.tr
            .setSelection(prosemirror_state_1.TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
            .deleteSelection();
        editorView.dispatch(tr);
        return true;
    };
    EditorActions.prototype.getValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.getEditorValueWithMedia(this.editorView)];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            return [2 /*return*/];
                        }
                        if (this.contentTransformer) {
                            return [2 /*return*/, this.contentTransformer.encode(doc)];
                        }
                        return [2 /*return*/, utils_1.compose(utils_1.removeQueryMarksFromJSON, utils_1.toJSON)(doc)];
                }
            });
        });
    };
    EditorActions.prototype.replaceDocument = function (rawValue, shouldScrollToBottom) {
        if (shouldScrollToBottom === void 0) { shouldScrollToBottom = true; }
        if (!this.editorView || rawValue === undefined || rawValue === null) {
            return false;
        }
        var state = this.editorView.state;
        var schema = state.schema;
        var transformedDoc = this.contentTransformer
            ? this.contentTransformer.parse(rawValue).toJSON()
            : rawValue;
        var content = utils_1.processRawValue(schema, transformedDoc);
        if (!content) {
            return false;
        }
        // In case of replacing a whole document, we only need a content of a top level node e.g. document.
        var tr = state.tr.replaceWith(0, state.doc.nodeSize - 2, content.content);
        if (shouldScrollToBottom) {
            tr = tr.scrollIntoView();
        }
        this.editorView.dispatch(tr);
        return true;
    };
    EditorActions.prototype.replaceSelection = function (rawValue) {
        if (!this.editorView) {
            return false;
        }
        var state = this.editorView.state;
        if (!rawValue) {
            var tr = state.tr.deleteSelection().scrollIntoView();
            this.editorView.dispatch(tr);
            return true;
        }
        var schema = state.schema;
        var content = utils_1.processRawValue(schema, rawValue);
        if (!content) {
            return false;
        }
        // try to find a place in the document where to insert a node if its not allowed at the cursor position by schema
        this.editorView.dispatch(prosemirror_utils_1.safeInsert(content)(state.tr).scrollIntoView());
        return true;
    };
    EditorActions.prototype.appendText = function (text) {
        if (!this.editorView || !text) {
            return false;
        }
        var state = this.editorView.state;
        var lastChild = state.doc.lastChild;
        if (lastChild && lastChild.type !== state.schema.nodes.paragraph) {
            return false;
        }
        var tr = state.tr.insertText(text).scrollIntoView();
        this.editorView.dispatch(tr);
        return true;
    };
    EditorActions.prototype.insertFileFromDataUrl = function (url, filename) {
        if (!this.editorView) {
            return false;
        }
        utils_1.insertFileFromDataUrl(this.editorView.state, url, filename);
        return true;
    };
    return EditorActions;
}());
exports.default = EditorActions;
//# sourceMappingURL=index.js.map