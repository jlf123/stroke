import * as ActionTypes from './action-types'
import Moment from 'moment'

export const openSearchDrawer = () => ({
    type: ActionTypes.SEARCH_DRAWER_OPENED
})

export const closeSearchDrawer = () => ({
    type: ActionTypes.SEARCH_DRAWER_CLOSED
})

export const fetchUserNotesRequested = () => ({
    type: ActionTypes.FETCH_USER_NOTES_REQUESTED,
    payload: {}
})

export const fetchUserNotesRequestSucceeded = (notes) => ({
    type: ActionTypes.FETCH_USER_NOTES_REQUEST_SUCCEEDED,
    payload: { notes }
})

export const fetchUserNotesRequestFailed = (error) => ({
    type: ActionTypes.FETCH_USER_NOTES_REQUEST_FAILED,
    payload: { error }
})

export const saveUserNotesRequested = () => ({
    type: ActionTypes.SAVE_USER_NOTES_REQUESTED
})

export const saveUserNotesRequestSucceeded = () => ({
    type: ActionTypes.SAVE_USER_NOTES_REQUEST_SUCCEEDED
})

export const saveUserNotesRequestFailed = (error) => ({
    type: ActionTypes.SAVE_USER_NOTES_REQUEST_FAILED,
    payload: { error }
})

export const queueUserNoteUpdate = (key, value, title) => ({
    type: ActionTypes.QUEUE_USER_NOTES_UPDATE,
    payload: { key, value, title }
})

export const createNewUserNote = (value, title) => ({
    type: ActionTypes.CREATE_NEW_USER_NOTE,
    payload: { value, title }
})

export const addEditorActionsStroke = (actions) => ({
    type: ActionTypes.ADD_EDITOR_ACTIONS_STROKE,
    payload: { actions }
})

export const switchActiveNote = (key) => ({
    type: ActionTypes.SWITCH_ACTIVE_NOTE,
    payload: { key }
})

export const switchActiveNoteSucceeded = () => ({
    type: ActionTypes.SWITCH_ACTIVE_NOTE_SUCCEEDED
})

export const trashUserNote = (key) => ({
    type: ActionTypes.TRASH_USER_NOTE,
    payload: { key }
})

export const trashUserNoteRequested = (key, title) => ({
    type: ActionTypes.TRASH_USER_NOTE_REQUESTED,
    payload: { key, title }
})

export const trashUserNoteCanceled = () => ({
    type: ActionTypes.TRASH_USER_NOTE_CANCELED
})

export const tagsRequested = () => ({
    type: ActionTypes.TAGS_REQUESTED
})

export const changeRoute = (route) => ({
    type: ActionTypes.ROUTE_CHANGED,
    route
})

export const tagRequestSucceeded = (tags) => ({
    type: ActionTypes.TAGS_REQUESTED_SUCCEEDED,
    tags
})

export const setActiveTag = (tagName) => ({
    type: ActionTypes.SET_ACTIVE_TAG,
    tagName
})

export const openAppPopup = ({ appUrl, appName, appRef, appId, appIcon }) => ({
    type: ActionTypes.APP_POPUP_OPENED,
    payload: { appUrl, appName, appRef, appId, appIcon }
})

export const closeAppPopup = () => ({
    type: ActionTypes.APP_POPUP_CLOSED
})
