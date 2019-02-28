import { Command } from '../../types';
export declare type DomAtPos = (pos: number) => {
    node: HTMLElement;
    offset: number;
};
export declare const removePanel: () => Command;
export declare const changePanelType: (panelType: import("../../../../editor-common/node_modules/@atlaskit/adf-schema/src/schema/nodes/panel").PanelType) => Command;
