
export const tagSpec = {
    inline: true,
    group: 'inline',
    selectable: true,
    attrs: {
        id: { default: '' }
    },
    parseDOM: [
        {
            tag: 'span[data-node-type]',
            getAttrs: dom => ({
                id: dom.getAttribute('data-id')
            })
        }
    ],
    toDOM(node) {
        const attrs = {
            'data-node-type': 'tag',
            'data-id': node.attrs.id
        };
        return ['span', attrs];
    }
};