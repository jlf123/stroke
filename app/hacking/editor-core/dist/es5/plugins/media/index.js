"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var image_1 = require("@atlaskit/icon/glyph/editor/image");
var adf_schema_1 = require("@atlaskit/adf-schema");
var main_1 = require("./pm-plugins/main");
exports.DefaultMediaStateManager = main_1.DefaultMediaStateManager;
var keymap_media_single_1 = require("./pm-plugins/keymap-media-single");
var keymap_1 = require("./pm-plugins/keymap");
var ToolbarMedia_1 = require("./ui/ToolbarMedia");
var MediaSingleEdit_1 = require("./ui/MediaSingleEdit");
var mediaGroup_1 = require("./nodeviews/mediaGroup");
var mediaSingle_1 = require("./nodeviews/mediaSingle");
var WithPluginState_1 = require("../../ui/WithPluginState");
var editor_common_1 = require("@atlaskit/editor-common");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var editor_disabled_1 = require("../editor-disabled");
var mediaPlugin = function (options) { return ({
    nodes: function () {
        return [
            { name: 'mediaGroup', node: adf_schema_1.mediaGroup },
            { name: 'mediaSingle', node: adf_schema_1.mediaSingle },
            { name: 'media', node: adf_schema_1.media },
        ].filter(function (node) {
            var _a = options || {}, _b = _a.allowMediaGroup, allowMediaGroup = _b === void 0 ? true : _b, _c = _a.allowMediaSingle, allowMediaSingle = _c === void 0 ? false : _c;
            if (node.name === 'mediaGroup') {
                return allowMediaGroup;
            }
            if (node.name === 'mediaSingle') {
                return allowMediaSingle;
            }
            return true;
        });
    },
    pmPlugins: function () {
        return [
            {
                name: 'media',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, dispatch = _a.dispatch, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, errorReporter = _a.errorReporter, portalProviderAPI = _a.portalProviderAPI, reactContext = _a.reactContext;
                    return main_1.createPlugin(schema, {
                        providerFactory: providerFactory,
                        nodeViews: {
                            mediaGroup: mediaGroup_1.ReactMediaGroupNode(portalProviderAPI, props.appearance),
                            mediaSingle: mediaSingle_1.ReactMediaSingleNode(portalProviderAPI, eventDispatcher, props.appearance),
                        },
                        errorReporter: errorReporter,
                        uploadErrorHandler: props.uploadErrorHandler,
                        waitForMediaUpload: props.waitForMediaUpload,
                        customDropzoneContainer: options && options.customDropzoneContainer,
                        customMediaPicker: options && options.customMediaPicker,
                        appearance: props.appearance,
                        allowResizing: !!(options && options.allowResizing),
                    }, reactContext, dispatch, props.appearance);
                },
            },
            { name: 'mediaKeymap', plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default();
                } },
        ].concat(options && options.allowMediaSingle
            ? {
                name: 'mediaSingleKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_media_single_1.default(schema);
                },
            }
            : []);
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance;
        if (!options) {
            return null;
        }
        var allowMediaSingle = options.allowMediaSingle;
        var disableLayout;
        if (typeof allowMediaSingle === 'object') {
            disableLayout = allowMediaSingle.disableLayout;
        }
        if ((typeof allowMediaSingle === 'boolean' && allowMediaSingle === false) ||
            (typeof disableLayout === 'boolean' && disableLayout === true)) {
            return null;
        }
        return (React.createElement(WithPluginState_1.default, { editorView: editorView, plugins: {
                mediaState: main_1.stateKey,
                disabled: editor_disabled_1.pluginKey,
            }, render: function (_a) {
                var mediaState = _a.mediaState, disabled = _a.disabled;
                var _b = mediaState, target = _b.element, layout = _b.layout;
                var node = mediaState.selectedMediaNode();
                var isFullPage = appearance === 'full-page';
                var allowBreakout = !!(node &&
                    node.attrs &&
                    node.attrs.width > editor_common_1.akEditorFullPageMaxWidth &&
                    isFullPage);
                var allowLayout = isFullPage && !!mediaState.isLayoutSupported();
                var allowResizing = mediaState.getMediaOptions().allowResizing;
                return (React.createElement(MediaSingleEdit_1.default, { pluginState: mediaState, allowBreakout: allowBreakout, allowLayout: allowLayout, layout: layout, target: target, allowResizing: allowResizing, editorDisabled: disabled.editorDisabled }));
            } }));
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, disabled = _a.disabled;
        return (React.createElement(ToolbarMedia_1.default, { editorView: editorView, pluginKey: main_1.stateKey, isDisabled: disabled, isReducedSpacing: true }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.filesAndImages),
                    priority: 400,
                    keywords: ['media'],
                    icon: function () { return (React.createElement(image_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.filesAndImages) })); },
                    action: function (insert, state) {
                        var pluginState = main_1.stateKey.getState(state);
                        pluginState.showMediaPicker();
                        return insert('');
                    },
                },
            ];
        },
    },
}); };
exports.default = mediaPlugin;
//# sourceMappingURL=index.js.map