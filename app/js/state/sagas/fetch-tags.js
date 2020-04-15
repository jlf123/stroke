import regeneratorRuntime from 'regenerator-runtime';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { queryNotes } from '../../util/notes';
import * as Actions from '../actions';
import { TAGS_REQUESTED } from '../action-types';
import { getSortedNotes, getTags } from '../selectors';
import { getTagsFromLocalStorage } from '../../util/tags';
import { traverse, reduce } from '@atlaskit/adf-utils';

export function* fetchTags() {
    try {
        let fetchedNotes = yield select(getSortedNotes);
        let fetchedTags;
        const tagValues = yield call(getTagsFromLocalStorage);
        fetchedTags = {};
        fetchedNotes.map(({ value, title, key }) => {
            traverse(value, {
                tag: (node, parent) => {
                    const tagPayload = {
                        title,
                        id: key,
                        text: reduce(
                            parent.node,
                            (acc, node) =>
                                node.type === 'text'
                                    ? (acc += ` ${node.text}`)
                                    : acc,
                            ''
                        )
                    };
                    if (!fetchedTags[node.attrs.id]) {
                        fetchedTags[node.attrs.id] = [];
                    }
                    fetchedTags[node.attrs.id].push(tagPayload);
                }
            });
        });

        const finalResponse = [];

        for (let key in fetchedTags) {
            finalResponse.push({
                tag: key,
                notes: fetchedTags[key]
            });
        }

        yield put(Actions.tagRequestSucceeded(finalResponse));
    } catch (e) {
        //yield put(Actions.fetchUserNotesRequestFailed(e))
    }
}

export default function*() {
    yield takeLatest(TAGS_REQUESTED, fetchTags);
}
