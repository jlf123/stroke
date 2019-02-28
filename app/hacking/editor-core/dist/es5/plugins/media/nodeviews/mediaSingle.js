"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var prosemirror_utils_1 = require("prosemirror-utils");
var main_1 = require("../pm-plugins/main");
var ReactNodeView_1 = require("../../../nodeviews/ReactNodeView");
var media_1 = require("./media");
var WithPluginState_1 = require("../../../ui/WithPluginState");
var width_1 = require("../../width");
var react_nodeview_1 = require("../../../plugins/base/pm-plugins/react-nodeview");
var utils_1 = require("../../../utils");
var ResizableMediaSingle_1 = require("../ui/ResizableMediaSingle");
var grid_1 = require("../../../plugins/grid");
var DEFAULT_WIDTH = 250;
var DEFAULT_HEIGHT = 200;
var MediaSingleNode = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingleNode, _super);
    function MediaSingleNode(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            height: undefined,
            width: undefined,
            lastMediaStatus: undefined,
        };
        _this.onExternalImageLoaded = function (_a) {
            var width = _a.width, height = _a.height;
            _this.setState({
                width: width,
                height: height,
            }, function () {
                _this.forceUpdate();
            });
        };
        _this.getMediaNodeStatus = function (childNode) {
            if (childNode) {
                var state = _this.mediaPluginState.getMediaNodeState(childNode.attrs.__key);
                return state && state.status;
            }
            return undefined;
        };
        _this.hasMediaStateUpdated = function (nextProps) {
            return (_this.getMediaNodeStatus(nextProps.node.firstChild) !==
                _this.state.lastMediaStatus);
        };
        _this.mediaChildHasUpdated = function (nextProps) {
            if (!_this.props.node.firstChild || !nextProps.node.firstChild) {
                return false;
            }
            return (_this.props.node.firstChild.attrs.collection !==
                nextProps.node.firstChild.attrs.collection ||
                _this.props.node.firstChild.attrs.id !== nextProps.node.firstChild.attrs.id);
        };
        _this.selectMediaSingle = function (_a) {
            var event = _a.event;
            // We need to call "stopPropagation" here in order to prevent the browser from navigating to
            // another URL if the media node is wrapped in a link mark.
            event.stopPropagation();
            utils_1.setNodeSelection(_this.props.view, _this.props.getPos() + 1);
        };
        _this.updateSize = function (width, layout) {
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            var pos = _this.props.getPos();
            if (typeof pos === 'undefined') {
                return;
            }
            return dispatch(state.tr.setNodeMarkup(pos, undefined, tslib_1.__assign({}, _this.props.node.attrs, { layout: layout,
                width: width })));
        };
        _this.mediaPluginState = main_1.stateKey.getState(_this.props.view.state);
        return _this;
    }
    MediaSingleNode.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.node.attrs.width !== nextProps.node.attrs.width ||
            this.props.selected() !== nextProps.selected() ||
            this.props.node.attrs.layout !== nextProps.node.attrs.layout ||
            this.props.width !== nextProps.width ||
            this.props.lineLength !== nextProps.lineLength ||
            this.props.getPos !== nextProps.getPos ||
            this.mediaChildHasUpdated(nextProps) ||
            this.hasMediaStateUpdated(nextProps)) {
            return true;
        }
        return false;
    };
    MediaSingleNode.prototype.componentDidUpdate = function () {
        var layout = this.props.node.attrs.layout;
        if (this.props.selected()) {
            this.mediaPluginState.updateLayout(layout);
        }
        this.setState({
            lastMediaStatus: this.getMediaNodeStatus(this.props.node.firstChild),
        });
    };
    MediaSingleNode.prototype.render = function () {
        var _this = this;
        var _a = this.props, selected = _a.selected, getPos = _a.getPos, node = _a.node, state = _a.view.state, editorAppearance = _a.editorAppearance;
        var lastMediaStatus = this.state.lastMediaStatus;
        var _b = node.attrs, layout = _b.layout, mediaSingleWidth = _b.width;
        var childNode = node.firstChild;
        var _c = childNode.attrs, width = _c.width, height = _c.height, type = _c.type;
        if (type === 'external') {
            var _d = this.state, stateWidth = _d.width, stateHeight = _d.height;
            if (width === null) {
                width = stateWidth || DEFAULT_WIDTH;
            }
            if (height === null) {
                height = stateHeight || DEFAULT_HEIGHT;
            }
        }
        var isLoading = lastMediaStatus ? lastMediaStatus !== 'ready' : false;
        var canResize = !!this.mediaPluginState.options.allowResizing && !isLoading;
        var pos = getPos();
        if (pos) {
            var $pos = state.doc.resolve(pos);
            var _e = state.schema.nodes, table = _e.table, layoutSection = _e.layoutSection;
            var disabledNode = !!prosemirror_utils_1.findParentNodeOfTypeClosestToPos($pos, [
                table,
                layoutSection,
            ]);
            canResize = canResize && !disabledNode;
        }
        if (width === null || height === null) {
            width = DEFAULT_WIDTH;
            height = DEFAULT_HEIGHT;
        }
        var cardWidth = this.props.width;
        var cardHeight = (height / width) * cardWidth;
        var cardDimensions = {
            width: cardWidth + "px",
            height: cardHeight + "px",
        };
        var props = {
            layout: layout,
            width: width,
            height: height,
            isLoading: isLoading,
            containerWidth: this.props.width,
            lineLength: this.props.lineLength,
            pctWidth: mediaSingleWidth,
        };
        var MediaChild = (React.createElement(editor_common_1.WithProviders, { providers: ['mediaProvider'], providerFactory: this.mediaPluginState.options.providerFactory, renderNode: function (_a) {
                var mediaProvider = _a.mediaProvider;
                return (React.createElement(media_1.default, { node: childNode, view: _this.props.view, getPos: _this.props.getPos, cardDimensions: cardDimensions, mediaProvider: mediaProvider, selected: selected(), onClick: _this.selectMediaSingle, onExternalImageLoaded: _this.onExternalImageLoaded, editorAppearance: editorAppearance }));
            } }));
        return canResize ? (React.createElement(ResizableMediaSingle_1.default, tslib_1.__assign({}, props, { getPos: getPos, updateSize: this.updateSize, displayGrid: grid_1.createDisplayGrid(this.props.eventDispatcher), gridSize: 12, state: this.props.view.state, appearance: this.mediaPluginState.options.appearance, selected: this.props.selected() }), MediaChild)) : (React.createElement(editor_common_1.MediaSingle, tslib_1.__assign({}, props), MediaChild));
    };
    return MediaSingleNode;
}(react_1.Component));
exports.default = MediaSingleNode;
var MediaSingleNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingleNodeView, _super);
    function MediaSingleNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaSingleNodeView.prototype.render = function (props, forwardRef) {
        var _this = this;
        var _a = this.reactComponentProps, eventDispatcher = _a.eventDispatcher, editorAppearance = _a.editorAppearance;
        return (React.createElement(WithPluginState_1.default, { editorView: this.view, plugins: {
                width: width_1.pluginKey,
                reactNodeViewState: react_nodeview_1.stateKey,
            }, render: function (_a) {
                var width = _a.width, reactNodeViewState = _a.reactNodeViewState;
                return (React.createElement(MediaSingleNode, { width: width.width, lineLength: width.lineLength, node: _this.node, getPos: _this.getPos, view: _this.view, selected: function () { return _this.getPos() + 1 === reactNodeViewState; }, eventDispatcher: eventDispatcher, editorAppearance: editorAppearance }));
            } }));
    };
    return MediaSingleNodeView;
}(ReactNodeView_1.default));
exports.ReactMediaSingleNode = function (portalProviderAPI, eventDispatcher, editorAppearance) { return function (node, view, getPos) {
    return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
        eventDispatcher: eventDispatcher,
        editorAppearance: editorAppearance,
    }).init();
}; };
//# sourceMappingURL=mediaSingle.js.map