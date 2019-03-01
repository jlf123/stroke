"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var uuid = require("uuid");
var prosemirror_state_1 = require("prosemirror-state");
var mention_1 = require("@atlaskit/icon/glyph/editor/mention");
var mention_2 = require("@atlaskit/mention");
var adf_schema_1 = require("@atlaskit/adf-schema");
var analytics_1 = require("../../analytics");
var WithPluginState_1 = require("../../ui/WithPluginState");
var main_1 = require("../type-ahead/pm-plugins/main");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var nodeviews_1 = require("../../nodeviews");
var ToolbarMention_1 = require("./ui/ToolbarMention");
var mention_3 = require("./nodeviews/mention");
var analytics_2 = require("./analytics");
var mentionsPlugin = function (createAnalyticsEvent) {
    var sessionId = uuid();
    var fireEvent = function (payload) {
        if (createAnalyticsEvent) {
            if (payload.attributes && !payload.attributes.sessionId) {
                payload.attributes.sessionId = sessionId;
            }
            createAnalyticsEvent(payload).fire(mention_2.ELEMENTS_CHANNEL);
        }
    };
    return {
        nodes: function () {
            return [{ name: 'mention', node: adf_schema_1.mention }];
        },
        pmPlugins: function () {
            return [
                {
                    name: 'mention',
                    plugin: function (_a) {
                        var providerFactory = _a.providerFactory, dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
                        return mentionPluginFactory(dispatch, providerFactory, portalProviderAPI, fireEvent);
                    },
                },
            ];
        },
        secondaryToolbarComponent: function (_a) {
            var editorView = _a.editorView, disabled = _a.disabled;
            return (React.createElement(WithPluginState_1.default, { editorView: editorView, plugins: {
                    typeAheadState: main_1.pluginKey,
                    mentionState: exports.mentionPluginKey,
                }, render: function (_a) {
                    var _b = _a.typeAheadState, typeAheadState = _b === void 0 ? main_1.createInitialPluginState() : _b, _c = _a.mentionState, mentionState = _c === void 0 ? {} : _c;
                    return !mentionState.provider ? null : (React.createElement(ToolbarMention_1.default, { editorView: editorView, isDisabled: disabled || !typeAheadState.isAllowed }));
                } }));
        },
        pluginsOptions: {
            quickInsert: function (_a) {
                var formatMessage = _a.formatMessage;
                return [
                    {
                        title: formatMessage(ToolbarInsertBlock_1.messages.mention),
                        priority: 400,
                        icon: function () { return React.createElement(mention_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.mention) }); },
                        action: function (insert, state) {
                            var mark = state.schema.mark('typeAheadQuery', {
                                trigger: '@',
                            });
                            var mentionText = state.schema.text('@', [mark]);
                            return insert(mentionText);
                        },
                    },
                ];
            },
            typeAhead: {
                trigger: '@',
                // Custom regex must have a capture group around trigger
                // so it's possible to use it without needing to scan through all triggers again
                customRegex: '\\(?(@)',
                getItems: function (query, state, intl, _a) {
                    var prevActive = _a.prevActive, queryChanged = _a.queryChanged;
                    if (!prevActive && queryChanged) {
                        analytics_1.analyticsService.trackEvent('atlassian.fabric.mention.picker.trigger.shortcut');
                    }
                    var pluginState = getMentionPluginState(state);
                    var mentions = !prevActive && queryChanged ? [] : pluginState.mentions || [];
                    if (queryChanged && pluginState.provider) {
                        pluginState.provider.filter(query || '');
                    }
                    return mentions.map(function (mention) { return ({
                        title: mention.id,
                        render: function (_a) {
                            var isSelected = _a.isSelected, onClick = _a.onClick, onMouseMove = _a.onMouseMove;
                            return (React.createElement(mention_2.MentionItem, { mention: mention, selected: isSelected, onMouseMove: onMouseMove, onSelection: onClick }));
                        },
                        mention: mention,
                    }); });
                },
                selectItem: function (state, item, insert, _a) {
                    var mode = _a.mode;
                    var pluginState = getMentionPluginState(state);
                    var _b = item.mention, id = _b.id, name = _b.name, nickname = _b.nickname, accessLevel = _b.accessLevel, userType = _b.userType;
                    var renderName = nickname ? nickname : name;
                    var typeAheadPluginState = main_1.pluginKey.getState(state);
                    var pickerElapsedTime = typeAheadPluginState.queryStarted
                        ? Date.now() - typeAheadPluginState.queryStarted
                        : 0;
                    analytics_1.analyticsService.trackEvent('atlassian.fabric.mention.picker.insert', tslib_1.__assign({ mode: mode, isSpecial: mention_2.isSpecialMention(item.mention) || false, accessLevel: accessLevel || '', mentionee: id, duration: pickerElapsedTime, queryLength: (typeAheadPluginState.query || '').length }, pluginState.contextIdentifier));
                    fireEvent(analytics_2.buildTypeAheadInsertedPayload(pickerElapsedTime, typeAheadPluginState.upKeyCount, typeAheadPluginState.downKeyCount, sessionId, mode, item.mention, pluginState.mentions, typeAheadPluginState.query || ''));
                    sessionId = uuid();
                    return insert(state.schema.nodes.mention.createChecked({
                        text: "@" + renderName,
                        id: id,
                        accessLevel: accessLevel,
                        userType: userType === 'DEFAULT' ? null : userType,
                    }));
                },
                dismiss: function (state) {
                    var typeAheadPluginState = main_1.pluginKey.getState(state);
                    var pickerElapsedTime = typeAheadPluginState.queryStarted
                        ? Date.now() - typeAheadPluginState.queryStarted
                        : 0;
                    fireEvent(analytics_2.buildTypeAheadCancelPayload(pickerElapsedTime, typeAheadPluginState.upKeyCount, typeAheadPluginState.downKeyCount, sessionId, typeAheadPluginState.query || ''));
                    sessionId = uuid();
                },
            },
        },
    };
};
exports.default = mentionsPlugin;
/**
 * Actions
 */
