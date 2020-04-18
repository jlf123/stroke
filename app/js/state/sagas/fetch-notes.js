import regeneratorRuntime from 'regenerator-runtime'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { queryNotes } from '../../util/notes'
import * as Actions from '../actions'
import { FETCH_USER_NOTES_REQUESTED } from '../action-types'
import { getUserNotes } from '../selectors'

export function * fetchUserNotes() {
    try {
        // debugger;
        let fetchedNotes = yield select(getUserNotes)
        if (!fetchedNotes) {
            fetchedNotes = yield call(queryNotes)
        }

        yield put(Actions.fetchUserNotesRequestSucceeded(fetchedNotes))
    } catch (error) {
        yield put(Actions.fetchUserNotesRequestFailed(error))
    }
}

export default function * () {
    yield takeLatest(FETCH_USER_NOTES_REQUESTED, fetchUserNotes)
}
