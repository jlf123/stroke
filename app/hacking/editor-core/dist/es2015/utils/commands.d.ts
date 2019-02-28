import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ResolvedPos } from 'prosemirror-model';
import { Command } from '../types';
declare type Predicate = (state: EditorState, view?: EditorView) => boolean;
declare const filter: (predicates: Predicate | Predicate[], cmd: Command) => Command;
declare const isEmptySelectionAtStart: (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
declare const isFirstChildOfParent: (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
/**
 * Creates a filter that checks if the node at a given number of parents above the current
 * selection is of the correct node type.
 * @param nodeType The node type to compare the nth parent against
 * @param depthAway How many levels above the current node to check against. 0 refers to
 * the current selection's parent, which will be the containing node when the selection
 * is usually inside the text content.
 */
declare const isNthParentOfType: (nodeType: any, depthAway: any) => (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
declare function findCutBefore($pos: ResolvedPos): ResolvedPos | null;
export { filter, isEmptySelectionAtStart, isFirstChildOfParent, isNthParentOfType, findCutBefore, };
