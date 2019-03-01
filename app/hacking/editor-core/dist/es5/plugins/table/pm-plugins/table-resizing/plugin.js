"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
var actions_1 = require("./actions");
var resizer_1 = require("./resizer/resizer");
var contentWidth_1 = require("./resizer/contentWidth");
var utils_1 = require("./utils");
var types_1 = require("../../types");
var editor_disabled_1 = require("../../../editor-disabled");
var width_1 = require("../../../width");
var utils_2 = require("../../../../utils");
exports.pluginKey = new prosemirror_state_1.PluginKey('tableFlexiColumnResizing');
function createPlugin(dispatch, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.handleWidth, handleWidth = _c === void 0 ? 5 : _c, _d = _b.cellMinWidth, cellMinWidth = _d === void 0 ? 25 : _d, _e = _b.lastColumnResizable, lastColumnResizable = _e === void 0 ? true : _e;
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function () { return new ResizeState(-1, null); },
            apply: function (tr, pluginState, prevState, state) {
                var newPluginState = pluginState.apply(tr, state);
                if ((newPluginState &&
                    pluginState.activeHandle !== newPluginState.activeHandle) ||
                    pluginState.dragging !== newPluginState.dragging) {
                    dispatch(exports.pluginKey, newPluginState);
                    return newPluginState;
                }
                return pluginState;
            },
        },
        view: function () { return ({
            update: function (view) {
                var _a = view.state, selection = _a.selection, schema = _a.schema;
                var table = prosemirror_utils_1.findParentNodeOfType(schema.nodes.table)(selection);
                var isInsideCells = prosemirror_utils_1.hasParentNodeOfType([
                    schema.nodes.tableCell,
                    schema.nodes.tableHeader,
                ])(selection);
                if (table && isInsideCells) {
                    var cell = prosemirror_utils_1.findParentNodeOfType([
                        schema.nodes.tableCell,
                        schema.nodes.tableHeader,
                    ])(selection);
                    var elem = view.domAtPos(cell.start).node; // nodeview
                    var elemOrWrapper = utils_2.closestElement(elem, "." + types_1.TableCssClassName.TABLE_HEADER_NODE_WRAPPER + ", ." + types_1.TableCssClassName.TABLE_CELL_NODE_WRAPPER) || elem;
                    var minWidth = contentWidth_1.contentWidth(elem, elem).minWidth;
                    // if the contents of the element are wider than the cell
                    // we resize the cell to the new min cell width.
                    // which should cater to the nowrap element and wrap others.
                    if (elemOrWrapper && elemOrWrapper.offsetWidth < minWidth) {
                        actions_1.handleBreakoutContent(view, elemOrWrapper, table.pos + 1, minWidth, table.node);
                    }
                }
            },
        }); },
        props: {
            attributes: function (state) {
                var pluginState = exports.pluginKey.getState(state);
                return pluginState.activeHandle > -1
                    ? { class: types_1.TableCssClassName.RESIZING + " resize-cursor" }
                    : { class: types_1.TableCssClassName.RESIZING };
            },
            handleDOMEvents: {
                mousemove: function (view, event) {
                    handleMouseMove(view, event, handleWidth, lastColumnResizable);
                    var dragging = exports.pluginKey.getState(view.state).dragging;
                    if (dragging) {
                        actions_1.updateControls(view.state);
                    }
                    return false;
                },
                mouseleave: function (view) {
                    handleMouseLeave(view);
                    actions_1.updateControls(view.state);
                    return true;
                },
                mousedown: function (view, event) {
                    return handleMouseDown(view, event, cellMinWidth);
                },
            },
            decorations: function (state) {
                var activeHandle = exports.pluginKey.getState(state).activeHandle;
                if (typeof activeHandle === 'number' && activeHandle > -1) {
                    return handleDecorations(state, activeHandle);
                }
            },
            nodeViews: {},
        },
    });
}
exports.createPlugin = createPlugin;
var ResizeState = /** @class */ (function () {
    function ResizeState(activeHandle, dragging) {
        this.activeHandle = activeHandle;
        this.dragging = dragging;
        return Object.freeze(this);
    }
    ResizeState.prototype.apply = function (tr, state) {
        var action = tr.getMeta(exports.pluginKey);
        var editorDisabled = editor_disabled_1.pluginKey.getState(state).editorDisabled;
        // Disable table resizing if the editor is disabled
        if (editorDisabled) {
            return new ResizeState(-1, null);
        }
        if (action && action.setHandle !== undefined) {
            return new ResizeState(action.setHandle, null);
        }
        if (action && action.setDragging !== undefined) {
            return new ResizeState(this.activeHandle, action.setDragging);
        }
        if (this.activeHandle > -1 && tr.docChanged) {
            var handle = tr.mapping.map(this.activeHandle, -1);
            if (!utils_1.pointsAtCell(tr.doc.resolve(handle))) {
                handle = -1;
            }
            return new ResizeState(handle, this.dragging);
        }
        return this;
    };
    return ResizeState;
}());
exports.ResizeState = ResizeState;
function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
    var pluginState = exports.pluginKey.getState(view.state);
    if (!pluginState.dragging) {
        var target = utils_1.domCellAround(event.target);
        var cell = -1;
        if (target) {
            var _a = target.getBoundingClientRect(), left = _a.left, right = _a.right;
            if (event.clientX - left <= handleWidth) {
                cell = utils_1.edgeCell(view, event, 'left');
            }
            else if (right - event.clientX <= handleWidth) {
                cell = utils_1.edgeCell(view, event, 'right');
            }
        }
        if (typeof cell === 'number' && cell !== pluginState.activeHandle) {
            if (!lastColumnResizable && cell !== -1) {
                var $cell = view.state.doc.resolve(cell);
                var table = $cell.node(-1);
                var map = prosemirror_tables_1.TableMap.get(table);
                var start = $cell.start(-1);
                var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
                if (col === map.width - 1) {
                    return;
                }
            }
            view.dispatch(view.state.tr.setMeta(exports.pluginKey, { setHandle: cell }));
        }
    }
}
function handleMouseLeave(view) {
    var pluginState = exports.pluginKey.getState(view.state);
    if (pluginState.activeHandle > -1 && !pluginState.dragging) {
        view.dispatch(view.state.tr.setMeta(exports.pluginKey, { setHandle: -1 }));
    }
}
function handleMouseDown(view, event, cellMinWidth) {
    var state = view.state;
    var _a = exports.pluginKey.getState(state), activeHandle = _a.activeHandle, dragging = _a.dragging;
    if (activeHandle === -1 || dragging) {
        return false;
    }
    var cell = view.state.doc.nodeAt(activeHandle);
    var $cell = view.state.doc.resolve(activeHandle);
    var dom = view.domAtPos($cell.start(-1)).node;
    while (dom.nodeName !== 'TABLE') {
        dom = dom.parentNode;
    }
    var containerWidth = width_1.pluginKey.getState(view.state).width;
    var resizer = resizer_1.default.fromDOM(dom, {
        minWidth: cellMinWidth,
        maxSize: utils_1.getLayoutSize(dom.getAttribute('data-layout'), containerWidth),
        node: $cell.node(-1),
    });
    resizer.apply(resizer.currentState);
    var width = utils_1.currentColWidth(view, activeHandle, cell.attrs);
    view.dispatch(view.state.tr.setMeta(exports.pluginKey, {
        setDragging: { startX: event.clientX, startWidth: width },
    }));
    function finish(event) {
        var clientX = event.clientX;
        window.removeEventListener('mouseup', finish);
        window.removeEventListener('mousemove', move);
        var _a = exports.pluginKey.getState(view.state), activeHandle = _a.activeHandle, dragging = _a.dragging;
        if (dragging) {
            var startX = dragging.startX;
            actions_1.updateColumnWidth(view, activeHandle, clientX - startX, resizer);
            view.dispatch(view.state.tr.setMeta(exports.pluginKey, { setDragging: null }));
        }
    }
    function move(event) {
        var clientX = event.clientX, which = event.which;
        if (!which) {
            return finish(event);
        }
        var _a = exports.pluginKey.getState(view.state), activeHandle = _a.activeHandle, startX = _a.dragging.startX;
        actions_1.resizeColumn(view, activeHandle, clientX - startX, resizer);
    }
    window.addEventListener('mouseup', finish);
    window.addEventListener('mousemove', move);
    event.preventDefault();
    return true;
}
function handleDecorations(state, cell) {
    var decorations = [];
    var $cell = state.doc.resolve(cell);
    var table = $cell.node(-1);
    var map = prosemirror_tables_1.TableMap.get(table);
    var start = $cell.start(-1);
    var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan;
    for (var row = 0; row < map.height; row++) {
        var index = col + row * map.width - 1;
        // For positions that are have either a different cell or the end
        // of the table to their right, and either the top of the table or
        // a different cell above them, add a decoration
        if ((col === map.width || map.map[index] !== map.map[index + 1]) &&
            (row === 0 || map.map[index - 1] !== map.map[index - 1 - map.width])) {
            var cellPos = map.map[index];
            var pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
            var dom = document.createElement('div');
            dom.className = types_1.TableCssClassName.COLUMN_RESIZE_HANDLE;
            decorations.push(prosemirror_view_1.Decoration.widget(pos, dom));
        }
    }
    return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
}
//# sourceMappingURL=plugin.js.map