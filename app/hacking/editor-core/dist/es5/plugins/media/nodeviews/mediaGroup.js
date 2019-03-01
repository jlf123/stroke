"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactNodeView_1 = require("../../../nodeviews/ReactNodeView");
var media_filmstrip_1 = require("@atlaskit/media-filmstrip");
var main_1 = require("../pm-plugins/main");
var utils_1 = require("../../../utils");
var WithPluginState_1 = require("../../../ui/WithPluginState");
var react_nodeview_1 = require("../../../plugins/base/pm-plugins/react-nodeview");
var close_1 = require("@atlaskit/icon/glyph/editor/close");
var editor_disabled_1 = require("../../editor-disabled");
var MediaGroup = /** @class */ (function (_super) {
    tslib_1.__extends(MediaGroup, _super);
    function MediaGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selected: null,
        };
        _this.setMediaItems = function (props) {
            var node = props.node;
            _this.mediaNodes = [];
            node.forEach(function (item, childOffset) {
                _this.mediaPluginState.mediaGroupNodes[item.attrs.__key || item.attrs.id] = {
                    node: item,
                    getPos: function () { return props.getPos() + childOffset + 1; },
                };
                _this.mediaNodes.push(item);
            });
        };
        _this.renderChildNodes = function (node) {
            var items = _this.mediaNodes.map(function (item, idx) {
                var getState = _this.mediaPluginState.stateManager.getState(item.attrs.__key || item.attrs.id);
                var identifier = {
                    id: getState ? getState.fileId : item.attrs.id,
                    mediaItemType: 'file',
                    collectionName: item.attrs.collection,
                };
                var nodePos = _this.props.getPos() + idx + 1;
                return {
                    identifier: identifier,
                    selectable: true,
                    isLazy: _this.props.editorAppearance !== 'mobile',
                    selected: _this.props.selected === nodePos,
                    onClick: function () {
                        utils_1.setNodeSelection(_this.props.view, nodePos);
                    },
                    actions: [
                        {
                            handler: _this.props.disabled
                                ? {}
                                : _this.mediaPluginState.handleMediaNodeRemoval.bind(null, null, function () { return nodePos; }),
                            icon: React.createElement(close_1.default, { label: "delete" }),
                        },
                    ],
                };
            });
            return (React.createElement(media_filmstrip_1.Filmstrip, { items: items, context: _this.mediaPluginState.mediaContext }));
        };
        _this.mediaPluginState = main_1.stateKey.getState(props.view.state);
        _this.setMediaItems(props);
        return _this;
    }
    MediaGroup.prototype.componentWillReceiveProps = function (props) {
        this.setMediaItems(props);
    };
    MediaGroup.prototype.shouldComponentUpdate = function (nextProps) {
        if (this.props.selected !== nextProps.selected ||
            this.props.node !== nextProps.node) {
            return true;
        }
        return false;
    };
    MediaGroup.prototype.render = function () {
        return this.renderChildNodes(this.props.node);
    };
    return MediaGroup;
}(React.Component));
exports.default = MediaGroup;
var MediaGroupNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(MediaGroupNodeView, _super);
    function MediaGroupNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaGroupNodeView.prototype.render = function (props, forwardRef) {
        var _this = this;
        var editorAppearance = this.reactComponentProps.editorAppearance;
        return (React.createElement(WithPluginState_1.default, { editorView: this.view, plugins: {
                reactNodeViewState: react_nodeview_1.stateKey,
                editorDisabledPlugin: editor_disabled_1.pluginKey,
            }, render: function (_a) {
                var editorDisabledPlugin = _a.editorDisabledPlugin;
                var nodePos = _this.getPos();
                var _b = _this.view.state.selection, $anchor = _b.$anchor, $head = _b.$head;
                var isSelected = nodePos < $anchor.pos && $head.pos < nodePos + _this.node.nodeSize;
                return (React.createElement(MediaGroup, { node: _this.node, getPos: _this.getPos, view: _this.view, forwardRef: forwardRef, selected: isSelected ? $anchor.pos : null, disabled: (editorDisabledPlugin || {}).editorDisabled, editorAppearance: editorAppearance }));
            } }));
    };
    MediaGroupNodeView.prototype.stopEvent = function (event) {
        event.preventDefault();
        return true;
    };
    return MediaGroupNodeView;
}(ReactNodeView_1.default));
exports.ReactMediaGroupNode = function (portalProviderAPI, editorAppearance) { return function (node, view, getPos) {
    return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, {
        editorAppearance: editorAppearance,
    }).init();
}; };
//# sourceMappingURL=mediaGroup.js.map