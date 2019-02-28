import React, { Component } from 'react';
import {
    Editor,
    EditorContext,
    WithEditorActions
} from '@atlaskit/editor-core';
import autosave from '../../util/autosave';
import styled from 'styled-components';
import {
    queueUserNoteUpdate,
    createNewUserNote,
    addEditorActionsStroke,
    switchActiveNoteSucceeded,
    saveUserNotesRequested
} from '../../state/actions';
import { connect } from 'react-redux';
import {
    getActiveUserNote,
    getIsReplacingDocument
} from '../../state/selectors';
import FeelContext from 'react-feel';
import _ from 'lodash';
import TrashCan from '@atlaskit/icon/glyph/trash';
import './editor.less';

export const TitleInput = styled.input`
    border: none;
    outline: none;
    font-size: 2.07142857em;
    margin: 0 0 21px;
    padding: 0;

    &::placeholder {
        color: '#8B93A2';
    }
`;
TitleInput.displayName = 'TitleInput';

class StrokeEditorInner extends Component {
    constructor() {
        super();
        const autosave = _.debounce(this.onSaveHandler.bind(this), 1000);
        //autosave.bind(this)
        this.state = {
            disabled: false,
            autosave
        };
        this.handleTitleOnBlur = this.handleTitleOnBlur.bind(this);
        this.handleTitleOnFocus = this.handleTitleOnFocus.bind(this);
        this.handleTitleRef = this.handleTitleRef.bind(this);
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onSaveHandler = this.onSaveHandler.bind(this)
        //this.noteChangeHandler = this.noteChangeHandler.bind(this);
    }

    handleTitleOnFocus() {
        this.setState({ disabled: true });
    }
    handleTitleOnBlur() {
        this.setState({ disabled: false });
    }
    handleTitleRef(ref) {
        console.log('title ref')
        if (ref) {
            ref.focus();
        }
    }

    onChange(actions, key, title) {
        this.noteChangeHandler(key, title, actions);
    }

    handleTitleOnChange(event, actions, key) {
        let title = event.target.value;
        this.noteChangeHandler(key, title, actions);
    }

    onSaveHandler() {
        this.props.saveUserNotesRequested();
    }

    noteChangeHandler(key, title, action) {
        if (this.props.isReplacingDocument) {
            return this.props.switchActiveNoteSucceeded();
        }

        action.getValue().then(value => {
            if (!key) {
                this.props.createNewUserNote(value, title);
            } else {
                this.props.queueUserNoteUpdate(key, value, title);
            }
            this.state.autosave();
        });
    }

    componentDidMount() {
        // add editor actions to the store and other components can update the editor
        this.props.addEditorActionsStroke(this.props.fabricActions);
    }

    render() {
        const { disabled } = this.state;
        const { fabricActions, activeNote } = this.props;
        const key = Object.keys(activeNote)[0];
        const { title, value } = key ? activeNote[key] : {};
        console.log('got the value: ', value);

        return (
            <div>
                <Editor
                    appearance="full-page"
                    allowTasksAndDecisions={true}
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
                        stickToolbarToBottom: true
                    }}
                    allowPanel={true}
                    allowRule={true}
                    allowDate={true}
                    defaultValue={value}
                    disabled={disabled}
                    extensionHandlers={
                        this.props.fabricExtensionService
                            ? this.props.fabricExtensionService.getTransformers()
                            : {}
                    }
                    allowExtension={true}
                    insertMenuItems={
                        this.props.fabricExtensionService
                            ? this.props.fabricExtensionService.getInsertMenuItems()
                            : []
                    }
                    placeholder="Let's take some notes..."
                    contentComponents={
                        <TitleInput
                            placeholder="Give this note a title..."
                            value={title}
                            // tslint:disable-next-line:jsx-no-lambda
                            innerRef={this.handleTitleRef}
                            onFocus={this.handleTitleOnFocus}
                            onChange={e =>
                                this.handleTitleOnChange(e, fabricActions, key)
                            }
                            onBlur={this.handleTitleOnBlur}
                            id="note-title"
                        />
                    }
                    onChange={() => this.onChange(fabricActions, key, title)}
                />
            </div>
        );
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
            switchActiveNoteSucceeded
        } = this.props;

        return (
            <div>
                <EditorContext>
                    <WithEditorActions
                        render={actions => (
                            <FeelContext
                                actions={actions}
                                render={feel => (
                                    <StrokeEditorInner
                                        fabricExtensionService={feel}
                                        fabricActions={actions}
                                        activeNote={activeNote}
                                        isReplacingDocument={
                                            isReplacingDocument
                                        }
                                        addEditorActionsStroke={
                                            addEditorActionsStroke
                                        }
                                        createNewUserNote={
                                            createNewUserNote
                                        }
                                        switchActiveNoteSucceeded={
                                            switchActiveNoteSucceeded
                                        }
                                        queueUserNoteUpdate={
                                            queueUserNoteUpdate
                                        }
                                        saveUserNotesRequested={
                                            saveUserNotesRequested
                                        }
                                    />
                                )}
                            />
                        )}
                    />
                </EditorContext>
            </div>
        );
    }
}

const mapDispatchToProps = {
    queueUserNoteUpdate,
    createNewUserNote,
    addEditorActionsStroke,
    switchActiveNoteSucceeded,
    saveUserNotesRequested
};

const mapStateToProps = state => ({
    activeNote: getActiveUserNote(state),
    isReplacingDocument: getIsReplacingDocument(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StrokeEditor);
