import React from 'react'
import { GlobalNav } from '@atlaskit/navigation-next'
import { connect } from 'react-redux'
import { createNewUserNote, trashUserNoteRequested } from '../../state/actions'
import AddIcon from '@atlaskit/icon/glyph/add'
import SearchIcon from '@atlaskit/icon/glyph/search'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import { getActiveUserNote } from '../../state/selectors'
import StrokeIcon from '../icon/icon'

const mapStateToProps = (state) => ({
    active: getActiveUserNote(state)
})

export const globalNav = connect(mapStateToProps, {
    createNewUserNote,
    trashUserNoteRequested
})(({ createNewUserNote, active, trashUserNoteRequested }) => (
    <GlobalNav
        secondaryItems={[]}
        primaryItems={[
            {
                id: 'stroke',
                icon: () => (
                    <div className="stroke-icon-container">
                        <div className="stroke-icon" />
                    </div>
                )
            },
            {
                icon: SearchIcon,
                id: 'search',
                tooltip: 'Search',
                onClick: () => console.log('Search item clicked', active)
            },
            {
                id: 'add',
                icon: AddIcon,
                tooltip: 'Add a new note',
                onClick: () => {
                    document.getElementById('note-title')
                    createNewUserNote()
                }
            },
            {
                id: 'trash',
                icon: TrashIcon,
                tooltip: 'Delete this note',
                onClick: () => {
                    const key = Object.keys(active)[0]
                    const { title } = active[key]
                    console.log(key)
                    trashUserNoteRequested({
                        key,
                        title
                    })
                }
            }
        ]}
    />
))
