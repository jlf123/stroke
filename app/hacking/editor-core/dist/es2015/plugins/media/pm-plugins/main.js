import * as tslib_1 from "tslib";
import * as assert from 'assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { insertPoint } from 'prosemirror-transform';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { NodeSelection, Plugin, PluginKey, } from 'prosemirror-state';
import { ErrorReporter } from '@atlaskit/editor-common';
import analyticsService from '../../../analytics/service';
import { isImage, SetAttrsStep } from '../../../utils';
import DropPlaceholder from '../ui/Media/DropPlaceholder';
import { insertMediaGroupNode, isNonImagesBanned } from '../utils/media-files';
import { removeMediaNode, splitMediaGroup } from '../utils/media-common';
import pickerFacadeLoader from '../picker-facade-loader';
import DefaultMediaStateManager from '../default-state-manager';
import { insertMediaSingleNode } from '../utils/media-single';
import { hasParentNodeOfType } from 'prosemirror-utils';
export { DefaultMediaStateManager };
var MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled'];
var MediaPluginState = /** @class */ (function () {
    function MediaPluginState(state, options, reactContext, editorAppearance) {
        var _this = this;
        this.allowsMedia = false;
        this.allowsUploads = false;
        this.ignoreLinks = false;
        this.waitForMediaUpload = true;
        this.allUploadsFinished = true;
        this.showDropzone = false;
        this.layout = 'center';
        this.mediaNodes = [];
        this.mediaGroupNodes = {};
        this.pendingTask = Promise.resolve(null);
        this.pluginStateChangeSubscribers = [];
        this.useDefaultStateManager = true;
        this.destroyed = false;
        this.pickers = [];
        this.removeOnCloseListener = function () { };
        this.setMediaProvider = function (mediaProvider) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var Picker, resolvedMediaProvider, _a, err_1, wrappedError, _b, stateManager, _c, view, allowsUploads, uploadContext;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!mediaProvider) {
                            this.destroyPickers();
                            this.allowsUploads = false;
                            this.allowsMedia = false;
                            this.notifyPluginStateSubscribers();
                            return [2 /*return*/];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, mediaProvider];
                    case 2:
                        resolvedMediaProvider = (_a.mediaProvider = _d.sent());
                        return [4 /*yield*/, pickerFacadeLoader()];
                    case 3:
                        Picker = _d.sent();
                        assert(resolvedMediaProvider && resolvedMediaProvider.viewContext, "MediaProvider promise did not resolve to a valid instance of MediaProvider - " + resolvedMediaProvider);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _d.sent();
                        wrappedError = new Error("Media functionality disabled due to rejected provider: " + err_1.message);
                        this.errorReporter.captureException(wrappedError);
                        this.destroyPickers();
                        this.allowsUploads = false;
                        this.allowsMedia = false;
                        this.notifyPluginStateSubscribers();
                        return [2 /*return*/];
                    case 5:
                        this.allowsMedia = true;
                        _b = this;
                        return [4 /*yield*/, this.mediaProvider.viewContext];
                    case 6:
                        _b.mediaContext = _d.sent();
                        stateManager = this.mediaProvider.stateManager;
                        if (stateManager && this.useDefaultStateManager) {
                            stateManager.destroy();
                            this.useDefaultStateManager = false;
                        }
                        if (stateManager) {
                            this.stateManager = stateManager;
                        }
                        this.allowsUploads = !!this.mediaProvider.uploadContext;
                        _c = this, view = _c.view, allowsUploads = _c.allowsUploads;
                        // make sure editable DOM node is mounted
                        if (view.dom.parentNode) {
                            // make PM plugin aware of the state change to update UI during 'apply' hook
                            view.dispatch(view.state.tr.setMeta(stateKey, { allowsUploads: allowsUploads }));
                        }
                        if (!this.allowsUploads) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.mediaProvider.uploadContext];
                    case 7:
                        uploadContext = _d.sent();
                        if (this.mediaProvider.uploadParams && uploadContext) {
                            this.initPickers(this.mediaProvider.uploadParams, uploadContext, Picker, this.reactContext);
                        }
                        else {
                            this.destroyPickers();
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        this.destroyPickers();
                        _d.label = 9;
                    case 9:
                        this.notifyPluginStateSubscribers();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getMediaOptions = function () { return _this.options; };
        this.updateUploadStateDebounce = null;
        this.insertFiles = function (mediaStates) {
            var stateManager = _this.stateManager;
            var mediaSingle = _this.view.state.schema.nodes.mediaSingle;
            var collection = _this.collectionFromProvider();
            if (collection === undefined) {
                return;
            }
            var imageAttachments = mediaStates.filter(function (media) {
                return isImage(media.fileMimeType);
            });
            var nonImageAttachments = mediaStates.filter(function (media) { return !isImage(media.fileMimeType); });
            var grandParentNode = _this.view.state.selection.$from.node(-1);
            // in case of gap cursor, selection might be at depth=0
            if (grandParentNode && isNonImagesBanned(grandParentNode)) {
                nonImageAttachments = [];
            }
            mediaStates.forEach(function (mediaState) {
                _this.stateManager.on(mediaState.id, _this.handleMediaState);
            });
            if (_this.editorAppearance !== 'message' && mediaSingle) {
                insertMediaGroupNode(_this.view, nonImageAttachments, collection);
                imageAttachments.forEach(function (mediaState) {
                    insertMediaSingleNode(_this.view, mediaState, collection);
                });
            }
            else {
                insertMediaGroupNode(_this.view, mediaStates, collection);
            }
            var isEndState = function (state) {
                return state.status && MEDIA_RESOLVED_STATES.indexOf(state.status) !== -1;
            };
            _this.pendingTask = mediaStates
                .filter(function (state) { return !isEndState(state); })
                .reduce(function (promise, state) {
                // Chain the previous promise with a new one for this media item
                return new Promise(function (resolve, reject) {
                    var onStateChange = function (newState) {
                        // When media item reaches its final state, remove listener and resolve
                        if (isEndState(newState)) {
                            stateManager.off(state.id, onStateChange);
                            resolve(newState);
                        }
                    };
                    stateManager.on(state.id, onStateChange);
                }).then(function () { return promise; });
            }, _this.pendingTask);
            var view = _this.view;
            if (!view.hasFocus()) {
                view.focus();
            }
        };
        this.splitMediaGroup = function () { return splitMediaGroup(_this.view); };
        this.insertFileFromDataUrl = function (url, fileName) {
            var binaryPicker = _this.binaryPicker;
            assert(binaryPicker, 'Unable to insert file because media pickers have not been initialized yet');
            binaryPicker.upload(url, fileName);
        };
        // TODO [MSW-454]: remove this logic from Editor
        this.onPopupPickerClose = function () {
            if (_this.dropzonePicker &&
                _this.popupPicker &&
                _this.popupPicker.type === 'popup') {
                _this.dropzonePicker.activate();
            }
        };
        this.showMediaPicker = function () {
            if (!_this.popupPicker) {
                return;
            }
            if (_this.dropzonePicker && _this.popupPicker.type === 'popup') {
                _this.dropzonePicker.deactivate();
            }
            _this.popupPicker.show();
        };
        /**
         * Returns a promise that is resolved after all pending operations have been finished.
         * An optional timeout will cause the promise to reject if the operation takes too long
         *
         * NOTE: The promise will resolve even if some of the media have failed to process.
         */
        this.waitForPendingTasks = function (timeout, lastTask) {
            if (lastTask && _this.pendingTask === lastTask) {
                return lastTask;
            }
            var chainedPromise = _this.pendingTask.then(function () {
                // Call ourselves to make sure that no new pending tasks have been
                // added before the current promise has resolved.
                return _this.waitForPendingTasks(undefined, _this.pendingTask);
            });
            if (!timeout) {
                return chainedPromise;
            }
            var rejectTimeout;
            var timeoutPromise = new Promise(function (resolve, reject) {
                rejectTimeout = window.setTimeout(function () {
                    return reject(new Error("Media operations did not finish in " + timeout + " ms"));
                }, timeout);
            });
            return Promise.race([
                timeoutPromise,
                chainedPromise.then(function () {
                    clearTimeout(rejectTimeout);
                }),
            ]);
        };
        /**
         * Called from React UI Component when user clicks on "Delete" icon
         * inside of it
         */
        this.handleMediaNodeRemoval = function (node, getPos) {
            var getNode = node;
            if (!getNode) {
                getNode = _this.view.state.doc.nodeAt(getPos());
            }
            removeMediaNode(_this.view, getNode, getPos);
        };
        /**
         * Called from React UI Component on componentDidMount
         */
        this.handleMediaNodeMount = function (node, getPos) {
            _this.mediaNodes.unshift({ node: node, getPos: getPos });
        };
        /**
         * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
         * when React component's underlying node property is replaced with a new node
         */
        this.handleMediaNodeUnmount = function (oldNode) {
            _this.mediaNodes = _this.mediaNodes.filter(function (_a) {
                var node = _a.node;
                return oldNode !== node;
            });
        };
        this.align = function (layout, gridSize) {
            if (gridSize === void 0) { gridSize = 12; }
            if (!_this.selectedMediaNode()) {
                return false;
            }
            var _a = _this.view.state, from = _a.selection.from, tr = _a.tr, schema = _a.schema;
            var mediaSingleNode = _this.view.state.doc.nodeAt(from - 1);
            if (!mediaSingleNode) {
                return false;
            }
            var width = mediaSingleNode.attrs.width;
            var oldLayout = mediaSingleNode.attrs.layout;
            var wrappedLayouts = ['wrap-left', 'wrap-right'];
            if (width) {
                var cols = Math.round((width / 100) * gridSize);
                var targetCols = cols;
                var nonWrappedLayouts = [
                    'center',
                    'wide',
                    'full-width',
                ];
                if (wrappedLayouts.indexOf(oldLayout) > -1 &&
                    nonWrappedLayouts.indexOf(layout) > -1) {
                    // wrap -> center needs to align to even grid
                    targetCols = Math.floor(targetCols / 2) * 2;
                }
                else if (nonWrappedLayouts.indexOf(oldLayout) > -1 &&
                    wrappedLayouts.indexOf(layout) > -1) {
                    // cannot resize to full column width, and cannot resize to 1 column
                    if (cols <= 1) {
                        targetCols = 2;
                    }
                    else if (cols >= gridSize) {
                        targetCols = 10;
                    }
                }
                if (targetCols !== cols) {
                    width = (targetCols / gridSize) * 100;
                }
            }
            _this.view.dispatch(tr.setNodeMarkup(from - 1, schema.nodes.mediaSingle, tslib_1.__assign({}, mediaSingleNode.attrs, { layout: layout,
                width: width })));
            return true;
        };
        this.findMediaNode = function (id) {
            var mediaNodes = _this.mediaNodes;
            // Array#find... no IE support
            return mediaNodes.reduce(function (memo, nodeWithPos) {
                if (memo) {
                    return memo;
                }
                var node = nodeWithPos.node;
                if (node.attrs.__key === id) {
                    return nodeWithPos;
                }
                return memo;
            }, null);
        };
        this.destroyPickers = function () {
            var pickers = _this.pickers;
            pickers.forEach(function (picker) { return picker.destroy(); });
            pickers.splice(0, pickers.length);
            _this.popupPicker = undefined;
            _this.binaryPicker = undefined;
            _this.clipboardPicker = undefined;
            _this.dropzonePicker = undefined;
            _this.customPicker = undefined;
        };
        this.updateMediaNodeAttrs = function (id, attrs, isMediaSingle) {
            var view = _this.view;
            if (!view) {
                return;
            }
            var mediaNodeWithPos = isMediaSingle
                ? _this.findMediaNode(id)
                : _this.mediaGroupNodes[id];
            if (!mediaNodeWithPos) {
                return;
            }
            view.dispatch(view.state.tr
                .step(new SetAttrsStep(mediaNodeWithPos.getPos(), attrs))
                .setMeta('addToHistory', false));
        };
        this.handleMediaState = function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var isMediaSingle, uploadErrorHandler, attrs;
            return tslib_1.__generator(this, function (_a) {
                isMediaSingle = isImage(state.fileMimeType) && !!this.view.state.schema.nodes.mediaSingle;
                switch (state.status) {
                    case 'error':
                        this.removeNodeById(state);
                        uploadErrorHandler = this.options.uploadErrorHandler;
                        if (uploadErrorHandler) {
                            uploadErrorHandler(state);
                        }
                        break;
                    case 'preview':
                        attrs = {
                            id: state.publicId || state.id,
                        };
                        if (typeof state.collection === 'string') {
                            attrs.collection = state.collection;
                        }
                        this.updateMediaNodeAttrs(state.id, attrs, isMediaSingle);
                        delete this.mediaGroupNodes[state.id];
                        break;
                    case 'ready':
                        this.stateManager.off(state.id, this.handleMediaState);
                        break;
                }
                return [2 /*return*/];
            });
        }); };
        this.notifyPluginStateSubscribers = function () {
            _this.pluginStateChangeSubscribers.forEach(function (cb) { return cb.call(cb, _this); });
        };
        this.removeNodeById = function (state) {
            var id = state.id;
            var mediaNodeWithPos = isImage(state.fileMimeType)
                ? _this.findMediaNode(id)
                : _this.mediaGroupNodes[id];
            if (mediaNodeWithPos) {
                removeMediaNode(_this.view, mediaNodeWithPos.node, mediaNodeWithPos.getPos);
            }
        };
        this.removeSelectedMediaNode = function () {
            var view = _this.view;
            if (_this.selectedMediaNode()) {
                var _a = view.state.selection, from_1 = _a.from, node = _a.node;
                removeMediaNode(view, node, function () { return from_1; });
                return true;
            }
            return false;
        };
        /**
         * Since we replace nodes with public id when node is finalized
         * stateManager contains no information for public ids
         */
        this.getMediaNodeStateStatus = function (id) {
            var state = _this.getMediaNodeState(id);
            return (state && state.status) || 'ready';
        };
        this.getMediaNodeState = function (id) {
            return _this.stateManager.getState(id);
        };
        this.handleDrag = function (dragState) {
            var isActive = dragState === 'enter';
            if (_this.showDropzone === isActive) {
                return;
            }
            _this.showDropzone = isActive;
            var _a = _this.view, dispatch = _a.dispatch, state = _a.state;
            // Trigger state change to be able to pick it up in the decorations handler
            dispatch(state.tr);
        };
        this.reactContext = reactContext;
        this.options = options;
        this.editorAppearance = editorAppearance;
        this.waitForMediaUpload =
            options.waitForMediaUpload === undefined
                ? true
                : options.waitForMediaUpload;
        var nodes = state.schema.nodes;
        assert(nodes.media && (nodes.mediaGroup || nodes.mediaSingle), 'Editor: unable to init media plugin - media or mediaGroup/mediaSingle node absent in schema');
        this.stateManager = new DefaultMediaStateManager();
        options.providerFactory.subscribe('mediaProvider', function (name, provider) {
            return _this.setMediaProvider(provider);
        });
        this.errorReporter = options.errorReporter || new ErrorReporter();
    }
    MediaPluginState.prototype.subscribe = function (cb) {
        this.pluginStateChangeSubscribers.push(cb);
        cb(this);
    };
    MediaPluginState.prototype.unsubscribe = function (cb) {
        var pluginStateChangeSubscribers = this.pluginStateChangeSubscribers;
        var pos = pluginStateChangeSubscribers.indexOf(cb);
        if (pos > -1) {
            pluginStateChangeSubscribers.splice(pos, 1);
        }
    };
    MediaPluginState.prototype.updateElement = function () {
        var newElement;
        if (this.selectedMediaNode() && this.isMediaSingle()) {
            newElement = this.getDomElement(this.view.domAtPos.bind(this.view));
        }
        if (this.element !== newElement) {
            this.element = newElement;
            this.notifyPluginStateSubscribers();
        }
    };
    MediaPluginState.prototype.updateUploadState = function () {
        var _this = this;
        if (!this.waitForMediaUpload) {
            return;
        }
        if (this.updateUploadStateDebounce) {
            clearTimeout(this.updateUploadStateDebounce);
        }
        this.updateUploadStateDebounce = window.setTimeout(function () {
            _this.updateUploadStateDebounce = null;
            _this.allUploadsFinished = false;
            _this.notifyPluginStateSubscribers();
            _this.waitForPendingTasks().then(function () {
                _this.allUploadsFinished = true;
                _this.notifyPluginStateSubscribers();
            });
        }, 0);
    };
    MediaPluginState.prototype.updateLayout = function (layout) {
        this.layout = layout;
        this.notifyPluginStateSubscribers();
    };
    MediaPluginState.prototype.isMediaSingle = function () {
        var _a = this.view.state, selection = _a.selection, schema = _a.schema;
        return selection.$from.parent.type === schema.nodes.mediaSingle;
    };
    MediaPluginState.prototype.getDomElement = function (domAtPos) {
        var from = this.view.state.selection.from;
        if (this.selectedMediaNode()) {
            var node = domAtPos(from).node;
            if (!node.childNodes.length) {
                return node.parentNode;
            }
            return node.querySelector('.wrapper') || node;
        }
    };
    MediaPluginState.prototype.setView = function (view) {
        this.view = view;
    };
    MediaPluginState.prototype.destroy = function () {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        var mediaNodes = this.mediaNodes;
        mediaNodes.splice(0, mediaNodes.length);
        this.removeOnCloseListener();
        this.destroyPickers();
    };
    MediaPluginState.prototype.initPickers = function (uploadParams, context, Picker, reactContext) {
        var _this = this;
        if (this.destroyed) {
            return;
        }
        var _a = this, errorReporter = _a.errorReporter, pickers = _a.pickers, stateManager = _a.stateManager;
        // create pickers if they don't exist, re-use otherwise
        if (!pickers.length) {
            var pickerFacadeConfig = {
                context: context,
                stateManager: stateManager,
                errorReporter: errorReporter,
            };
            var defaultPickerConfig = {
                uploadParams: uploadParams,
                proxyReactContext: reactContext(),
            };
            if (this.options.customMediaPicker) {
                pickers.push((this.customPicker = new Picker('customMediaPicker', pickerFacadeConfig, this.options.customMediaPicker)));
            }
            else {
                pickers.push((this.popupPicker = new Picker(
                // Fallback to browser picker for unauthenticated users
                context.config.userAuthProvider ? 'popup' : 'browser', pickerFacadeConfig, defaultPickerConfig)));
                pickers.push((this.binaryPicker = new Picker('binary', pickerFacadeConfig, defaultPickerConfig)));
                pickers.push((this.clipboardPicker = new Picker('clipboard', pickerFacadeConfig, defaultPickerConfig)));
                pickers.push((this.dropzonePicker = new Picker('dropzone', pickerFacadeConfig, tslib_1.__assign({ container: this.options.customDropzoneContainer, headless: true }, defaultPickerConfig))));
                this.dropzonePicker.onDrag(this.handleDrag);
                this.removeOnCloseListener = this.popupPicker.onClose(this.onPopupPickerClose);
            }
            pickers.forEach(function (picker) {
                picker.onNewMedia(_this.insertFiles);
                picker.onNewMedia(_this.trackNewMediaEvent(picker.type));
            });
        }
        // set new upload params for the pickers
        pickers.forEach(function (picker) { return picker.setUploadParams(uploadParams); });
    };
    MediaPluginState.prototype.trackNewMediaEvent = function (pickerType) {
        return function (mediaStates) {
            mediaStates.forEach(function (mediaState) {
                analyticsService.trackEvent("atlassian.editor.media.file." + pickerType, mediaState.fileMimeType
                    ? { fileMimeType: mediaState.fileMimeType }
                    : {});
            });
        };
    };
    MediaPluginState.prototype.collectionFromProvider = function () {
        return (this.mediaProvider &&
            this.mediaProvider.uploadParams &&
            this.mediaProvider.uploadParams.collection);
    };
    MediaPluginState.prototype.selectedMediaNode = function () {
        var _a = this.view.state, selection = _a.selection, schema = _a.schema;
        if (selection instanceof NodeSelection &&
            selection.node.type === schema.nodes.media) {
            var node = selection.node;
            return node;
        }
    };
    MediaPluginState.prototype.isLayoutSupported = function () {
        var _a = this.view.state, selection = _a.selection, schema = _a.schema;
        if (selection instanceof NodeSelection &&
            selection.node.type === schema.nodes.media) {
            return (!hasParentNodeOfType(schema.nodes.bodiedExtension)(selection) &&
                !hasParentNodeOfType(schema.nodes.layoutSection)(selection));
        }
        return false;
    };
    return MediaPluginState;
}());
export { MediaPluginState };
var createDropPlaceholder = function (editorAppearance) {
    var dropPlaceholder = document.createElement('div');
    if (editorAppearance === 'full-page') {
        ReactDOM.render(React.createElement(DropPlaceholder, { type: 'single' }), dropPlaceholder);
    }
    else {
        ReactDOM.render(React.createElement(DropPlaceholder), dropPlaceholder);
    }
    return dropPlaceholder;
};
export var stateKey = new PluginKey('mediaPlugin');
export var getMediaPluginState = function (state) {
    return stateKey.getState(state);
};
export var createPlugin = function (schema, options, reactContext, dispatch, editorAppearance) {
    var dropPlaceholder = createDropPlaceholder(editorAppearance);
    return new Plugin({
        state: {
            init: function (config, state) {
                return new MediaPluginState(state, options, reactContext, editorAppearance);
            },
            apply: function (tr, pluginState, oldState, newState) {
                var parent = newState.selection.$from.parent;
                // Update Layout
                var mediaSingle = oldState.schema.nodes.mediaSingle;
                if (parent.type === mediaSingle) {
                    pluginState.layout = parent.attrs.layout;
                }
                var meta = tr.getMeta(stateKey);
                if (meta && dispatch) {
                    var showMediaPicker = pluginState.showMediaPicker;
                    var allowsUploads = meta.allowsUploads;
                    dispatch(stateKey, { allowsUploads: allowsUploads, showMediaPicker: showMediaPicker });
                }
                // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
                //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
                //       transformations from within the plugin state (i.e. when adding a new file).
                return pluginState;
            },
        },
        key: stateKey,
        view: function (view) {
            var pluginState = getMediaPluginState(view.state);
            pluginState.setView(view);
            pluginState.updateElement();
            return {
                update: function () {
                    pluginState.updateUploadState();
                    pluginState.updateElement();
                },
            };
        },
        props: {
            decorations: function (state) {
                var pluginState = getMediaPluginState(state);
                if (!pluginState.showDropzone) {
                    return;
                }
                var schema = state.schema, $anchor = state.selection.$anchor;
                // When a media is already selected
                if (state.selection instanceof NodeSelection) {
                    var node = state.selection.node;
                    if (node.type === schema.nodes.mediaSingle) {
                        var deco = Decoration.node(state.selection.from, state.selection.to, {
                            class: 'mediaSingle-selected',
                        });
                        return DecorationSet.create(state.doc, [deco]);
                    }
                    return;
                }
                var pos = $anchor.pos;
                if ($anchor.parent.type !== schema.nodes.paragraph &&
                    $anchor.parent.type !== schema.nodes.codeBlock) {
                    pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup);
                }
                if (pos === null || pos === undefined) {
                    return;
                }
                var dropPlaceholders = [
                    Decoration.widget(pos, dropPlaceholder, { key: 'drop-placeholder' }),
                ];
                return DecorationSet.create(state.doc, dropPlaceholders);
            },
            nodeViews: options.nodeViews,
            handleTextInput: function (view) {
                getMediaPluginState(view.state).splitMediaGroup();
                return false;
            },
        },
    });
};
//# sourceMappingURL=main.js.map