import findIndex from 'lodash/findIndex';

export const saveTag = tag => {
    const fetchedNotes = [];
    if (!fetchedNotes.length || findIndex(fetchedNotes, tag) !== -1) {
        fetchedNotes.push(tag);
        window.localStorage.setItem('tags', JSON.stringify(fetchedNotes));
    }
};

export const getTagsFromLocalStorage = () => {
    const response = window.localStorage.getItem('tags');
    return response ? JSON.parse(response) : [];
};
