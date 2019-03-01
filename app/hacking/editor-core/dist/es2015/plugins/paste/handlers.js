import { hasParentNodeOfType } from 'prosemirror-utils';
import { taskDecisionSliceFilter } from '../../utils/filter';
import { linkifyContent } from '../hyperlink/utils';
import { analyticsService } from '../../analytics';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';
import { getPasteSource } from './util';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
export var handlePasteIntoTaskAndDecision = function (slice) { return function (state, dispatch) {
    var _a = state.schema.nodes, decisionItem = _a.decisionItem, decisionList = _a.decisionList, taskList = _a.taskList, taskItem = _a.taskItem;
    if (decisionItem && decisionList && taskList && taskItem) {
        if (hasParentNodeOfType([decisionItem, taskItem])(state.selection)) {
            if (state.selection.empty) {
                slice = taskDecisionSliceFilter(slice, state.schema);
                slice = linkifyContent(state.schema, slice);
                var tr = closeHistory(state.tr)
                    .replaceSelection(slice)
                    .scrollIntoView();
                queueCardsFromChangedTr(state, tr);
                dispatch(tr);
                return true;
            }
        }
    }
    return false;
}; };
export var handlePasteAsPlainText = function (slice, event) { return function (state, dispatch, view) {
    // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
    // fuzzy matching of content. ProseMirror already handles this scenario and will
    // provide us with slice containing paragraphs with plain text, which we decorate
    // with "stored marks".
    // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
    // @see prosemirror-view/src/input.js:doPaste().
    var tr = closeHistory(state.tr);
    if (view.shiftKey) {
        // <- using the same internal flag that prosemirror-view is using
        analyticsService.trackEvent('atlassian.editor.paste.alt', {
            source: getPasteSource(event),
        });
        tr.replaceSelection(slice);
        (state.storedMarks || []).forEach(function (mark) {
            tr.addMark(tr.selection.from, tr.selection.from + slice.size, mark);
        });
        tr.scrollIntoView();
        dispatch(tr);
        return true;
    }
    return false;
}; };
export var handleMacroAutoConvert = function (text, slice) { return function (state, dispatch, view) {
    var macro = runMacroAutoConvert(state, text);
    if (macro) {
        var selection = state.tr.selection;
        var tr = state.tr.replaceSelection(slice);
        var before = tr.mapping.map(selection.from, -1);
        // insert the text or linkified/md-converted clipboard data
        dispatch(tr);
        // replace the text with the macro as a separate transaction
        // so the autoconversion generates 2 undo steps
        dispatch(closeHistory(view.state.tr)
            .replaceRangeWith(before, before + slice.size, macro)
            .scrollIntoView());
    }
    return !!macro;
}; };
//# sourceMappingURL=handlers.js.map