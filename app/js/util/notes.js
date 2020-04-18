const saveNote = (value, key) => {
    notes[key.replace(' ', '+')] = value
    window.localStorage.setItem('notes', JSON.stringify(notes))
}

const saveNotes = (notes) => {
    if (notes) {
        window.localStorage.setItem('notes', JSON.stringify(notes))
    }
}

const queryNotes = () => {
    const response = window.localStorage.getItem('notes')
    return response ? JSON.parse(response) : null
}

const getNote = () => {

}

export {
    saveNote,
    queryNotes,
    getNote,
    saveNotes
}
