const snippet = (document) => {
    if (!document) {return ''}
    const snippetText = findFirstTextNode(document.content)
    if (!snippetText) {return ''}
    return snippetText.split(' ').splice(0, 10).join(' ') + '...'
}

const findFirstTextNode = (content) => {
    if (!content || !content.length) {return}

    for (const element of content) {
        if (element.type === 'text') {
            return element.text
        }
        if (element.content) {
            return findFirstTextNode(element.content)
        }
    }
}

export default snippet
