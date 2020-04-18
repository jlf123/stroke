import React from 'react'
import {
    MenuSection,
    GroupHeading,
    HeaderSection,
    Item
} from '@atlaskit/navigation-next'
import { connect } from 'react-redux'
import { getSortedNotes, getRoute } from '../../state/selectors'
import { switchActiveNote } from '../../state/actions'
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note'
import snippet from '../../util/snippet'
import PluginsView from '../plugins/plugin'

const mapStateToProperties = (state) => ({
    notes: getSortedNotes(state),
    route: getRoute(state)
})

const renderNoteNav = (notes, select, onTagRoute) =>
    notes.map((item) => (
        <Item
            key={item.key}
            before={EditorNoteIcon}
            text={item.title}
            isSelected={!onTagRoute && item.active}
            subText={snippet(item.value)}
            onClick={() => {
                select(item.key)
            }}
        />
    ))

export const ProductNav = connect(mapStateToProperties, {
    switchActiveNote
})(({ notes, switchActiveNote, route }) => (
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
                    <PluginsView
                        note={
                            notes ? notes.filter((note) => note.active)[0] : {}
                        }
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
                            <p style={{ padding: '0 12px' }}>
                                You currently don&apos;t have any saved notes.
                                Start taking notes now!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </MenuSection>
    </div>
))
