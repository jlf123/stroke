import { debounce } from 'debounce'
import { saveNote } from './notes'

const autosave = (value, key) => {
    const debouncedAutosave = debounce(function() {
        saveNote(value, key)
    }, 3000)
    debouncedAutosave()
}

export default autosave
