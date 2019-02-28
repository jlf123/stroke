"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames = require("classnames");
var styled_components_1 = require("styled-components");
var prosemirror_state_1 = require("prosemirror-state");
var editor_common_1 = require("@atlaskit/editor-common");
var index_1 = require("../width/index");
var WithPluginState_1 = require("../../ui/WithPluginState");
var event_dispatcher_1 = require("../../event-dispatcher");
exports.stateKey = new prosemirror_state_1.PluginKey('gridPlugin');
exports.GRID_SIZE = 12;
exports.createDisplayGrid = function (eventDispatcher) {
    var dispatch = event_dispatcher_1.createDispatch(eventDispatcher);
    return function (show, type, highlight) {
        if (highlight === void 0) { highlight = []; }
        return dispatch(exports.stateKey, {
            visible: show,
            gridType: type,
            highlight: highlight,
        });
    };
};
exports.gridTypeForLayout = function (layout) {
    return layout === 'wrap-left' || layout === 'wrap-right' ? 'wrapped' : 'full';
};
var sides = ['left', 'right'];
var overflowHighlight = function (highlights, side, start, size) {
    if (!highlights.length) {
        return false;
    }
    var minHighlight = highlights.reduce(function (prev, cur) { return Math.min(prev, cur); });
    var maxHighlight = highlights.reduce(function (prev, cur) { return Math.max(prev, cur); });
    if (side === 'left') {
        return (minHighlight < 0 &&
            minHighlight <= -start &&
            (typeof size === 'number' ? minHighlight >= -(start + size) : true));
    }
    else {
        return (maxHighlight > exports.GRID_SIZE &&
            maxHighlight >= exports.GRID_SIZE + start &&
            (typeof size === 'number' ? maxHighlight <= exports.GRID_SIZE + size : true));
    }
};
var gutterGridLines = function (appearance, editorMaxWidth, editorWidth, highlights) {
    var gridLines = [];
    if (appearance !== 'full-page') {
        return gridLines;
    }
    var wideSpacing = (editorMaxWidth * editor_common_1.breakoutWideScaleRatio - editorMaxWidth) / 2;
    sides.forEach(function (side) {
        var _a, _b;
        gridLines.push(React.createElement("div", { key: side, className: classnames('gridLine', overflowHighlight(highlights, side, 0, 4) ? 'highlight' : ''), style: (_a = { position: 'absolute' }, _a[side] = "-" + wideSpacing + "px", _a) }));
        gridLines.push(React.createElement("div", { key: side + '-bk', className: classnames('gridLine', highlights.indexOf('full-width') > -1 ? 'highlight' : ''), style: (_b = {
                    position: 'absolute'
                },
                _b[side] = "-" + (editorWidth - editorMaxWidth - editor_common_1.akEditorBreakoutPadding) /
                    2 + "px",
                _b) }));
    });
    return gridLines;
};
var lineLengthGridLines = function (highlights) {
    var gridLines = [];
    var gridSpacing = 100 / exports.GRID_SIZE;
    for (var i = 0; i <= exports.GRID_SIZE; i++) {
        var style = {
            paddingLeft: gridSpacing + "%",
        };
        gridLines.push(React.createElement("div", { key: i, className: classnames('gridLine', highlights.indexOf(i) > -1 ? 'highlight' : ''), style: i < exports.GRID_SIZE ? style : undefined }));
    }
    return gridLines;
};
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        var _a = this.props, highlight = _a.highlight, appearance = _a.appearance, theme = _a.theme, containerElement = _a.containerElement, editorWidth = _a.editorWidth, gridType = _a.gridType, visible = _a.visible;
        var editorMaxWidth = theme.layoutMaxWidth;
        var gridLines = tslib_1.__spread(lineLengthGridLines(highlight), gutterGridLines(appearance, editorMaxWidth, editorWidth, highlight));
        return (React.createElement("div", { className: "gridParent" },
            React.createElement("div", { className: classnames('gridContainer', gridType, !visible ? 'hidden' : ''), style: {
                    height: containerElement
                        ? containerElement.scrollHeight + "px"
                        : undefined,
                } }, gridLines)));
    };
    return Grid;
}(React.Component));
var ThemedGrid = styled_components_1.withTheme(Grid);
var gridPlugin = {
    contentComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance, containerElement = _a.containerElement;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                grid: exports.stateKey,
                widthState: index_1.pluginKey,
            }, render: function (_a) {
                var grid = _a.grid, _b = _a.widthState, widthState = _b === void 0 ? { width: editor_common_1.akEditorFullPageMaxWidth } : _b;
                if (!grid) {
                    return null;
                }
                return (React.createElement(ThemedGrid, tslib_1.__assign({ appearance: appearance, editorWidth: widthState.width, containerElement: containerElement }, grid)));
            } }));
    },
};
exports.default = gridPlugin;
var styles_1 = require("./styles");
exports.GRID_GUTTER = styles_1.GRID_GUTTER;
//# sourceMappingURL=index.js.map