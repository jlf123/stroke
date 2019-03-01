import { Command } from '../../types';
export declare function setLinkHref(pos: number, href: string): Command;
export declare function setLinkText(pos: number, text: string): Command;
export declare function insertLink(from: number, to: number, href: string, text?: string): Command;
export declare function removeLink(pos: number): Command;
export declare function showLinkToolbar(): Command;
export declare function hideLinkToolbar(): Command;
