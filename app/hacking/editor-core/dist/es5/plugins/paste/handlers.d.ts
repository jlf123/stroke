import { Slice } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const handlePasteIntoTaskAndDecision: (slice: Slice<any>) => (state: EditorState<any>, dispatch: any) => boolean;
export declare const handlePasteAsPlainText: (slice: Slice<any>, event: ClipboardEvent) => (state: EditorState<any>, dispatch: any, view: EditorView<any>) => boolean;
export declare const handleMacroAutoConvert: (text: string, slice: Slice<any>) => (state: EditorState<any>, dispatch: any, view: EditorView<any>) => boolean;
