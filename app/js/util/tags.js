export const getTagsFromLocalStorage = () => {
    const response = window.localStorage.getItem('tags')
    return response ? JSON.parse(response) : []
}

export const saveTags = (tags) => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
}

export const addTag = (tag) => {
    const localStorageTags = window.localStorage.getItem('tags')
    const currentTags = localStorageTags ? JSON.parse(localStorageTags) : []
    currentTags.push(tag)
    saveTags(currentTags)
}
