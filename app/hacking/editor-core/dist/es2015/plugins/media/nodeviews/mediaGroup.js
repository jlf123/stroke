import * as tslib_1 from "tslib";
import * as React from 'react';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { Filmstrip } from '@atlaskit/media-filmstrip';
import { stateKey as mediaStateKey, } from '../pm-plugins/main';
import { setNodeSelection } from '../../../utils';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { pluginKey as editorDisabledPluginKey, } from '../../editor-disabled';
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
                        setNodeSelection(_this.props.view, nodePos);
                    },
                    actions: [
                        {
                            handler: _this.props.disabled
                                ? {}
                                : _this.mediaPluginState.handleMediaNodeRemoval.bind(null, null, function () { return nodePos; }),
                            icon: React.createElement(EditorCloseIcon, { label: "delete" }),
                        },
                    ],
                };
            });
            return (React.createElement(Filmstrip, { items: items, context: _this.mediaPluginState.mediaContext }));
        };
        _this.mediaPluginState = mediaStateKey.getState(props.view.state);
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
export default MediaGroup;
var MediaGroupNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(MediaGroupNodeView, _super);
    function MediaGroupNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaGroupNodeView.prototype.render = function (props, forwardRef) {
        var _this = this;
        var editorAppearance = this.reactComponentProps.editorAppearance;
        return (React.createElement(WithPluginState, { editorView: this.view, plugins: {
                reactNodeViewState: reactNodeViewStateKey,
                editorDisabledPlugin: editorDisabledPluginKey,
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
}(ReactNodeView));
export var ReactMediaGroupNode = function (portalProviderAPI, editorAppearance) { return function (node, view, getPos) {
    return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, {
        editorAppearance: editorAppearance,
    }).init();
}; };
//# sourceMappingURL=mediaGroup.js.map