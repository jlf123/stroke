import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classnames from 'classnames';
import { calcColumnsFromPx, akEditorWideLayoutWidth, } from '@atlaskit/editor-common';
import Resizable from 're-resizable';
import { gridTypeForLayout } from '../../../grid';
export var handleSides = ['left', 'right'];
export var alignementLayouts = [
    'align-start',
    'align-end',
    'wrap-left',
    'wrap-right',
];
var snapTo = function (target, points) {
    return points.reduce(function (point, closest) {
        return Math.abs(closest - target) < Math.abs(point - target)
            ? closest
            : point;
    });
};
var Resizer = /** @class */ (function (_super) {
    tslib_1.__extends(Resizer, _super);
    function Resizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isResizing: false,
        };
        _this.handleResizeStart = function () {
            _this.setState({ isResizing: true }, function () {
                _this.props.displayGrid(true, gridTypeForLayout(_this.props.layout), _this.highlights(_this.props.width));
            });
        };
        _this.handleResize = function (event, direction, elementRef, delta) {
            if (!_this.resizable || !_this.resizable.state.original) {
                return;
            }
            var newWidth = Math.max(_this.resizable.state.original.width +
                delta.width * (_this.props.scaleFactor || 1), _this.props.snapPoints[0]);
            var newSize = _this.props.calcNewSize(newWidth, false);
            if (newSize.layout !== _this.props.layout) {
                _this.props.updateSize(newSize.width, newSize.layout);
            }
            _this.props.displayGrid(true, gridTypeForLayout(newSize.layout), _this.highlights(newWidth));
            _this.resizable.updateSize({ width: newWidth, height: 'auto' });
        };
        _this.highlights = function (newWidth) {
            var snapWidth = snapTo(newWidth, _this.props.snapPoints);
            if (snapWidth > akEditorWideLayoutWidth) {
                return ['full-width'];
            }
            var columns = calcColumnsFromPx(snapWidth, _this.props.lineLength, _this.props.gridSize);
            var columnWidth = Math.round(columns);
            var highlight = [];
            if (_this.props.layout === 'wrap-left' ||
                _this.props.layout === 'align-start') {
                highlight.push(0);
                highlight.push(columnWidth);
            }
            else if (_this.props.layout === 'wrap-right' ||
                _this.props.layout === 'align-end') {
                highlight.push(_this.props.gridSize);
                highlight.push(_this.props.gridSize - columnWidth);
            }
            else if (_this.props.isInlineLike) {
                highlight.push(_this.props.getColumnLeft() + Math.ceil(columns));
            }
            else {
                highlight.push(Math.floor((_this.props.gridSize - columnWidth) / 2));
                highlight.push(Math.ceil((_this.props.gridSize + columnWidth) / 2));
            }
            return highlight;
        };
        _this.handleResizeStop = function (event, direction, refToElement, delta) {
            if (!_this.resizable) {
                return;
            }
            if (!_this.resizable.state.original) {
                return;
            }
            var newWidth = Math.max(_this.resizable.state.original.width + delta.width, _this.props.snapPoints[0]);
            var snapWidth = snapTo(newWidth, _this.props.snapPoints);
            var newSize = _this.props.calcNewSize(snapWidth, true);
            // show committed grid size
            _this.props.displayGrid(true, gridTypeForLayout(newSize.layout), _this.highlights(newWidth));
            _this.setState({ isResizing: false }, function () {
                _this.props.updateSize(newSize.width, newSize.layout);
                _this.props.displayGrid(false, gridTypeForLayout(_this.props.layout));
            });
        };
        _this.setResizableRef = function (ref) {
            _this.resizable = ref;
        };
        return _this;
    }
    Resizer.prototype.render = function () {
        /** equivalent to `calc: (50% - 12px)` from 40:MediaSingle/styled.ts */
        var halfSize = this.props.lineLength * 0.5 - 12;
        var shouldHalfSize = alignementLayouts.indexOf(this.props.layout) > -1 &&
            this.props.width > this.props.lineLength;
        var handleStyles = {};
        var handles = {};
        handleSides.forEach(function (side) {
            var _a;
            handles[side] = "mediaSingle-resize-handle-" + side;
            handleStyles[side] = (_a = {
                    width: '24px'
                },
                _a[side] = '-13px',
                _a.zIndex = 99,
                _a);
        });
        // Ideally, Resizable would let you pass in the component rather than
        // the div. For now, we just apply the same styles using CSS
        return (React.createElement(Resizable, { ref: this.setResizableRef, onResize: this.handleResize, size: {
                width: shouldHalfSize ? halfSize : this.props.width || 0,
            }, className: classnames('media-single', "image-" + this.props.layout, this.props.className, {
                'is-loading': this.props.isLoading,
                'is-resizing': this.state.isResizing,
                'not-resized': !this.props.pctWidth,
                'mediaSingle-selected': this.props.selected,
                'media-wrapped': this.props.layout === 'wrap-left' ||
                    this.props.layout === 'wrap-right',
            }), handleWrapperClass: 'mediaSingle-resize-wrapper', handleClasses: handles, handleStyles: handleStyles, enable: this.props.enable, onResizeStop: this.handleResizeStop, onResizeStart: this.handleResizeStart }, this.props.children));
    };
    return Resizer;
}(React.Component));
export default Resizer;
//# sourceMappingURL=Resizer.js.map