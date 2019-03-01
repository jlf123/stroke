/// <reference types="react" />
export interface Props {
    element: HTMLElement | null;
    onEdit: () => void;
    onRemove: () => void;
    stickToolbarToBottom?: boolean;
    onLayoutChange?: (mode: any) => void;
    layout?: string;
    showLayoutOptions?: boolean;
}
export default function ExtensionEditPanel(this: any, props: Props): JSX.Element | null;
