import React, { useContext, useRef } from 'react';
import {
    Editor,
    EditorContext,
    WithEditorActions
} from '@atlaskit/editor-core';
import FeelContext from 'react-feel';
import debounce from 'lodash/debounce';
import moment from 'moment';
import './editor.less';
import { getStrokeContext } from '../../util/get-stroke-context';
import { setActions } from '../../util/actions';

const StrokeEditor = () => {
    let editorActions;
    const { notes, updateNote, activeNote } = useContext(getStrokeContext());
    const inputRef = useRef();

    const updateNoteHandler = debounce(async () => {
        if (editorActions) {
            const adf = await editorActions.getValue();

            // if there isn't a current note defined then this is a new note
            if (!activeNote.key) {
                const createdAt = moment().unix();
                updateNote({
                    title: inputRef.current.value
                        ? inputRef.current.value
                        : 'Untitled',
                    body: adf,
                    createdAt,
                    lastUpdatedAt: createdAt
                });
                return;
            }

            let note = notes.find(note => note.id === activeNote.key);
            note = {
                ...note,
                title: inputRef.current.value
                    ? inputRef.current.value
                    : 'Untitled',
                body: adf,
                lastUpdatedAt: moment().unix()
            };

            updateNote(note);
        }
    }, 500);

    return (
        <EditorContext>
            <WithEditorActions
                render={actions => {
                    if (!editorActions) {
                        editorActions = actions;
                        setActions(actions);
                    }
                    return (
                        <FeelContext
                            actions={actions}
                            render={feel => (
                                <Editor
                                    appearance="full-page"
                                    allowTasksAndDecisions={true}
                                    allowCodeBlocks={{
                                        enableKeybindingsForIDE: true
                                    }}
                                    allowLists={true}
                                    allowTextColor={true}
                                    allowTables={{
                                        allowColumnResizing: true,
                                        allowMergeCells: true,
                                        allowNumberColumn: true,
                                        allowBackgroundColor: true,
                                        allowHeaderRow: true,
                                        allowHeaderColumn: true,
                                        permittedLayouts: 'all',
                                        stickToolbarToBottom: true
                                    }}
                                    allowPanel={true}
                                    allowRule={true}
                                    allowDate={true}
                                    extensionHandlers={feel.getTransformers()}
                                    allowExtension={true}
                                    insertMenuItems={feel.getInsertMenuItems()}
                                    placeholder="Let's take some notes..."
                                    onChange={updateNoteHandler}
                                    defaultValue={activeNote.doc.body}
                                    contentComponents={[
                                        <input
                                            key="stroke-title"
                                            className="stroke-title"
                                            placeholder="Give this note a title..."
                                            id="note-title"
                                            ref={inputRef}
                                            value={activeNote.doc.title}
                                            onChange={updateNoteHandler}
                                        />
                                        /*
                                <div className="stroke-date-container">
                                    <EditorRecentIcon />
                                    <div className="stroke-date">
                                        Created on:{' '}
                                        <span>
                                            {key
                                                ? moment
                                                      .unix(key)
                                                      .format('MMMM Do YYYY')
                                                : moment().format(
                                                      'MMMM Do YYYY'
                                                  )}
                                        </span>
                                    </div>
                                    {lastUpdatedAt && (
                                        <React.Fragment>
                                            <div
                                                style={{
                                                    margin: '0 10px'
                                                }}
                                            >
                                                &#8226;
                                            </div>
                                            <div className="stroke-date">
                                                Last updated at:{' '}
                                                <span>
                                                    {moment
                                                        .unix(lastUpdatedAt)
                                                        .format('MMMM Do YYYY')}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </div>
                                */
                                    ]}
                                />
                            )}
                        />
                    );
                }}
            />
        </EditorContext>
    );
};

export default StrokeEditor;
