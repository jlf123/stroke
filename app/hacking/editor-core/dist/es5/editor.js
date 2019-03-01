"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var react_intl_1 = require("react-intl");
var editor_common_1 = require("@atlaskit/editor-common");
var create_editor_1 = require("./create-editor");
var actions_1 = require("./actions");
var create_editor_2 = require("./create-editor");
var EditorContext_1 = require("./ui/EditorContext");
var WithCreateAnalyticsEvent_1 = require("./ui/WithCreateAnalyticsEvent");
var PortalProvider_1 = require("./ui/PortalProvider");
var version_1 = require("./version");
var smart_card_1 = require("@atlaskit/smart-card");
var nodeviews_1 = require("./nodeviews");
// allows connecting external React.Context through to nodeviews
var ContextAdapter = nodeviews_1.createContextAdapter({
    card: smart_card_1.Context,
});
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props, context) {
        var _this = _super.call(this, props) || this;
        _this.handleSave = function (view) {
            if (!_this.props.onSave) {
                return;
            }
            // ED-4021: if you type a short amount of content
            // inside a content-editable on Android, Chrome only sends a
            // compositionend when it feels like it.
            //
            // to work around the PM editable being out of sync with
            // the document, force a DOM sync before calling onSave
            // if we've already started typing
            // @ts-ignore
            if (view['inDOMChange']) {
                // @ts-ignore
                view['inDOMChange'].finish(true);
            }
            return _this.props.onSave(view);
        };
        _this.providerFactory = new editor_common_1.ProviderFactory();
        _this.deprecationWarnings(props);
        _this.onEditorCreated = _this.onEditorCreated.bind(_this);
        _this.onEditorDestroyed = _this.onEditorDestroyed.bind(_this);
        _this.editorActions = (context || {}).editorActions || new actions_1.default();
        return _this;
    }
    Editor.prototype.componentDidMount = function () {
        this.handleProviders(this.props);
    };
    Editor.prototype.componentWillReceiveProps = function (nextProps) {
        this.handleProviders(nextProps);
    };
    Editor.prototype.componentWillUnmount = function () {
        this.unregisterEditorFromActions();
        this.providerFactory.destroy();
    };
    Editor.prototype.onEditorCreated = function (instance) {
        this.registerEditorForActions(instance.view, instance.eventDispatcher, instance.transformer);
        if (this.props.shouldFocus) {
            if (!instance.view.hasFocus()) {
                window.setTimeout(function () {
                    instance.view.focus();
                }, 0);
            }
        }
    };
    Editor.prototype.deprecationWarnings = function (props) {
        var nextVersion = version_1.nextMajorVersion();
        var deprecatedProperties = {
            mediaProvider: {
                message: 'To pass media provider use media property – <Editor media={{ provider }} />',
                type: 'removed',
            },
            allowTasksAndDecisions: {
                message: 'To allow tasks and decisions use taskDecisionProvider – <Editor taskDecisionProvider={{ provider }} />',
                type: 'removed',
            },
            allowPlaceholderCursor: {
                type: 'removed',
            },
            allowInlineAction: {
                type: 'removed',
            },
            allowConfluenceInlineComment: {
                type: 'removed',
            },
            addonToolbarComponents: {
                type: 'removed',
            },
            cardProvider: {
                type: 'removed',
            },
            allowCodeBlocks: {
                message: 'To disable codeBlocks use - <Editor allowBlockTypes={{ exclude: ["codeBlocks"] }} />',
            },
            allowLists: {},
            allowHelpDialog: {},
            allowGapCursor: {
                type: 'removed',
            },
            allowUnsupportedContent: {
                message: 'Deprecated. Defaults to true.',
                type: 'removed',
            },
        };
        Object.keys(deprecatedProperties).forEach(function (property) {
            if (props.hasOwnProperty(property)) {
                var meta = deprecatedProperties[property];
                var type = meta.type || 'enabled by default';
                // tslint:disable-next-line:no-console
                console.warn(property + " property is deprecated. " + (meta.message ||
                    '') + " [Will be " + type + " in editor-core@" + nextVersion + "]");
            }
        });
        if (!props.hasOwnProperty('appearance')) {
            // tslint:disable-next-line:no-console
            console.warn("The default appearance is changing from \"message\" to \"comment\", to main current behaviour use <Editor appearance=\"message\" />. [Will be changed in editor-core@" + nextVersion + "]");
        }
        if (props.hasOwnProperty('quickInsert') &&
            typeof props.quickInsert === 'boolean') {
            // tslint:disable-next-line:no-console
            console.warn("quickInsert property is deprecated. [Will be enabled by default in editor-core@" + nextVersion + "]");
        }
        if (props.hasOwnProperty('allowTables') &&
            typeof props.allowTables !== 'boolean' &&
            !props.allowTables.advanced) {
            // tslint:disable-next-line:no-console
            console.warn("Advanced table options are deprecated (except isHeaderRowRequired) to continue using advanced table features use - <Editor allowTables={{ advanced: true }} /> [Will be changed in editor-core@" + nextVersion + "]");
        }
    };
    Editor.prototype.onEditorDestroyed = function (instance) {
        this.unregisterEditorFromActions();
    };
    Editor.prototype.registerEditorForActions = function (editorView, eventDispatcher, contentTransformer) {
        this.editorActions._privateRegisterEditor(editorView, eventDispatcher, contentTransformer);
    };
    Editor.prototype.unregisterEditorFromActions = function () {
        if (this.editorActions) {
            this.editorActions._privateUnregisterEditor();
        }
    };
    Editor.prototype.handleProviders = function (props) {
        var emojiProvider = props.emojiProvider, mentionProvider = props.mentionProvider, mediaProvider = props.mediaProvider, taskDecisionProvider = props.taskDecisionProvider, contextIdentifierProvider = props.contextIdentifierProvider, collabEditProvider = props.collabEditProvider, activityProvider = props.activityProvider, presenceProvider = props.presenceProvider, macroProvider = props.macroProvider, legacyImageUploadProvider = props.legacyImageUploadProvider, media = props.media, collabEdit = props.collabEdit, quickInsert = props.quickInsert, UNSAFE_cards = props.UNSAFE_cards;
        this.providerFactory.setProvider('emojiProvider', emojiProvider);
        this.providerFactory.setProvider('mentionProvider', mentionProvider);
        this.providerFactory.setProvider('taskDecisionProvider', taskDecisionProvider);
        this.providerFactory.setProvider('contextIdentifierProvider', contextIdentifierProvider);
        this.providerFactory.setProvider('mediaProvider', media && media.provider ? media.provider : mediaProvider);
        this.providerFactory.setProvider('imageUploadProvider', legacyImageUploadProvider);
        this.providerFactory.setProvider('collabEditProvider', collabEdit && collabEdit.provider
            ? collabEdit.provider
            : collabEditProvider);
        this.providerFactory.setProvider('activityProvider', activityProvider);
        this.providerFactory.setProvider('presenceProvider', presenceProvider);
        this.providerFactory.setProvider('macroProvider', macroProvider);
        if (UNSAFE_cards && UNSAFE_cards.provider) {
            this.providerFactory.setProvider('cardProvider', UNSAFE_cards.provider);
        }
        if (quickInsert && typeof quickInsert !== 'boolean') {
            this.providerFactory.setProvider('quickInsertProvider', quickInsert.provider);
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        var Component = create_editor_1.getUiComponent(this.props.appearance);
        var overriddenEditorProps = tslib_1.__assign({}, this.props, { onSave: this.props.onSave ? this.handleSave : undefined });
        var editor = (React.createElement(editor_common_1.WidthProvider, null,
            React.createElement(EditorContext_1.default, { editorActions: this.editorActions },
                React.createElement(WithCreateAnalyticsEvent_1.WithCreateAnalyticsEvent, { render: function (createAnalyticsEvent) { return (React.createElement(ContextAdapter, null,
                        React.createElement(PortalProvider_1.PortalProvider, { render: function (portalProviderAPI) { return (React.createElement(React.Fragment, null,
                                React.createElement(create_editor_2.ReactEditorView, { editorProps: overriddenEditorProps, createAnalyticsEvent: createAnalyticsEvent, portalProviderAPI: portalProviderAPI, providerFactory: _this.providerFactory, onEditorCreated: _this.onEditorCreated, onEditorDestroyed: _this.onEditorDestroyed, disabled: _this.props.disabled, render: function (_a) {
                                        var editor = _a.editor, view = _a.view, eventDispatcher = _a.eventDispatcher, config = _a.config;
                                        return (React.createElement(editor_common_1.BaseTheme, { dynamicTextSizing: _this.props.allowDynamicTextSizing },
                                            React.createElement(Component, { disabled: _this.props.disabled, editorActions: _this.editorActions, editorDOMElement: editor, editorView: view, providerFactory: _this.providerFactory, eventDispatcher: eventDispatcher, maxHeight: _this.props.maxHeight, onSave: _this.props.onSave ? _this.handleSave : undefined, onCancel: _this.props.onCancel, popupsMountPoint: _this.props.popupsMountPoint, popupsBoundariesElement: _this.props.popupsBoundariesElement, contentComponents: config.contentComponents, primaryToolbarComponents: config.primaryToolbarComponents, secondaryToolbarComponents: config.secondaryToolbarComponents, insertMenuItems: _this.props.insertMenuItems, customContentComponents: _this.props.contentComponents, customPrimaryToolbarComponents: _this.props.primaryToolbarComponents, customSecondaryToolbarComponents: _this.props.secondaryToolbarComponents, addonToolbarComponents: _this.props.addonToolbarComponents, collabEdit: _this.props.collabEdit })));
                                    } }),
                                React.createElement(PortalProvider_1.PortalRenderer, { portalProviderAPI: portalProviderAPI }))); } }))); } }))));
        return this.context.intl ? (editor) : (React.createElement(react_intl_1.IntlProvider, { locale: "en" }, editor));
    };
    Editor.defaultProps = {
        appearance: 'message',
        disabled: false,
        extensionHandlers: {},
    };
    Editor.contextTypes = {
        editorActions: PropTypes.object,
        intl: react_intl_1.intlShape,
    };
    return Editor;
}(React.Component));
exports.default = Editor;
//# sourceMappingURL=editor.js.map