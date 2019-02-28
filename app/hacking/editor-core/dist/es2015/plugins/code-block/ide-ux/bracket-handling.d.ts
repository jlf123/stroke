export declare const getAutoClosingBracketInfo: (before: string, after: string) => {
    left: string | undefined;
    right: string | undefined;
    hasTrailingMatchingBracket: boolean;
};
export declare const isCursorBeforeClosingBracket: (after: string) => boolean;
export declare const isClosingBracket: (text: string) => boolean;
