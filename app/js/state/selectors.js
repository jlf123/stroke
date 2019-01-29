import { createSelector } from 'reselect';
import { orderBy } from 'lodash';

const strokeSelector = state => state.state;

export const getIsFetchingNotes = state => state.isFetchingUserNotes;

export const getUserNotes = state => {
    return state.state.notes;
};

export const getSortedNotes = state => {
    let notes = getUserNotes(state);
    if (!notes) return null;
    let sortedNotes = [];
    // convert object into a collection to be sorted
    for (let key in notes) {
        sortedNotes.push({
            key,
            ...notes[key]
        });
    }
    return orderBy(sortedNotes, ['lastUpdatedAt'], ['desc']);
};

export const getShouldShowFetchNoteError = state => state.errorFetchingNotes;

export const getActiveUserNote = state => {
    let notes = getUserNotes(state);
    if (!notes) return {};
    let active = {};
    Object.keys(notes).map((key, index) => {
        if (notes[key].active) active[key] = notes[key];
    });
    return active;
};

export const getEditorActions = state => state.state.actions;

export const getIsReplacingDocument = state => state.state.isReplacingDocument;

export const getIsDeletingNote = ({ state }) => state.isDeletingNote;
