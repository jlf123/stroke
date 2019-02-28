import * as React from 'react';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import { media, mediaGroup, mediaSingle } from '@atlaskit/adf-schema';
import { stateKey as pluginKey, createPlugin, DefaultMediaStateManager, } from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import MediaSingleEdit from './ui/MediaSingleEdit';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import WithPluginState from '../../ui/WithPluginState';
import { akEditorFullPageMaxWidth } from '@atlaskit/editor-common';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { pluginKey as editorDisabledPluginKey } from '../editor-disabled';
export { DefaultMediaStateManager, };
var mediaPlugin = function (options) { return ({
    nodes: function () {
        return [
            { name: 'mediaGroup', node: mediaGroup },
            { name: 'mediaSingle', node: mediaSingle },
            { name: 'media', node: media },
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
                    return createPlugin(schema, {
                        providerFactory: providerFactory,
                        nodeViews: {
                            mediaGroup: ReactMediaGroupNode(portalProviderAPI, props.appearance),
                            mediaSingle: ReactMediaSingleNode(portalProviderAPI, eventDispatcher, props.appearance),
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
                    return keymapPlugin();
                } },
        ].concat(options && options.allowMediaSingle
            ? {
                name: 'mediaSingleKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapMediaSinglePlugin(schema);
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
        return (React.createElement(WithPluginState, { editorView: editorView, plugins: {
                mediaState: pluginKey,
                disabled: editorDisabledPluginKey,
            }, render: function (_a) {
                var mediaState = _a.mediaState, disabled = _a.disabled;
                var _b = mediaState, target = _b.element, layout = _b.layout;
                var node = mediaState.selectedMediaNode();
                var isFullPage = appearance === 'full-page';
                var allowBreakout = !!(node &&
                    node.attrs &&
                    node.attrs.width > akEditorFullPageMaxWidth &&
                    isFullPage);
                var allowLayout = isFullPage && !!mediaState.isLayoutSupported();
                var allowResizing = mediaState.getMediaOptions().allowResizing;
                return (React.createElement(MediaSingleEdit, { pluginState: mediaState, allowBreakout: allowBreakout, allowLayout: allowLayout, layout: layout, target: target, allowResizing: allowResizing, editorDisabled: disabled.editorDisabled }));
            } }));
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, disabled = _a.disabled;
        return (React.createElement(ToolbarMedia, { editorView: editorView, pluginKey: pluginKey, isDisabled: disabled, isReducedSpacing: true }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.filesAndImages),
                    priority: 400,
                    keywords: ['media'],
                    icon: function () { return (React.createElement(EditorImageIcon, { label: formatMessage(messages.filesAndImages) })); },
                    action: function (insert, state) {
                        var pluginState = pluginKey.getState(state);
                        pluginState.showMediaPicker();
                        return insert('');
                    },
                },
            ];
        },
    },
}); };
export default mediaPlugin;
//# sourceMappingURL=index.js.map