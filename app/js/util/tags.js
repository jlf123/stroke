import findIndex from 'lodash/findIndex'

export const saveTag = tag => {
    const fetchedNotes = getTags()
    if (!fetchedNotes.length || findIndex(fetchedNotes, tag) !== -1) {
        fetchedNotes.push(tag)
        window.localStorage.setItem('tags', JSON.stringify(fetchedNotes))
    }
}

export const getTagsFromLocalStorage = () => {
    const response = window.localStorage.getItem('tags')
    console.log('just got thi from localstorage: ', response)
    return response ? JSON.parse(response) : []
}
