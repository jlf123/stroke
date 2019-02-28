"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var attachment_1 = require("@atlaskit/icon/glyph/editor/attachment");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var ToolbarMedia = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarMedia, _super);
    function ToolbarMedia() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { disabled: false };
        _this.handlePluginStateChange = function (pluginState) {
            _this.setState({
                disabled: !pluginState.allowsUploads,
            });
        };
        _this.handleClickMediaButton = analytics_1.withAnalytics('atlassian.editor.media.button', function () {
            _this.pluginState.showMediaPicker();
            return true;
        });
        return _this;
    }
    ToolbarMedia.prototype.componentDidMount = function () {
        this.setPluginState(this.props);
    };
    ToolbarMedia.prototype.componentWillUpdate = function (nextProps) {
        if (!this.pluginState) {
            this.setPluginState(nextProps);
        }
    };
    ToolbarMedia.prototype.componentWillUnmount = function () {
        var pluginState = this.pluginState;
        if (pluginState) {
            pluginState.unsubscribe(this.handlePluginStateChange);
        }
    };
    ToolbarMedia.prototype.render = function () {
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing;
        var disabled = this.state.disabled;
        if (disabled) {
            return null;
        }
        return (React.createElement(ToolbarButton_1.default, { onClick: this.handleClickMediaButton, disabled: isDisabled, title: "Files & images", spacing: isReducedSpacing ? 'none' : 'default', iconBefore: React.createElement(attachment_1.default, { label: "Files & images" }) }));
    };
    ToolbarMedia.prototype.setPluginState = function (props) {
        var editorView = props.editorView, pluginKey = props.pluginKey;
        var pluginState = pluginKey.getState(editorView.state);
        if (pluginState) {
            this.pluginState = pluginState;
            pluginState.subscribe(this.handlePluginStateChange);
        }
    };
    return ToolbarMedia;
}(react_1.PureComponent));
exports.default = ToolbarMedia;
//# sourceMappingURL=index.js.map