exports.ACTIONS = {
    SET_PROVIDER: 'SET_PROVIDER',
    SET_RESULTS: 'SET_RESULTS',
    SET_CONTEXT: 'SET_CONTEXT',
};
exports.setProvider = function (provider) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(exports.mentionPluginKey, {
            action: exports.ACTIONS.SET_PROVIDER,
            params: { provider: provider },
        }));
    }
    return true;
}; };
exports.setResults = function (results) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(exports.mentionPluginKey, {
            action: exports.ACTIONS.SET_RESULTS,
            params: { results: results },
        }));
    }
    return true;
}; };
exports.setContext = function (context) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(exports.mentionPluginKey, {
            action: exports.ACTIONS.SET_CONTEXT,
            params: { context: context },
        }));
    }
    return true;
}; };
/**
 *
 * ProseMirror Plugin
 *
 */
exports.mentionPluginKey = new prosemirror_state_1.PluginKey('mentionPlugin');
function getMentionPluginState(state) {
    return exports.mentionPluginKey.getState(state);
}
exports.getMentionPluginState = getMentionPluginState;
function mentionPluginFactory(dispatch, providerFactory, portalProviderAPI, fireEvent) {
    var mentionProvider;
    return new prosemirror_state_1.Plugin({
        key: exports.mentionPluginKey,
        state: {
            init: function () {
                return {};
            },
            apply: function (tr, pluginState) {
                var _a = tr.getMeta(exports.mentionPluginKey) || {
                    action: null,
                    params: null,
                }, action = _a.action, params = _a.params;
                var newPluginState = pluginState;
                switch (action) {
                    case exports.ACTIONS.SET_PROVIDER:
                        newPluginState = tslib_1.__assign({}, pluginState, { provider: params.provider });
                        dispatch(exports.mentionPluginKey, newPluginState);
                        return newPluginState;
                    case exports.ACTIONS.SET_RESULTS:
                        newPluginState = tslib_1.__assign({}, pluginState, { mentions: params.results });
                        dispatch(exports.mentionPluginKey, newPluginState);
                        return newPluginState;
                    case exports.ACTIONS.SET_CONTEXT:
                        newPluginState = tslib_1.__assign({}, pluginState, { contextIdentifier: params.context });
                        dispatch(exports.mentionPluginKey, newPluginState);
                        return newPluginState;
                }
                return newPluginState;
            },
        },
        props: {
            nodeViews: {
                mention: nodeviews_1.ReactNodeView.fromComponent(mention_3.default, portalProviderAPI, { providerFactory: providerFactory }),
            },
        },
        view: function (editorView) {
            var providerHandler = function (name, providerPromise) {
                switch (name) {
                    case 'mentionProvider':
                        if (!providerPromise) {
                            return exports.setProvider(undefined)(editorView.state, editorView.dispatch);
                        }
                        providerPromise
                            .then(function (provider) {
                            if (mentionProvider) {
                                mentionProvider.unsubscribe('mentionPlugin');
                            }
                            // Preload mentions, and populate cache
                            if (provider) {
                                provider.filter('');
                            }
                            mentionProvider = provider;
                            exports.setProvider(provider)(editorView.state, editorView.dispatch);
                            provider.subscribe('mentionPlugin', function (mentions, query, stats) {
                                exports.setResults(mentions)(editorView.state, editorView.dispatch);
                                if (stats && stats.remoteSearch) {
                                    fireEvent(analytics_2.buildTypeAheadRenderedPayload(stats.duration, mentions.map(function (mention) { return mention.id; }), query || ''));
                                }
                            });
                        })
                            .catch(function () {
                            return exports.setProvider(undefined)(editorView.state, editorView.dispatch);
                        });
                        break;
                    case 'contextIdentifierProvider':
                        if (!providerPromise) {
                            return exports.setContext(undefined)(editorView.state, editorView.dispatch);
                        }
                        providerPromise.then(function (provider) {
                            exports.setContext(provider)(editorView.state, editorView.dispatch);
                        });
                        break;
                }
            };
            providerFactory.subscribe('mentionProvider', providerHandler);
            providerFactory.subscribe('contextIdentifierProvider', providerHandler);
            return {
                destroy: function () {
                    if (providerFactory) {
                        providerFactory.unsubscribe('mentionProvider', providerHandler);
                        providerFactory.unsubscribe('contextIdentifierProvider', providerHandler);
                    }
                    if (mentionProvider) {
                        mentionProvider.unsubscribe('mentionPlugin');
                    }
                },
            };
        },
    });
}
//# sourceMappingURL=index.js.map