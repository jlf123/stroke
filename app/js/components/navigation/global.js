import React from 'react'
import { GlobalNav } from '@atlaskit/navigation-next'
import { connect } from 'react-redux'
import {
    createNewUserNote,
    trashUserNoteRequested,
    openSearchDrawer
} from '../../state/actions'
import AddIcon from '@atlaskit/icon/glyph/add'
import SearchIcon from '@atlaskit/icon/glyph/search'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import { getActiveUserNote } from '../../state/selectors'

const mapStateToProperties = (state) => ({
    active: getActiveUserNote(state)
})

export const globalNav = connect(mapStateToProperties, {
    createNewUserNote,
    trashUserNoteRequested,
    openSearchDrawer
})(
    ({
        createNewUserNote,
        active,
        trashUserNoteRequested,
        openSearchDrawer
    }) => (
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
                    id: 'add',
                    icon: AddIcon,
                    tooltip: 'Add a new note',
                    onClick: () => {
                        document.querySelector('#note-title')
                        createNewUserNote()
                    }
                },
                {
                    icon: SearchIcon,
                    id: 'search',
                    tooltip: 'Search',
                    onClick: () => openSearchDrawer()
                },
                {
                    id: 'trash',
                    icon: TrashIcon,
                    tooltip: 'Delete this note',
                    onClick: () => {
                        const key = Object.keys(active)[0]
                        const { title } = active[key]
                        trashUserNoteRequested({
                            key,
                            title
                        })
                    }
                }
            ]}
        />
    )
)
