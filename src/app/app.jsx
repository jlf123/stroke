import React, { useState, useEffect } from 'react';
import './less/_base.less';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';
import { globalNav } from './components/navigation/global';
import { ProductNav } from './components/navigation/product';
//import { DeleteModal } from './components/delete';
import StrokeEditor from './components/editor';
//import TagsContainer from './components/tags/tags';
import { getStrokeContext } from './util/get-stroke-context';
import { getAllNotes, updateNote as putNote, addNewNote } from '../content';
import { useActiveNote } from './hooks/active-note-hook';

const App = () => {
    const StrokeContext = getStrokeContext();
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useActiveNote();
    /* eslint-disable no-unused-vars */
    const [errorUpdatingNotes, setErrorUpdatingNotes] = useState(false);

    useEffect(() => {
        const loadNotes = async () => {
            const notes = await getAllNotes();
            const transformedNotes = notes
                .map(({ doc, id }) => ({
                    id,
                    ...doc
                }))
                .sort((a, b) => a.lastUpdatedAt < b.lastUpdatedAt);

            setNotes(transformedNotes);

            // set the active note to the most recent note on start up
            if (transformedNotes.length) {
                setActiveNote(notes[0]);
            }
        };
        loadNotes();
    });

    const updateNote = note => {
        let existingNote = false;
        notes.map((item, index) => {
            if (item.createdAt === note.createdAt) {
                notes[index] = {
                    ...notes[index],
                    ...note
                };
                existingNote = true;
            }
        });
        setNotes(existingNote ? notes : [...notes, note]);
        try {
            if (!existingNote) {
                addNewNote(note);
                return;
            }

            putNote(note);
        } catch (err) {
            setErrorUpdatingNotes(true);
        }
    };

    return (
        <StrokeContext.Provider
            value={{
                notes,
                updateNote,
                activeNote,
                setActiveNote
            }}
        >
            <React.Fragment>
                <NavigationProvider>
                    <LayoutManager
                        globalNavigation={globalNav}
                        productNavigation={ProductNav}
                    >
                        <div
                            style={{
                                minHeight: '100vh',
                                backgroundColor: '#ffff'
                            }}
                        >
                            <StrokeEditor />
                        </div>
                    </LayoutManager>
                </NavigationProvider>
            </React.Fragment>
        </StrokeContext.Provider>
    );
};

export default App;
