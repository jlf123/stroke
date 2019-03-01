"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var emoji_1 = require("@atlaskit/emoji");
var analytics_1 = require("../../../../analytics");
var fabric_analytics_helper_1 = require("../../../../analytics/fabric-analytics-helper");
var EmojiTypeAhead = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiTypeAhead, _super);
    function EmojiTypeAhead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openTime = 0;
        _this.state = {};
        _this.handlePluginStateChange = function (state) {
            var anchorElement = state.anchorElement, query = state.query, queryActive = state.queryActive, focused = state.focused;
            _this.setState({ anchorElement: anchorElement, query: query, queryActive: queryActive, focused: focused });
        };
        _this.handleEmojiTypeAheadRef = function (ref) {
            _this.typeAhead = ref;
        };
        _this.calculateElapsedTime = function () { return Date.now() - _this.openTime; };
        _this.handleSelectedEmoji = function (emojiId, emoji) {
            var _emoji = emoji;
            _this.fireTypeAheadSelectedAnalytics(_emoji, _this.lastKeyTyped, _this.pluginState.query);
            _this.pluginState.insertEmoji(emojiId);
        };
        _this.handleSelectPrevious = function () {
            if (_this.typeAhead) {
                _this.typeAhead.selectPrevious();
                analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keyup', {});
            }
            return true;
        };
        _this.handleSelectNext = function () {
            if (_this.typeAhead) {
                _this.typeAhead.selectNext();
                analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keydown', {});
            }
            return true;
        };
        _this.fireTypeAheadSelectedAnalytics = function (emoji, key, query) {
            var queryLength = (query && query.length) || 0;
            var insertType = fabric_analytics_helper_1.getInsertTypeForKey(key) || fabric_analytics_helper_1.InsertType.SELECTED;
            analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.select', {
                mode: insertType,
                duration: _this.calculateElapsedTime() || 0,
                emojiId: (emoji && emoji.id) || '',
                type: (emoji && emoji.type) || '',
                queryLength: queryLength,
            });
        };
        _this.handleSpaceTyped = function () {
            analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.space', {});
        };
        _this.handleSpaceSelectCurrent = function (emoji, key, query) {
            _this.fireTypeAheadSelectedAnalytics(emoji, key, query);
        };
        _this.handleSelectCurrent = function (key) {
            _this.lastKeyTyped = key;
            if (_this.getEmojisCount() > 0) {
                _this.typeAhead.chooseCurrentSelection();
            }
            else {
                _this.pluginState.dismiss();
            }
            return true;
        };
        _this.handleOnOpen = function () {
            _this.lastKeyTyped = undefined;
            _this.openTime = Date.now();
            analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.open', {});
        };
        _this.handleOnClose = function () {
            analytics_1.analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.close', {});
        };
        return _this;
    }
    EmojiTypeAhead.prototype.componentWillMount = function () {
        this.setPluginState(this.props);
    };
    EmojiTypeAhead.prototype.componentWillUpdate = function (nextProps) {
        if (!this.pluginState) {
            this.setPluginState(nextProps);
        }
    };
    EmojiTypeAhead.prototype.componentWillUnmount = function () {
        var pluginState = this.pluginState;
        if (pluginState) {
            pluginState.unsubscribe(this.handlePluginStateChange);
        }
    };
    EmojiTypeAhead.prototype.setPluginState = function (props) {
        var editorView = props.editorView, pluginKey = props.pluginKey;
        if (!editorView) {
            return;
        }
        var pluginState = pluginKey.getState(editorView.state);
        if (pluginState) {
            this.pluginState = pluginState;
            pluginState.subscribe(this.handlePluginStateChange);
            // note: these bindings are required otherwise 'this' context won't be available
            pluginState.onSelectPrevious = this.handleSelectPrevious;
            pluginState.onSelectNext = this.handleSelectNext;
            pluginState.onSelectCurrent = this.handleSelectCurrent;
            // note: AkEmojiTypeAhead.onClose does not work (product-fabric.atlassian.net/browse/FS-1640)
            pluginState.onDismiss = this.handleOnClose;
            pluginState.onSpaceSelectCurrent = this.handleSpaceSelectCurrent;
            pluginState.onSpaceTyped = this.handleSpaceTyped;
        }
    };
    EmojiTypeAhead.prototype.render = function () {
        var _a = this.state, anchorElement = _a.anchorElement, query = _a.query, queryActive = _a.queryActive, focused = _a.focused;
        var _b = this.props, popupsBoundariesElement = _b.popupsBoundariesElement, popupsMountPoint = _b.popupsMountPoint, popupsScrollableElement = _b.popupsScrollableElement, emojiProvider = _b.emojiProvider;
        if (!focused ||
            !this.pluginState ||
            !anchorElement ||
            !queryActive ||
            !emojiProvider) {
            return null;
        }
        return (React.createElement(editor_common_1.Popup, { target: anchorElement, fitHeight: 350, fitWidth: 350, zIndex: editor_common_1.akEditorFloatingDialogZIndex, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, mountTo: popupsMountPoint, offset: [0, 3] },
            React.createElement(emoji_1.EmojiTypeAhead, { emojiProvider: emojiProvider, onSelection: this.handleSelectedEmoji, onOpen: this.handleOnOpen, query: query, ref: this.handleEmojiTypeAheadRef })));
    };
    EmojiTypeAhead.prototype.getEmojisCount = function () {
        return (this.typeAhead && this.typeAhead.count()) || 0;
    };
    return EmojiTypeAhead;
}(react_1.PureComponent));
exports.default = EmojiTypeAhead;
//# sourceMappingURL=index.js.map