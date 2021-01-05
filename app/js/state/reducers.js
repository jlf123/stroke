import deepFreeze from 'deep-freeze'
import * as ActionType from './action-types'
import Moment from 'moment'
import { blankAdf } from '../util/blank-adf'
import { map } from '@atlaskit/adf-utils'

const identity = (state) => state

const createReducer = (actionTypeReducerMap, initialState) => (
    state = initialState,
    action = {}
) => {
    const reducer =
        action.type !== undefined &&
        actionTypeReducerMap[action.type] !== undefined
            ? actionTypeReducerMap[action.type]
            : identity
    return reducer(state, action)
}

const isADFEmpty = (adfDocumentNode) => {
    if (!adfDocumentNode) {
        return true
    }

    if (
        adfDocumentNode.content.length === 1 &&
        adfDocumentNode.content[0].type === 'paragraph' &&
        adfDocumentNode.content[0].content.length === 0
    ) {
        return true
    }

    return false
}

const initialState = deepFreeze({
    notes: null,
    isFetchingUserNotes: true,
    errorFetchingNotes: null,
    isSavingUserNotes: false,
    errorSavingNotes: false,
    editorActions: null,
    isReplacingDocument: false,
    isDeletingNote: false,
    pendingNoteDeletion: null,
    tags: [],
    isFetchingTags: false,
    route: 'EDITOR',
    isSearchDrawerOpen: false,
    selectedTag: null,
    appPopup: null
})

const setActiveNoteInactive = (notes) => {
    if (notes) {
        Object.keys(notes).map((key, value) => {
            if (notes[key].active) {
                notes[key].active = false
            }
        })
        return notes
    }
}

const trashNote = (notes, key, actions) => {
    // add some extra logic
    const trashingActiveNote = notes[key].active
    delete notes[key]
    // add some extra logic when trashing an active note
    if (trashingActiveNote) {
        const nowActive = Object.keys(notes)[0]
        notes[nowActive].active = true
        replaceDocument(notes[nowActive].value, actions)
    }
    return notes
}

const replaceDocument = (value, actions) =>
    setTimeout(() => actions.replaceDocument(value))

const reducersByActionType = {
    [ActionType.FETCH_USER_NOTES_REQUESTED]: (state) => ({
        ...state,
        isFetchingUserNotes: true
    }),
    [ActionType.SEARCH_DRAWER_OPENED]: (state) => ({
        ...state,
        isSearchDrawerOpen: true
    }),
    [ActionType.SEARCH_DRAWER_CLOSED]: (state) => ({
        ...state,
        isSearchDrawerOpen: false
    }),
    [ActionType.FETCH_USER_NOTES_REQUEST_SUCCEEDED]: (
        state,
        { payload: { notes } }
    ) => ({
        ...state,
        notes: notes,
        isFetchingUserNotes: false,
        errorFetchingNotes: null
    }),
    [ActionType.FETCH_USER_NOTES_REQUEST_FAILED]: (
        state,
        { payload: { error } }
    ) => ({
        ...state,
        isFetchingUserNotes: false,
        errorFetchingNotes: error
    }),
    [ActionType.QUEUE_USER_NOTES_UPDATE]: (
        state,
        { payload: { key, value, title } }
    ) => {
        let searchableNoteText

        if (!isADFEmpty(value)) {
            searchableNoteText = map(value, (node) => node.text).join(' ')
        }

        return {
            ...state,
            notes: {
                ...state.notes,
                [key]: {
                    value,
                    title,
                    lastUpdatedAt: Moment().unix(),
                    active: true,
                    searchableNoteText
                }
            }
        }
    },
    [ActionType.CREATE_NEW_USER_NOTE]: (
        state,
        { payload: { value, title } }
    ) => {
        const body = value || blankAdf
        replaceDocument(body, state.actions)
        return {
            ...state,
            route: 'EDITOR',
            notes: {
                ...setActiveNoteInactive(state.notes),
                [Moment().unix()]: {
                    value: body,
                    title: title || '',
                    lastUpdatedAt: null,
                    active: true
                }
            },
            isReplacingDocument: true
        }
    },
    [ActionType.ADD_EDITOR_ACTIONS_STROKE]: (
        state,
        { payload: { actions } }
    ) => {
        return {
            ...state,
            actions: actions
        }
    },
    [ActionType.SWITCH_ACTIVE_NOTE]: (state, { payload: { key } }) => {
        replaceDocument(state.notes[key].value, state.actions)
        return {
            ...state,
            route: 'EDITOR',
            notes: {
                ...setActiveNoteInactive(state.notes),
                [key]: {
                    ...state.notes[key],
                    active: true
                }
            },
            isReplacingDocument: true
        }
    },
    [ActionType.SWITCH_ACTIVE_NOTE_SUCCEEDED]: (state) => ({
        ...state,
        isReplacingDocument: false
    }),
    [ActionType.SAVE_USER_NOTES_REQUESTED]: (state) => ({
        ...state,
        isSavingUserNotes: true
    }),
    [ActionType.SAVE_USER_NOTES_REQUEST_SUCCEEDED]: (state) => ({
        ...state,
        isSavingUserNotes: false,
        errorSavingNotes: false
    }),
    [ActionType.TRASH_USER_NOTE]: (state, { payload: { key } }) => ({
        ...state,
        isDeletingNote: false,
        pendingNoteDeletion: null,
        notes: {
            ...trashNote(state.notes, key, state.actions)
        }
    }),
    [ActionType.TRASH_USER_NOTE_REQUESTED]: (
        state,
        { payload: { key, title } }
    ) => ({
        ...state,
        isDeletingNote: true,
        pendingNoteDeletion: {
            key,
            title
        }
    }),
    [ActionType.TRASH_USER_NOTE_CANCELED]: (state) => ({
        ...state,
        isDeletingNote: false,
        pendingNoteDeletion: null
    }),
    [ActionType.TAGS_REQUESTED]: (state) => ({
        ...state,
        isFetchingTags: true
    }),
    [ActionType.TAGS_REQUESTED_SUCCEEDED]: (state, { tags }) => ({
        ...state,
        isFetchingTags: false,
        tags
    }),
    [ActionType.ROUTE_CHANGED]: (state, { route }) => ({
        ...state,
        route
    }),
    [ActionType.SET_ACTIVE_TAG]: (state, { tagName }) => ({
        ...state,
        selectedTag: tagName
    }),
    [ActionType.APP_POPUP_OPENED]: (
        state,
        { payload: { appUrl, appName, appRef, appId, appIcon } }
    ) => ({
        ...state,
        appPopup: {
            appUrl,
            appName,
            appRef,
            appId,
            appIcon
        }
    }),
    [ActionType.APP_POPUP_CLOSED]: (state) => ({ ...state, appPopup: null })
}

export default createReducer(reducersByActionType, initialState)
