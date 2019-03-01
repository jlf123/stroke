"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var react_intl_1 = require("react-intl");
var event_dispatcher_1 = require("../event-dispatcher");
var utils_1 = require("../utils");
var create_plugins_list_1 = require("./create-plugins-list");
var editor_disabled_1 = require("../plugins/editor-disabled");
var create_editor_1 = require("./create-editor");
var ReactEditorView = /** @class */ (function (_super) {
    tslib_1.__extends(ReactEditorView, _super);
    function ReactEditorView(props) {
        var _this = _super.call(this, props) || this;
        _this.broadcastDisabled = function (disabled) {
            var editorView = _this.view;
            if (editorView) {
                var tr = editorView.state.tr.setMeta(editor_disabled_1.pluginKey, {
                    editorDisabled: disabled,
                });
                tr.setMeta('isLocal', true);
                editorView.dispatch(tr);
            }
        };
        _this.createEditorState = function (options) {
            if (_this.view) {
                /**
                 * There's presently a number of issues with changing the schema of a
                 * editor inflight. A significant issue is that we lose the ability
                 * to keep track of a user's history as the internal plugin state
                 * keeps a list of Steps to undo/redo (which are tied to the schema).
                 * Without a good way to do work around this, we prevent this for now.
                 */
                // tslint:disable-next-line:no-console
                console.warn('The editor does not support changing the schema dynamically.');
                return _this.editorState;
            }
            _this.config = create_editor_1.processPluginsList(_this.getPlugins(options.props.editorProps, options.props.createAnalyticsEvent), options.props.editorProps);
            var schema = create_editor_1.createSchema(_this.config);
            var _a = options.props.editorProps, contentTransformerProvider = _a.contentTransformerProvider, defaultValue = _a.defaultValue, errorReporterHandler = _a.errorReporterHandler;
            _this.eventDispatcher = new event_dispatcher_1.EventDispatcher();
            var dispatch = event_dispatcher_1.createDispatch(_this.eventDispatcher);
            var errorReporter = create_editor_1.createErrorReporter(errorReporterHandler);
            var plugins = create_editor_1.createPMPlugins({
                schema: schema,
                dispatch: dispatch,
                errorReporter: errorReporter,
                editorConfig: _this.config,
                props: options.props.editorProps,
                eventDispatcher: _this.eventDispatcher,
                providerFactory: options.props.providerFactory,
                portalProviderAPI: _this.props.portalProviderAPI,
                reactContext: function () { return _this.context; },
            });
            _this.contentTransformer = contentTransformerProvider
                ? contentTransformerProvider(schema)
                : undefined;
            var doc;
            if (options.replaceDoc) {
                doc =
                    _this.contentTransformer && typeof defaultValue === 'string'
                        ? _this.contentTransformer.parse(defaultValue)
                        : utils_1.processRawValue(schema, defaultValue);
            }
            var selection;
            if (doc) {
                // ED-4759: Don't set selection at end for full-page editor - should be at start
                selection =
                    options.props.editorProps.appearance === 'full-page'
                        ? prosemirror_state_1.Selection.atStart(doc)
                        : prosemirror_state_1.Selection.atEnd(doc);
            }
            // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
            var patchedSelection = selection
                ? prosemirror_state_1.Selection.findFrom(selection.$head, -1, true) || undefined
                : undefined;
            return prosemirror_state_1.EditorState.create({
                schema: schema,
                plugins: plugins,
                doc: doc,
                selection: patchedSelection,
            });
        };
        _this.createEditorView = function (node) {
            // Creates the editor-view from this.editorState. If an editor has been mounted
            // previously, this will contain the previous state of the editor.
            _this.view = new prosemirror_view_1.EditorView({ mount: node }, {
                state: _this.editorState,
                dispatchTransaction: function (transaction) {
                    if (!_this.view) {
                        return;
                    }
                    var editorState = _this.view.state.apply(transaction);
                    _this.view.updateState(editorState);
                    if (_this.props.editorProps.onChange && transaction.docChanged) {
                        _this.props.editorProps.onChange(_this.view);
                    }
                    _this.editorState = editorState;
                },
                // Disables the contentEditable attribute of the editor if the editor is disabled
                editable: function (state) { return !_this.props.editorProps.disabled; },
                attributes: { 'data-gramm': 'false' },
            });
        };
        _this.handleEditorViewRef = function (node) {
            if (!_this.view && node) {
                _this.createEditorView(node);
                _this.props.onEditorCreated({
                    view: _this.view,
                    config: _this.config,
                    eventDispatcher: _this.eventDispatcher,
                    transformer: _this.contentTransformer,
                });
                // Set the state of the EditorDisabled plugin to the current value
                _this.broadcastDisabled(!!_this.props.editorProps.disabled);
                // Force React to re-render so consumers get a reference to the editor view
                _this.forceUpdate();
            }
            else if (_this.view && !node) {
                // When the appearance is changed, React will call handleEditorViewRef with node === null
                // to destroy the old EditorView, before calling this method again with node === div to
                // create the new EditorView
                _this.props.onEditorDestroyed({
                    view: _this.view,
                    config: _this.config,
                    eventDispatcher: _this.eventDispatcher,
                    transformer: _this.contentTransformer,
                });
                _this.view.destroy(); // Destroys the dom node & all node views
                _this.view = undefined;
            }
        };
        create_editor_1.initAnalytics(props.editorProps.analyticsHandler);
        _this.editorState = _this.createEditorState({ props: props, replaceDoc: true });
        return _this;
    }
    ReactEditorView.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.view &&
            this.props.editorProps.disabled !== nextProps.editorProps.disabled) {
            this.broadcastDisabled(!!nextProps.editorProps.disabled);
            // Disables the contentEditable attribute of the editor if the editor is disabled
            this.view.setProps({
                editable: function (state) { return !nextProps.editorProps.disabled; },
            });
        }
    };
    /**
     * Clean up any non-PM resources when the editor is unmounted
     */
    ReactEditorView.prototype.componentWillUnmount = function () {
        this.eventDispatcher.destroy();
        if (this.view) {
            // Destroy the state if the Editor is being unmounted
            var editorState_1 = this.view.state;
            editorState_1.plugins.forEach(function (plugin) {
                var state = plugin.getState(editorState_1);
                if (state && state.destroy) {
                    state.destroy();
                }
            });
        }
        // this.view will be destroyed when React unmounts in handleEditorViewRef
    };
    // Helper to allow tests to inject plugins directly
    ReactEditorView.prototype.getPlugins = function (editorProps, createAnalyticsEvent) {
        return create_plugins_list_1.default(editorProps, createAnalyticsEvent);
    };
    ReactEditorView.prototype.render = function () {
        var editor = React.createElement("div", { key: "ProseMirror", ref: this.handleEditorViewRef });
        return this.props.render
            ? this.props.render({
                editor: editor,
                view: this.view,
                config: this.config,
                eventDispatcher: this.eventDispatcher,
                transformer: this.contentTransformer,
            })
            : editor;
    };
    ReactEditorView.contextTypes = {
        getAtlaskitAnalyticsEventHandlers: PropTypes.func,
        intl: react_intl_1.intlShape,
    };
    return ReactEditorView;
}(React.Component));
exports.default = ReactEditorView;
//# sourceMappingURL=ReactEditorView.js.map