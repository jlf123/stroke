import regeneratorRuntime from 'regenerator-runtime'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions'
import { TAGS_REQUESTED } from '../action-types'
import { getTagsFromLocalStorage } from '../../util/tags'

export function* fetchTags() {
    try {
        const tagValues = yield call(getTagsFromLocalStorage)
        yield put(Actions.tagRequestSucceeded(tagValues))
    } catch (error) {
        console.log(error);
        // yield put(Actions.fetchUserNotesRequestFailed(e))
    }
}

export default function* () {
    yield takeLatest(TAGS_REQUESTED, fetchTags)
}
