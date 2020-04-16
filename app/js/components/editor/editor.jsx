import React, { Component } from 'react'
import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core'
import styled from 'styled-components'
import {
    queueUserNoteUpdate,
    createNewUserNote,
    addEditorActionsStroke,
    switchActiveNoteSucceeded,
    saveUserNotesRequested
} from '../../state/actions'
import { connect } from 'react-redux'
import {
    getActiveUserNote,
    getIsReplacingDocument,
    getIsFetchingNotes
} from '../../state/selectors'
import FeelContext from 'react-feel'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import moment from 'moment'
import EditorRecentIcon from '@atlaskit/icon/glyph/editor/recent'
import { StrokeLoading } from '../loading'
import './editor.less'

export const TitleInput = styled.input`
    border: none;
    outline: none;
    font-size: 2.07142857em;
    margin: 0 0 21px;
    padding: 0;
    width: 100%;

    &::placeholder {
        color: '#8B93A2';
    }
`
TitleInput.displayName = 'TitleInput'

class StrokeEditorInner extends Component {
    constructor() {
        super()
        const autosave = debounce(this.onSaveHandler.bind(this), 500)
        // autosave.bind(this)
        this.state = {
            disabled: false,
            autosave
        }
        this.handleTitleOnBlur = this.handleTitleOnBlur.bind(this)
        this.handleTitleOnFocus = this.handleTitleOnFocus.bind(this)
        this.handleTitleRef = this.handleTitleRef.bind(this)
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this)
        this.onChange = throttle(this.onChange.bind(this), 500)
    }

    handleTitleOnFocus() {
        this.setState({ disabled: true })
    }

    handleTitleOnBlur() {
        this.setState({ disabled: false })
    }

    handleTitleRef(ref) {
        if (ref) {
            ref.focus()
        }
    }

    onChange(actions, key, title) {
        this.noteChangeHandler(key, title, actions)
    }

    handleTitleOnChange(event, actions, key) {
        const title = event.target.value
        this.noteChangeHandler(key, title, actions)
    }

    onSaveHandler() {
        this.props.saveUserNotesRequested()
    }

    noteChangeHandler(key, title, action) {
        if (this.props.isReplacingDocument) {
            return this.props.switchActiveNoteSucceeded()
        }

        action.getValue().then((value) => {
            if (!key) {
                this.props.createNewUserNote(value, title)
            } else {
                this.props.queueUserNoteUpdate(key, value, title)
            }
            this.state.autosave()
        })
    }

    componentDidMount() {
        // add editor actions to the store and other components can update the editor
        this.props.addEditorActionsStroke(this.props.fabricActions)
    }

    render() {
        const { disabled } = this.state
        const { fabricActions, activeNote, isLoading } = this.props
        const key = Object.keys(activeNote)[0]
        const { title, value, lastUpdatedAt } = key ? activeNote[key] : {}

        if (isLoading) {
            return <StrokeLoading />
        }

        return (
            <div className="editor-wrapper">
                <Editor
                    appearance="full-page"
                    allowCodeBlocks={{ enableKeybindingsForIDE: true }}
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
                        stickToolbarToBottom: true,
                        allowControls: true
                    }}
                    allowPanel={true}
                    allowRule={true}
                    allowDate={true}
                    defaultValue={value}
                    disabled={disabled}
                    quickInsert={true}
                    allowExtension={true}
                    placeholder="Let's take some notes..."
                    contentComponents={[
                        <TitleInput
                            placeholder="Give this note a title..."
                            value={title}
                            // tslint:disable-next-line:jsx-no-lambda
                            innerRef={this.handleTitleRef}
                            onFocus={this.handleTitleOnFocus}
                            onChange={(e) =>
                                this.handleTitleOnChange(e, fabricActions, key)
                            }
                            onBlur={this.handleTitleOnBlur}
                            id="note-title"
                            key="note-title"
                        />,
                        <div
                            className="stroke-date-container"
                            key="stroke-dates"
                        >
                            <EditorRecentIcon />
                            <div className="stroke-date">
                                Created on:{' '}
                                <span>
                                    {key
                                        ? moment
                                              .unix(key)
                                              .format('MMMM Do YYYY')
                                        : moment().format('MMMM Do YYYY')}
                                </span>
                            </div>
                            {lastUpdatedAt && (
                                <React.Fragment>
                                    <div style={{ margin: '0 10px' }}>
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
                    ]}
                    onChange={() => this.onChange(fabricActions, key, title)}
                />
            </div>
        )
    }
}

class StrokeEditor extends Component {
    render() {
        const {
            queueUserNoteUpdate,
            activeNote,
            createNewUserNote,
            addEditorActionsStroke,
            isReplacingDocument,
            saveUserNotesRequested,
            switchActiveNoteSucceeded,
            isLoading
        } = this.props

        return (
            <div className="stroke-editor">
                <EditorContext>
                    <WithEditorActions
                        render={(actions) => (
                            <StrokeEditorInner
                                fabricActions={actions}
                                activeNote={activeNote}
                                isReplacingDocument={isReplacingDocument}
                                addEditorActionsStroke={addEditorActionsStroke}
                                createNewUserNote={createNewUserNote}
                                switchActiveNoteSucceeded={
                                    switchActiveNoteSucceeded
                                }
                                queueUserNoteUpdate={queueUserNoteUpdate}
                                saveUserNotesRequested={saveUserNotesRequested}
                                isLoading={isLoading}
                            />
                        )}
                    />
                </EditorContext>
            </div>
        )
    }
}

const mapDispatchToProps = {
    queueUserNoteUpdate,
    createNewUserNote,
    addEditorActionsStroke,
    switchActiveNoteSucceeded,
    saveUserNotesRequested
}

const mapStateToProps = (state) => ({
    activeNote: getActiveUserNote(state),
    isReplacingDocument: getIsReplacingDocument(state),
    isLoading: getIsFetchingNotes(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(StrokeEditor)
