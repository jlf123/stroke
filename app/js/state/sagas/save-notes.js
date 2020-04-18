import regeneratorRuntime from 'regenerator-runtime'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { saveNotes } from '../../util/notes'
import * as Actions from '../actions'
import { SAVE_USER_NOTES_REQUESTED } from '../action-types'
import { getUserNotes } from '../selectors'

export function * saveUserNotes() {
    try {
        const fetchedNotes = yield select(getUserNotes)
        if (!fetchedNotes) {
            return
        }

        saveNotes(fetchedNotes)

        yield put(Actions.fetchUserNotesRequestSucceeded(fetchedNotes))
    } catch (error) {
        yield put(Actions.fetchUserNotesRequestFailed(error))
    }
}

export default function * () {
    yield takeLatest(SAVE_USER_NOTES_REQUESTED, saveUserNotes)
}
