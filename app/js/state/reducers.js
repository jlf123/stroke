import deepFreeze from 'deep-freeze'
import map from 'lodash/map'
import * as ActionType from './action-types'
import Moment from 'moment'
import { getActiveUserNote } from './selectors'
import { blankAdf } from '../util/blank-adf'
import _ from 'lodash'

const identity = state => state

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

const initialState = deepFreeze({
    notes: null,
    isFetchingUserNotes: false,
    errorFetchingNotes: null,
    isSavingUserNotes: false,
    errorSavingNotes: false,
    editorActions: null,
    isReplacingDocument: false,
    isDeletingNote: false,
    pendingNoteDeletion: null,
    tags: null,
    isFetchingTags: false,
    route: 'EDITOR'
})

const setActiveNoteInactive = notes => {
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
    [ActionType.FETCH_USER_NOTES_REQUESTED]: state => ({
        ...state,
        isFetchingUserNotes: true
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
        console.log('inside queue user update: ', title)
        return {
            ...state,
            notes: {
                ...state.notes,
                [key]: {
                    value,
                    title,
                    lastUpdatedAt: Moment().unix(),
                    active: true
                }
            }
        }
    },
    [ActionType.CREATE_NEW_USER_NOTE]: (
        state,
        { payload: { value, title } }
    ) => {
        console.log('inside createNewUserNote')
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
        console.log('trying to add the editor actions: ', actions)
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
    [ActionType.SWITCH_ACTIVE_NOTE_SUCCEEDED]: state => ({
        ...state,
        isReplacingDocument: false
    }),
    [ActionType.SAVE_USER_NOTES_REQUESTED]: state => ({
        ...state,
        isSavingUserNotes: true
    }),
    [ActionType.SAVE_USER_NOTES_REQUEST_SUCCEEDED]: state => ({
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
    [ActionType.TRASH_USER_NOTE_CANCELED]: state => ({
        ...state,
        isDeletingNote: false,
        pendingNoteDeletion: null
    }),
    [ActionType.TAGS_REQUESTED]: state => ({
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
    })
}

export default createReducer(reducersByActionType, initialState)
