const snippet = (document) => {
    if (!document) return ''
    const snippetText = findFirstTextNode(document.content)
    if (!snippetText) return ''
    return snippetText.split(' ').splice(0, 10).join(' ') + '...'
}

const findFirstTextNode = (content) => {
    if (!content || !content.length) return

    for (let i = 0; i < content.length; i++) {
        if (content[i].type === 'text') {
            return content[i].text
        }
        if (content[i].content) {
            return findFirstTextNode(content[i].content)
        }
    }
}

export default snippet
