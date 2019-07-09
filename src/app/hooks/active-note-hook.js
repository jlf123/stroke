import { useState } from 'react';
import { getActions } from '../util/actions';

export const useActiveNote = () => {
    const [activeNote, setActiveNote] = useState({
        key: null,
        doc: { lastUpdatedAt: null, title: '', body: '' }
    });

    const changeActiveNote = note => {
        setActiveNote(note);
        const actions = getActions();
        actions.replaceDocument(note.doc.body);
    };

    return [activeNote, changeActiveNote];
};
