const saveNote = (value, key) => {
    notes[key.replace(' ', '+')] = value;
    console.log('saving value: ', JSON.stringify(value))
    window.localStorage.setItem('notes', JSON.stringify(notes))
}

const saveNotes = (notes) => {
    if(notes) {
        window.localStorage.setItem('notes', JSON.stringify(notes))
    }
}

const queryNotes = () => {
    let response = window.localStorage.getItem('notes');
    console.log('inside the query notes: ', response ? JSON.parse(response) : {} )
    return response ? JSON.parse(response) : null;
}

const getNote = () => {

}

export {
    saveNote,
    queryNotes,
    getNote,
    saveNotes
}