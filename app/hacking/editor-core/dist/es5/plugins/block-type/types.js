"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// (there are also different blocks for different types of panel, when
// they're really all just a panel node)
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
var react_intl_1 = require("react-intl");
exports.messages = react_intl_1.defineMessages({
    normal: {
        id: 'fabric.editor.normal',
        defaultMessage: 'Normal text',
        description: 'This is the default text style',
    },
    heading1: {
        id: 'fabric.editor.heading1',
        defaultMessage: 'Heading 1',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading2: {
        id: 'fabric.editor.heading2',
        defaultMessage: 'Heading 2',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading3: {
        id: 'fabric.editor.heading3',
        defaultMessage: 'Heading 3',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading4: {
        id: 'fabric.editor.heading4',
        defaultMessage: 'Heading 4',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading5: {
        id: 'fabric.editor.heading5',
        defaultMessage: 'Heading 5',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading6: {
        id: 'fabric.editor.heading6',
        defaultMessage: 'Heading 6',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    blockquote: {
        id: 'fabric.editor.blockquote',
        defaultMessage: 'Block quote',
        description: 'Quote some text',
    },
    codeblock: {
        id: 'fabric.editor.codeblock',
        defaultMessage: 'Code block',
        description: 'Insert a block of code (code snippet)',
    },
    panel: {
        id: 'fabric.editor.panel',
        defaultMessage: 'Panel',
        description: 'Visually distinguishes your text by adding a background colour (blue, purple, yellow, green, red)',
    },
    notePanel: {
        id: 'fabric.editor.notePanel',
        defaultMessage: 'Note panel',
        description: 'Visually distinguishes your text by adding a note panel',
    },
    successPanel: {
        id: 'fabric.editor.successPanel',
        defaultMessage: 'Success panel',
        description: 'Visually distinguishes your text by adding a success panel',
    },
    warningPanel: {
        id: 'fabric.editor.warningPanel',
        defaultMessage: 'Warning panel',
        description: 'Visually distinguishes your text by adding a warning panel',
    },
    errorPanel: {
        id: 'fabric.editor.errorPanel',
        defaultMessage: 'Error panel',
        description: 'Visually distinguishes your text by adding a error panel',
    },
    other: {
        id: 'fabric.editor.other',
        defaultMessage: 'Others...',
        description: 'Other text formatting',
    },
});
exports.NORMAL_TEXT = {
    name: 'normal',
    title: exports.messages.normal,
    nodeName: 'paragraph',
    tagName: 'p',
};
exports.HEADING_1 = {
    name: 'heading1',
    title: exports.messages.heading1,
    nodeName: 'heading',
    tagName: 'h1',
    level: 1,
};
exports.HEADING_2 = {
    name: 'heading2',
    title: exports.messages.heading2,
    nodeName: 'heading',
    tagName: 'h2',
    level: 2,
};
exports.HEADING_3 = {
    name: 'heading3',
    title: exports.messages.heading3,
    nodeName: 'heading',
    tagName: 'h3',
    level: 3,
};
exports.HEADING_4 = {
    name: 'heading4',
    title: exports.messages.heading4,
    nodeName: 'heading',
    tagName: 'h4',
    level: 4,
};
exports.HEADING_5 = {
    name: 'heading5',
    title: exports.messages.heading5,
    nodeName: 'heading',
    tagName: 'h5',
    level: 5,
};
exports.HEADING_6 = {
    name: 'heading6',
    title: exports.messages.heading6,
    nodeName: 'heading',
    tagName: 'h6',
    level: 6,
};
exports.BLOCK_QUOTE = {
    name: 'blockquote',
    title: exports.messages.blockquote,
    nodeName: 'blockquote',
};
exports.CODE_BLOCK = {
    name: 'codeblock',
    title: exports.messages.codeblock,
    nodeName: 'codeBlock',
};
exports.PANEL = {
    name: 'panel',
    title: exports.messages.panel,
    nodeName: 'panel',
};
exports.OTHER = {
    name: 'other',
    title: exports.messages.other,
    nodeName: '',
};
exports.TEXT_BLOCK_TYPES = [
    exports.NORMAL_TEXT,
    exports.HEADING_1,
    exports.HEADING_2,
    exports.HEADING_3,
    exports.HEADING_4,
    exports.HEADING_5,
    exports.HEADING_6,
];
exports.WRAPPER_BLOCK_TYPES = [exports.BLOCK_QUOTE, exports.CODE_BLOCK, exports.PANEL];
exports.ALL_BLOCK_TYPES = exports.TEXT_BLOCK_TYPES.concat(exports.WRAPPER_BLOCK_TYPES);
exports.HEADINGS_BY_LEVEL = exports.TEXT_BLOCK_TYPES.reduce(function (acc, blockType) {
    if (blockType.level && blockType.nodeName === 'heading') {
        acc[blockType.level] = blockType;
    }
    return acc;
}, {});
exports.HEADINGS_BY_NAME = exports.TEXT_BLOCK_TYPES.reduce(function (acc, blockType) {
    if (blockType.level && blockType.nodeName === 'heading') {
        acc[blockType.name] = blockType;
    }
    return acc;
}, {});
//# sourceMappingURL=types.js.map