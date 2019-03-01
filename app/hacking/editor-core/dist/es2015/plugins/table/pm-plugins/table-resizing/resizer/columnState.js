import { contentWidth } from './contentWidth';
import { calculateColWidth, unitToNumber, addContainerLeftRightPadding, } from './utils';
var ColumnState = /** @class */ (function () {
    function ColumnState(width, wrapWidth, minWidth) {
        if (minWidth === void 0) { minWidth = 0; }
        this.width = width;
        this.wrapWidth = wrapWidth;
        this.minWidth = minWidth;
        return Object.freeze(this);
    }
    Object.defineProperty(ColumnState.prototype, "freeSpace", {
        get: function () {
            var _a = this, minWidth = _a.minWidth, width = _a.width, wrapWidth = _a.wrapWidth;
            return Math.max(width - Math.max(wrapWidth, minWidth), 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new ResizeState based on the current
     * appearance of an element.
     * @param {HTMLElement} table Reference to the <table> node
     * @param {number} colIdx The column index
     * @param {number} minWidth Minimum width a column is permitted to be
     */
    ColumnState.fromDOM = function (table, colIdx, minWidth) {
        var minColWidth = minWidth;
        var width = calculateColWidth(table, colIdx);
        var wrapWidth = calculateColWidth(table, colIdx, function (col, computedStyle) {
            var borderWidth = computedStyle
                .borderWidth.split(' ')
                .reduce(function (acc, current) { return (acc += unitToNumber(current)); }, 0);
            var _a = contentWidth(col, col), width = _a.width, minWidth = _a.minWidth;
            // Override the min width, if their is content that can't collapse
            // Past a certain width.
            minColWidth = Math.max(addContainerLeftRightPadding(minWidth, computedStyle), minColWidth);
            return addContainerLeftRightPadding(width + borderWidth, computedStyle);
        });
        return new ColumnState(width, wrapWidth, minColWidth);
    };
    ColumnState.prototype.clone = function (newWidth) {
        var _a = this, minWidth = _a.minWidth, width = _a.width, wrapWidth = _a.wrapWidth;
        return new ColumnState(newWidth ? newWidth : width, wrapWidth, minWidth);
    };
    return ColumnState;
}());
export default ColumnState;
//# sourceMappingURL=columnState.js.map