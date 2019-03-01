import React from 'react';
import {
    MenuSection,
    GroupHeading,
    HeaderSection,
    Item
} from '@atlaskit/navigation-next';
import { connect } from 'react-redux';
import { getSortedNotes, getRoute } from '../../state/selectors';
import { switchActiveNote, changeRoute } from '../../state/actions';
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note';
import snippet from '../../util/snippet';
import LabelIcon from '@atlaskit/icon/glyph/label';

const mapStateToProps = state => ({
    notes: getSortedNotes(state),
    route: getRoute(state)
});

const renderNoteNav = (notes, select, onTagRoute) =>
    notes.map(item => (
        <Item
            before={EditorNoteIcon}
            text={item.title}
            isSelected={!onTagRoute && item.active}
            subText={snippet(item.value)}
            onClick={() => {
                select(item.key);
            }}
        />
    ));

export const ProductNav = connect(
    mapStateToProps,
    {
        switchActiveNote,
        changeRoute
    }
)(({ notes, switchActiveNote, changeRoute, route }) => (
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
                    <GroupHeading>Tags</GroupHeading>
                    <Item
                        before={LabelIcon}
                        text={'Browse Tags'}
                        isSelected={route === 'TAGS'}
                        onClick={() => changeRoute('TAGS')}
                    />
                    <GroupHeading>Notes</GroupHeading>
                    <div>
                        {notes &&
                            renderNoteNav(
                                notes,
                                switchActiveNote,
                                route === 'TAGS'
                            )}
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
