import { EditorView } from 'prosemirror-view';
import { Command } from '../../../types';
export declare const moveRight: () => Command;
export declare const moveLeft: (view: EditorView<any> & {
    cursorWrapper?: any;
}) => Command;
export declare const removeIgnoredNodes: (view: EditorView<any>) => Command;
export declare const toggleEm: () => Command;
export declare const toggleStrike: () => Command;
export declare const toggleStrong: () => Command;
export declare const toggleUnderline: () => Command;
export declare const toggleSuperscript: () => Command;
export declare const toggleSubscript: () => Command;
export declare const toggleCode: () => Command;
export declare const createInlineCodeFromTextInput: (from: number, to: number, text: string) => Command;
