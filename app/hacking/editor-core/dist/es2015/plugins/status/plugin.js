import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
export var pluginKey = new PluginKey('statusPlugin');
var SelectionChange = /** @class */ (function () {
    function SelectionChange() {
        this.changeHandlers = [];
        this.changeHandlers = [];
    }
    SelectionChange.prototype.subscribe = function (cb) {
        this.changeHandlers.push(cb);
    };
    SelectionChange.prototype.unsubscribe = function (cb) {
        this.changeHandlers = this.changeHandlers.filter(function (ch) { return ch !== cb; });
    };
    SelectionChange.prototype.notifyNewSelection = function (newSelection, prevSelection) {
        this.changeHandlers.forEach(function (cb) { return cb(newSelection, prevSelection); });
    };
    return SelectionChange;
}());
export { SelectionChange };
var createPlugin = function (_a) {
    var dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
    return new Plugin({
        state: {
            init: function () { return ({
                autoFocus: false,
                selectionChanges: new SelectionChange(),
                showStatusPickerAt: null,
                selectedStatus: null,
            }); },
            apply: function (tr, state, editorState) {
                var meta = tr.getMeta(pluginKey);
                var nodeAtSelection = tr.doc.nodeAt(tr.selection.from);
                if (state.showStatusPickerAt &&
                    (!nodeAtSelection ||
                        nodeAtSelection.type !== editorState.schema.nodes.status)) {
                    var newState = tslib_1.__assign({}, state, { showStatusPickerAt: null, selectedStatus: null });
                    dispatch(pluginKey, newState);
                    return newState;
                }
                if (meta) {
                    var selectedStatus = null;
                    if (meta.showStatusPickerAt &&
                        meta.showStatusPickerAt !== state.showStatusPickerAt) {
                        var statusNode = tr.doc.nodeAt(meta.showStatusPickerAt);
                        if (statusNode) {
                            selectedStatus = statusNode.attrs;
                        }
                    }
                    var newState = tslib_1.__assign({}, state, meta, { selectedStatus: selectedStatus });
                    dispatch(pluginKey, newState);
                    return newState;
                }
                if (tr.docChanged && state.showStatusPickerAt) {
                    var _a = tr.mapping.mapResult(state.showStatusPickerAt), pos = _a.pos, deleted = _a.deleted;
                    var newState = {
                        showStatusPickerAt: deleted ? null : pos,
                        selectedStatus: null,
                    };
                    if (newState.showStatusPickerAt !== state.showStatusPickerAt) {
                        dispatch(pluginKey, newState);
                        return newState;
                    }
                }
                return state;
            },
        },
        key: pluginKey,
        props: {
            nodeViews: {
                status: ReactNodeView.fromComponent(StatusNodeView, portalProviderAPI),
            },
        },
        view: function (view) {
            return {
                update: function (view, prevState) {
                    var newSelection = view.state.selection;
                    var prevSelection = prevState.selection;
                    if (!prevSelection.eq(newSelection)) {
                        // selection changed
                        var pluginState = pluginKey.getState(view.state);
                        var selectionChanges = pluginState.selectionChanges;
                        if (selectionChanges) {
                            selectionChanges.notifyNewSelection(newSelection, prevSelection);
                        }
                    }
                },
            };
        },
    });
};
export default createPlugin;
//# sourceMappingURL=plugin.js.map