import React from 'react';
import {
    MenuSection,
    GroupHeading,
    HeaderSection,
    Item
} from '@atlaskit/navigation-next';
import { connect } from 'react-redux';
import { getSortedNotes } from '../../state/selectors';
import { switchActiveNote } from '../../state/actions';
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note';
import snippet from '../../util/snippet';

const mapStateToProps = state => ({
    notes: getSortedNotes(state)
});

const renderNoteNav = (notes, select) =>
    notes.map(item => (
        <Item
            before={EditorNoteIcon}
            text={item.title}
            isSelected={item.active}
            subText={snippet(item.value)}
            onClick={() => select(item.key)}
        />
    ));

export const ProductNav = connect(
    mapStateToProps,
    {
        switchActiveNote
    }
)(({ notes, switchActiveNote }) => (
    <div>
        <HeaderSection>
            {() => (
                <div>
                    <h2 className="app-title">Stroke</h2>
                </div>
            )}
        </HeaderSection>
        <MenuSection>
            {() => (
                <div className="navigation-notes">
                    <GroupHeading>Notes</GroupHeading>
                    <div>
                        {notes && renderNoteNav(notes, switchActiveNote)}
                        {!notes && (
                            <p>
                                You currently don't have any saved notes. Start
                                taking notes now!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </MenuSection>
    </div>
));
