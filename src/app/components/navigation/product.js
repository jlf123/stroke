import React, { useContext } from 'react';
import {
    MenuSection,
    GroupHeading,
    HeaderSection,
    Item
} from '@atlaskit/navigation-next';
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note';
import snippet from '../../util/snippet';
import LabelIcon from '@atlaskit/icon/glyph/label';
import './navigation.less';
import { getStrokeContext } from '../../util/get-stroke-context';
import isEmpty from 'lodash/isEmpty';

const renderNoteNav = ({ notes, activeNoteId, select }) =>
    notes.map(item => (
        <Item
            key={item.id}
            before={EditorNoteIcon}
            text={item.title}
            isSelected={item.id === activeNoteId}
            subText={snippet(item.body)}
            onClick={() => {
                select(item);
            }}
        />
    ));

export const ProductNav = () => {
    const {
        notes,
        activeNote: { id: activeNoteId },
        setActiveNote
    } = useContext(getStrokeContext());
    return (
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
                            //isSelected={route === 'TAGS'}
                            //onClick={() => changeRoute('TAGS')}
                        />
                        <GroupHeading>Notes</GroupHeading>
                        <div>
                            {isEmpty(notes) ? (
                                <p>
                                    You currently don&#39;t have any saved
                                    notes. Start taking notes now!
                                </p>
                            ) : (
                                renderNoteNav({
                                    notes,
                                    activeNoteId,
                                    setActiveNote
                                })
                            )}
                        </div>
                    </div>
                )}
            </MenuSection>
        </div>
    );
};
