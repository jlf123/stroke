import regeneratorRuntime from 'regenerator-runtime'
import { spawn, all } from 'redux-saga/effects';
import fetchUserNotes from './state/sagas/fetch-notes';
import saveUserNotes from './state/sagas/save-notes';
import fetchTags from './state/sagas/fetch-tags';

export default function* () {
  yield all([
    spawn(fetchUserNotes),
    spawn(saveUserNotes),
    spawn(fetchTags)
  ]);
}