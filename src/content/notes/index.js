import PouchDB from 'pouchdb-browser';

const db = new PouchDB('notes');

export const getAllNotes = async () => {
    /* eslint-disable camelcase */
    const { rows } = await db.allDocs({ include_docs: true });
    return rows;
};

export const updateNote = async note => {
    const response = await db.put(note);
    return response;
};

export const addNewNote = async note => {
    const response = await db.post(note);
    return response;
};
