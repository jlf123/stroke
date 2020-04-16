import React, { Component } from 'react';
import Navigation, { AkContainerNavigation } from '@atlaskit/navigation';
import AddIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Tooltip from '@atlaskit/tooltip';
import Page from '@atlaskit/page';
import { queryNotes } from '../../util/notes';
import snippet from '../../util/snippet';
import { blankAdf } from '../../util/blank-adf';
import {
    fetchUserNotesRequested,
    createNewUserNote,
    switchActiveNote,
    trashUserNote,
} from '../../state/actions';
import {
    getUserNotes,
    getEditorActions,
    getSortedNotes,
} from '../../state/selectors';
import { connect } from 'react-redux';
import './navigation.less';
import _ from 'lodash';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';

const GlobalCreateIcon = (props) => (
    <Tooltip position="right" content="Create">
        <AddIcon
            label="Create icon"
            secondaryColor="inherit"
            size="medium"
            onClick={() => props.onCreate()}
        />
    </Tooltip>
);

class StrokeNavigation extends Component {
    componentWillMount() {
        this.props.fetchUserNotesRequested();
    }

    componentDidMount() {
        const { notes } = this.props;
    }

    renderNoteNav(notes, onSwitch) {
        return notes.map((item) => (
            <div
                className={`note ${
                    item.active ? 'note-active' : 'note-inactive'
                }`}
                onClick={() => {
                    if (!item.active) onSwitch(item.key);
                }}
            >
                <div style={{ padding: '5px' }}>
                    <h3>{item.title}</h3>
                    <p>{snippet(item.value)}</p>
                    <hr />
                    <div
                        className="trash-note"
                        onClick={() => this.props.trashUserNote(item.key)}
                    >
                        <TrashIcon />
                    </div>
                </div>
            </div>
        ));
    }

    onCreate() {
        const { createNewUserNote } = this.props;
        createNewUserNote();
    }

    render() {
        const {
            isOpen,
            width,
            onNavResize,
            notes,
            createNewUserNote,
            switchActiveNote,
        } = this.props;
        console.log('got the notes: ', notes);

        return <div></div>;
    }
}

const mapDispatchToProps = {
    fetchUserNotesRequested,
    createNewUserNote,
    switchActiveNote,
    trashUserNote,
};

const mapStateToProps = (state) => ({
    //notes: getUserNotes(state),
    notes: getSortedNotes(state),
    editorActions: getEditorActions(state),
});

const styles = {
    noteNav: {
        position: 'absolute',
        top: '-5px',
        paddingRight: '25px',
        width: 'calc(100% - 25px)',
        top: '15px',
        left: '10px',
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(StrokeNavigation);
