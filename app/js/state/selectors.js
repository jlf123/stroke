import orderBy from 'lodash/orderBy'
import { traverse } from '@atlaskit/adf-utils'

export const getIsFetchingNotes = ({ state }) => state.isFetchingUserNotes

export const getUserNotes = (state) => {
    return state.state.notes
}

export const getSortedNotes = (state) => {
    const notes = getUserNotes(state)
    if (!notes) {
        return null
    }
    const sortedNotes = []
    // convert object into a collection to be sorted
    for (const key in notes) {
        sortedNotes.push({
            key,
            ...notes[key]
        })
    }
    return orderBy(sortedNotes, ['lastUpdatedAt'], ['desc'])
}

export const getShouldShowFetchNoteError = (state) => state.errorFetchingNotes

export const getActiveUserNote = (state) => {
    const notes = getUserNotes(state)
    if (!notes) {
        return {}
    }
    const active = {}
    Object.keys(notes).map((key, index) => {
        if (notes[key].active) {
            active[key] = notes[key]
        }
    })
    return active
}

export const getEditorActions = (state) => state.state.actions

export const getIsReplacingDocument = (state) => state.state.isReplacingDocument

export const getIsDeletingNote = ({ state }) => state.isDeletingNote

export const getIsFetchingTags = ({ state }) => state.getIsFetchingTags

export const getTags = ({ state }) =>
    state.tags
        .map((tag) => tag.tagName)
        .filter((value, index, self) => {
            return self.indexOf(value) === index
        })

export const getRoute = ({ state }) => state.route

export const getIsSearchDrawerOpen = ({ state }) => state.isSearchDrawerOpen

export const getNoteTitleAndSnippetsByActiveTag = ({ state }) => {
    const activeTag = state.selectedTag
    if (!activeTag) {
        return []
    }

    // get all the occurences of the selectedTag
    const tags = state.tags.filter((tag) => tag.tagName === activeTag)
    const notes = state.notes
    const noteTitleAndSnippets = []

    // map through all the tags and find the adf for the corresponding note
    // then we need to traverse the adf to find the block element right
    // after each active tag
    tags.map(({ noteKey }) =>
        traverse(notes[noteKey].value, {
            extension: (node, { node: parent }) => {
                if (
                    node.attrs.extensionKey === 'tag' &&
                    node.attrs.parameters.title === activeTag
                ) {
                    let snippetAdf
                    parent.content.forEach((siblingNode, index) => {
                        if (
                            parent.content[index].type === 'extension' &&
                            parent.content[index].attrs.extensionKey ===
                                'tag' &&
                            parent.content[index].attrs.parameters.title ===
                                activeTag
                        ) {
                            // if we found the tag extension, grab the very next block content,
                            // this is the best way I could figure out how to tag content with the
                            // fabric editor
                            // todo: figure out how to have duplicate tags in the same note
                            snippetAdf = parent.content[index + 1]
                        }
                    })

                    // we need to return the full adf doc so that we can
                    // render the adf snippet with the Fabric
                    if (snippetAdf) {
                        noteTitleAndSnippets.push({
                            title: notes[noteKey].title,
                            snippet: {
                                version: 1,
                                type: 'doc',
                                content: [snippetAdf]
                            },
                            id: noteKey
                        })
                    }
                }
            }
        })
    )
    return noteTitleAndSnippets
}

export const getSelectedTag = ({ state }) => state.selectedTag

export const getAppPopup = ({ state }) => state.appPopup
