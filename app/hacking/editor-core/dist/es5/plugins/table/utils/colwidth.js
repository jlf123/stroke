"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnWidths = /** @class */ (function () {
    function ColumnWidths() {
        this.columns = [];
    }
    Object.defineProperty(ColumnWidths.prototype, "dividedWidths", {
        /**
         * Returns an array with individual column widths, with each column spread evenly across
         * the columns it spans.
         */
        get: function () {
            return this.columns.map(function (colInfo) { return colInfo.width / colInfo.span; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnWidths.prototype, "columnInfo", {
        get: function () {
            return this.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an array representing the widths of each (possibly spanned) column within a range.
     * @param colIdx 0-based index for the start column.
     * @param span The number of columns the cell spans.
     * @param autosizeEnd Whether to return 0 for the very last column of the table.
     */
    ColumnWidths.prototype.width = function (colIdx, span, autosizeEnd) {
        var _this = this;
        if (span === void 0) { span = 1; }
        if (autosizeEnd === void 0) { autosizeEnd = false; }
        return this.columns
            .slice(colIdx, colIdx + span)
            .map(function (colInfo, idx) {
            return autosizeEnd && idx + colIdx === _this.columns.length - 1
                ? 0
                : colInfo.width;
        });
    };
    ColumnWidths.prototype.visit = function (colIdx, width, span) {
        if (span === void 0) { span = 1; }
        if (this.columns.length && colIdx < this.columns.length) {
            var existingCol = this.columns[colIdx];
            if (span <= existingCol.span) {
                // split the column
                existingCol.span -= span;
                this.columns = this.columns.fill({
                    width: width,
                    span: span,
                }, colIdx, colIdx + span);
            }
            else if (span === existingCol.span) {
                // same column span, update the width
                existingCol.width = width;
            }
        }
        else {
            // unseen columns
            this.columns = this.columns.concat(Array(this.columns.length + span - colIdx));
            this.columns.fill({
                width: width,
                span: span,
            }, colIdx, colIdx + span);
        }
    };
    return ColumnWidths;
}());
exports.ColumnWidths = ColumnWidths;
function parseDOMColumnWidths(node) {
    var tw = new ColumnWidths();
    var rows = node.querySelectorAll('tr');
    for (var i = 0, rowCount = rows.length; i < rowCount; i++) {
        var row = rows[i];
        var cols = row.querySelectorAll('td,th');
        var colPos = 0;
        for (var j = 0, colCount = cols.length; j < colCount; j++) {
            var col = cols[j];
            var cssWidth = getComputedStyle(col).width;
            var colwidth = cssWidth.endsWith('px')
                ? Number(cssWidth.substring(0, cssWidth.length - 2))
                : 0;
            var colspan = col.hasAttribute('colspan')
                ? Number(col.getAttribute('colspan'))
                : 1;
            tw.visit(colPos, colwidth, colspan);
            colPos += colspan;
        }
    }
    return tw;
}
exports.parseDOMColumnWidths = parseDOMColumnWidths;
//# sourceMappingURL=colwidth.js.map