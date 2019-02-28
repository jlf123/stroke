"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var utils_1 = require("../../../utils");
var nodeviews_1 = require("../../../nodeviews");
var emoji_1 = require("../nodeviews/emoji");
exports.emojiPluginKey = new prosemirror_state_1.PluginKey('emojiPlugin');
var EmojiState = /** @class */ (function () {
    function EmojiState(state, providerFactory) {
        var _this = this;
        this.enabled = true;
        this.focused = false;
        this.queryActive = false;
        this.onSelectPrevious = function () { return false; };
        this.onSelectNext = function () { return false; };
        this.onSelectCurrent = function (key) { return false; };
        this.onSpaceSelectCurrent = function (emoji, key, query) { };
        this.onSpaceTyped = function () { };
        this.onDismiss = function () { };
        this.changeHandlers = [];
        this.queryResult = [];
        this.insertEmoji = function (emojiId) {
            var _a = _this, state = _a.state, view = _a.view;
            var emoji = state.schema.nodes.emoji;
            if (emoji && emojiId) {
                var _b = _this.findEmojiQueryMark(), start = _b.start, end = _b.end;
                var node = emoji.create(tslib_1.__assign({}, emojiId, { text: emojiId.fallback || emojiId.shortName }));
                var textNode = state.schema.text(' ');
                // This problem affects Chrome v58-62. See: https://github.com/ProseMirror/prosemirror/issues/710
                if (utils_1.isChromeWithSelectionBug) {
                    var selection = document.getSelection();
                    if (selection) {
                        selection.empty();
                    }
                }
                view.dispatch(state.tr.replaceWith(start, end, [node, textNode]));
                view.focus();
                _this.queryActive = false;
                _this.query = undefined;
            }
            else {
                _this.dismiss();
            }
        };
        this.handleProvider = function (name, provider) {
            if (!provider) {
                return;
            }
            switch (name) {
                case 'emojiProvider':
                    provider
                        .then(function (emojiProvider) {
                        _this.emojiProvider = emojiProvider;
                        if (_this.emojiProvider) {
                            _this.emojiProvider.subscribe(_this.onProviderChange);
                        }
                    })
                        .catch(function () {
                        if (_this.emojiProvider) {
                            _this.emojiProvider.unsubscribe(_this.onProviderChange);
                        }
                        _this.emojiProvider = undefined;
                    });
                    break;
            }
        };
        this.trySelectCurrentWithSpace = function (key) {
            var emojisCount = _this.getEmojisCount();
            if (emojisCount === 1) {
                var lastQuery = _this.query;
                _this.insertEmoji(_this.queryResult[0]);
                _this.onSpaceSelectCurrent(_this.queryResult[0], key, lastQuery);
                return true;
            }
            else if (emojisCount === 0 || _this.isEmptyQuery()) {
                _this.dismiss();
            }
            _this.onSpaceTyped();
            return false;
        };
        this.getEmojisCount = function () {
            return (_this.queryResult && _this.queryResult.length) || 0;
        };
        this.isEmptyQuery = function () {
            return !_this.query || _this.query === ':';
        };
        this.onSearchResult = function (searchResults) {
            _this.queryResult = searchResults.emojis;
        };
        this.onProviderChange = {
            result: this.onSearchResult,
        };
        this.changeHandlers = [];
        this.state = state;
        providerFactory.subscribe('emojiProvider', this.handleProvider);
    }
    EmojiState.prototype.subscribe = function (cb) {
        this.changeHandlers.push(cb);
        cb(this);
    };
    EmojiState.prototype.unsubscribe = function (cb) {
        this.changeHandlers = this.changeHandlers.filter(function (ch) { return ch !== cb; });
    };
    EmojiState.prototype.notifySubscribers = function () {
        var _this = this;
        this.changeHandlers.forEach(function (cb) { return cb(_this); });
    };
    EmojiState.prototype.update = function (state) {
        this.state = state;
        if (!this.emojiProvider) {
            return;
        }
        var emojiQuery = state.schema.marks.emojiQuery;
        var doc = state.doc, selection = state.selection;
        var from = selection.from, to = selection.to;
        var dirty = false;
        var newEnabled = this.isEnabled();
        if (newEnabled !== this.enabled) {
            this.enabled = newEnabled;
            dirty = true;
        }
        if (doc.rangeHasMark(from - 1, to, emojiQuery)) {
            if (!this.queryActive) {
                dirty = true;
                this.queryActive = true;
            }
            var nodeBefore = selection.$from.nodeBefore /*nodeAfter*/;
            var newQuery = (nodeBefore && nodeBefore.textContent) || '';
            if (this.query !== newQuery) {
                dirty = true;
                this.query = newQuery;
            }
        }
        else if (this.queryActive) {
            dirty = true;
            this.dismiss();
            return;
        }
        var newAnchorElement = this.view.dom.querySelector('[data-emoji-query]');
        if (newAnchorElement !== this.anchorElement) {
            dirty = true;
            this.anchorElement = newAnchorElement;
        }
        if (dirty) {
            this.notifySubscribers();
        }
    };
    EmojiState.prototype.dismiss = function () {
        this.queryActive = false;
        this.query = undefined;
        var _a = this, state = _a.state, view = _a.view;
        if (state) {
            var schema = state.schema;
            var tr = state.tr;
            var markType = schema.mark('emojiQuery');
            view.dispatch(tr
                .removeMark(0, state.doc.nodeSize - 2, markType)
                .removeStoredMark(markType));
        }
        this.onDismiss();
        return true;
    };
    EmojiState.prototype.isEnabled = function () {
        var schema = this.state.schema;
        var emojiQuery = schema.marks.emojiQuery;
        return utils_1.isMarkTypeAllowedInCurrentSelection(emojiQuery, this.state);
    };
    EmojiState.prototype.findEmojiQueryMark = function () {
        var state = this.state;
        var doc = state.doc, schema = state.schema, selection = state.selection;
        var to = selection.to, from = selection.from;
        var emojiQuery = schema.marks.emojiQuery;
        var start = from;
        var node = doc.nodeAt(start);
        while (start > 0 && (!node || !emojiQuery.isInSet(node.marks))) {
            start--;
            node = doc.nodeAt(start);
        }
        var end = start;
        if (node && emojiQuery.isInSet(node.marks)) {
            var resolvedPos = doc.resolve(start);
            // -1 is to include : in replacement
            // resolvedPos.depth + 1 to make emoji work inside other blocks e.g. "list item" or "blockquote"
            start = resolvedPos.start(resolvedPos.depth + 1) - 1;
            end = start + node.nodeSize;
        }
        // Emoji inserted via picker
        if (start === 0 && end === 0) {
            start = from;
            end = to;
        }
        return { start: start, end: end };
    };
    EmojiState.prototype.updateEditorFocused = function (focused) {
        this.focused = focused;
        this.notifySubscribers();
    };
    EmojiState.prototype.setView = function (view) {
        this.view = view;
    };
    return EmojiState;
}());
exports.EmojiState = EmojiState;
function createPlugin(portalProviderAPI, providerFactory) {
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, state) {
                return new EmojiState(state, providerFactory);
            },
            apply: function (tr, pluginState, oldState, newState) {
                // NOTE: Don't call pluginState.update here.
                return pluginState;
            },
        },
        props: {
            nodeViews: {
                emoji: nodeviews_1.ReactNodeView.fromComponent(emoji_1.default, portalProviderAPI, {
                    providerFactory: providerFactory,
                }),
            },
            handleDOMEvents: {
                focus: function (view, event) {
                    exports.emojiPluginKey.getState(view.state).updateEditorFocused(true);
                    return false;
                },
                blur: function (view, event) {
                    exports.emojiPluginKey.getState(view.state).updateEditorFocused(false);
                    return false;
                },
            },
        },
        key: exports.emojiPluginKey,
        view: function (view) {
            var pluginState = exports.emojiPluginKey.getState(view.state);
            pluginState.setView(view);
            return {
                update: function (view, prevState) {
                    pluginState.update(view.state);
                },
                destroy: function () {
                    providerFactory.unsubscribe('emojiProvider', pluginState.handleProvider);
                },
            };
        },
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=main.js.map