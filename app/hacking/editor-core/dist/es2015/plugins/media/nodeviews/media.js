import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { stateKey as mediaStateKey, } from '../pm-plugins/main';
import { Card, CardView, } from '@atlaskit/media-card';
import { withImageLoader } from '@atlaskit/editor-common';
// This is being used by DropPlaceholder now
export var MEDIA_HEIGHT = 125;
export var FILE_WIDTH = 156;
var MediaNode = /** @class */ (function (_super) {
    tslib_1.__extends(MediaNode, _super);
    function MediaNode(props) {
        var _this = _super.call(this, props) || this;
        _this.hasBeenMounted = false;
        _this.state = {
            viewContext: undefined,
        };
        _this.updateMediaContext = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var mediaProvider, viewContext;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaProvider];
                    case 1:
                        mediaProvider = _a.sent();
                        if (!mediaProvider) return [3 /*break*/, 3];
                        return [4 /*yield*/, mediaProvider.viewContext];
                    case 2:
                        viewContext = _a.sent();
                        if (viewContext && this.hasBeenMounted) {
                            this.setState({ viewContext: viewContext });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.handleNewNode = function (props) {
            var node = props.node;
            // +1 indicates the media node inside the mediaSingle nodeview
            _this.pluginState.handleMediaNodeMount(node, function () { return _this.props.getPos() + 1; });
        };
        var view = _this.props.view;
        _this.pluginState = mediaStateKey.getState(view.state);
        _this.mediaProvider = props.mediaProvider;
        return _this;
    }
    MediaNode.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.selected !== nextProps.selected ||
            this.state.viewContext !== nextState.viewContext ||
            this.props.node.attrs.id !== nextProps.node.attrs.id ||
            this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
            this.props.cardDimensions !== nextProps.cardDimensions) {
            return true;
        }
        return false;
    };
    MediaNode.prototype.componentDidMount = function () {
        this.hasBeenMounted = true;
        this.handleNewNode(this.props);
        this.updateMediaContext();
    };
    MediaNode.prototype.componentWillUnmount = function () {
        var node = this.props.node;
        this.pluginState.handleMediaNodeUnmount(node);
        this.hasBeenMounted = false;
    };
    MediaNode.prototype.componentDidUpdate = function () {
        this.pluginState.updateElement();
    };
    MediaNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected, cardDimensions = _a.cardDimensions, onClick = _a.onClick, editorAppearance = _a.editorAppearance;
        var _b = node.attrs, id = _b.id, type = _b.type, collection = _b.collection, url = _b.url, __key = _b.__key;
        if (!this.state.viewContext) {
            return React.createElement(CardView, { status: "loading", dimensions: cardDimensions });
        }
        /** For new images, the media state will be loaded inside the plugin state */
        var getState = this.pluginState.getMediaNodeState(__key);
        var fileId = getState && getState.fileId ? getState.fileId : id;
        var identifier = type === 'external'
            ? {
                dataURI: url,
                name: url,
                mediaItemType: 'external-image',
            }
            : {
                id: fileId,
                mediaItemType: 'file',
                collectionName: collection,
            };
        return (React.createElement(Card, { context: this.state.viewContext, resizeMode: "stretchy-fit", dimensions: cardDimensions, identifier: identifier, selectable: true, selected: selected, disableOverlay: true, onClick: onClick, useInlinePlayer: false, isLazy: editorAppearance !== 'mobile' }));
    };
    return MediaNode;
}(Component));
export default withImageLoader(MediaNode);
//# sourceMappingURL=media.js.map