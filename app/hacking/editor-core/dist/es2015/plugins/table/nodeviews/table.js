import * as tslib_1 from "tslib";
import * as React from 'react';
import { DOMSerializer, } from 'prosemirror-model';
import { akEditorFullPageMaxWidth } from '@atlaskit/editor-common';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { parseDOMColumnWidths, generateColgroup } from '../utils';
import TableComponent from './TableComponent';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { pluginKey, getPluginState } from '../pm-plugins/main';
import { pluginKey as tableResizingPluginKey } from '../pm-plugins/table-resizing/index';
import { pluginConfig as getPluginConfig } from '../index';
var tableAttributes = function (node) {
    return {
        'data-number-column': node.attrs.isNumberColumnEnabled,
        'data-layout': node.attrs.layout,
        'data-autosize': node.attrs.__autoSize,
    };
};
var toDOM = function (node, props) {
    var colgroup = '';
    if (props.allowColumnResizing) {
        // @ts-ignore
        colgroup = ['colgroup', {}].concat(generateColgroup(node));
    }
    return [
        'table',
        tableAttributes(node),
        colgroup,
        ['tbody', 0],
    ];
};
var TableView = /** @class */ (function (_super) {
    tslib_1.__extends(TableView, _super);
    function TableView(props) {
        var _this = _super.call(this, props.node, props.view, props.getPos, props.portalProviderAPI, props) || this;
        _this.componentDidMount = function () {
            // When we get a table with an 'auto' attribute, we want to:
            // 1. render with table-layout: auto
            // 2. capture the column widths
            // 3. set the column widths as attributes, and remove the 'auto' attribute,
            //    so the table renders the same, but is now fixed-width
            //
            // This can be used to migrate table appearances from other sources that are
            // usually rendered with 'auto'.
            //
            // We use this when migrating TinyMCE tables for Confluence, for example:
            // https://pug.jira-dev.com/wiki/spaces/AEC/pages/3362882215/How+do+we+map+TinyMCE+tables+to+Fabric+tables
            var _a = _this.view, state = _a.state, dispatch = _a.dispatch;
            var tr = state.tr;
            if (_this.node.attrs.__autoSize) {
                var basePos_1 = _this.getPos();
                if (typeof basePos_1 === 'undefined') {
                    return;
                }
                var colWidths_1 = parseDOMColumnWidths(_this.contentDOM);
                // overflow tables require all columns to be fixed width
                var tableWidth = colWidths_1.dividedWidths.reduce(function (sum, val) { return sum + val; }, 0);
                var isOverflowTable_1 = tableWidth > akEditorFullPageMaxWidth;
                _this.node.forEach(function (rowNode, rowOffset, i) {
                    rowNode.forEach(function (colNode, colOffset, j) {
                        var pos = rowOffset + colOffset + basePos_1 + 2;
                        tr.setNodeMarkup(pos, undefined, tslib_1.__assign({}, colNode.attrs, { colwidth: colWidths_1
                                .width(j, colNode.attrs.colspan, !isOverflowTable_1)
                                .map(Math.round) }));
                    });
                });
                // clear autosizing on the table node
                tr.setNodeMarkup(basePos_1, undefined, tslib_1.__assign({}, _this.node.attrs, { __autoSize: false }));
                dispatch(tr.setMeta('addToHistory', false));
            }
        };
        return _this;
    }
    TableView.prototype.getContentDOM = function () {
        var rendered = DOMSerializer.renderSpec(document, toDOM(this.node, this.reactComponentProps));
        if (rendered.dom) {
            this.table = rendered.dom;
        }
        return rendered;
    };
    TableView.prototype.setDomAttrs = function (node) {
        var _this = this;
        if (!this.table) {
            return;
        }
        var attrs = tableAttributes(node);
        Object.keys(attrs).forEach(function (attr) {
            _this.table.setAttribute(attr, attrs[attr]);
        });
    };
    TableView.prototype.render = function (props, forwardRef) {
        var _this = this;
        return (React.createElement(WithPluginState, { plugins: {
                containerWidth: widthPluginKey,
                pluginState: pluginKey,
                tableResizingPluginState: tableResizingPluginKey,
            }, editorView: props.view, render: function (pluginStates) { return (React.createElement(TableComponent, tslib_1.__assign({}, props, pluginStates, { node: _this.node, width: pluginStates.containerWidth.width, contentDOM: forwardRef, onComponentMount: _this.componentDidMount }))); } }));
    };
    TableView.prototype.ignoreMutation = function (record) {
        return true;
    };
    return TableView;
}(ReactNodeView));
export default TableView;
export var createTableView = function (portalProviderAPI) { return function (node, view, getPos) {
    var pluginConfig = getPluginState(view.state).pluginConfig;
    var allowColumnResizing = getPluginConfig(pluginConfig).allowColumnResizing;
    return new TableView({
        node: node,
        view: view,
        allowColumnResizing: allowColumnResizing,
        portalProviderAPI: portalProviderAPI,
        getPos: getPos,
    }).init();
}; };
//# sourceMappingURL=table.js.map