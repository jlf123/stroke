import { EditorState } from 'prosemirror-state';
import { Command } from '../../../types';
import { FloatingToolbarButton } from '../../floating-toolbar/types';
export declare function createBreakoutToolbarItems(state: EditorState, { formatMessage }: {
    formatMessage: any;
}): false | FloatingToolbarButton<Command>[];
