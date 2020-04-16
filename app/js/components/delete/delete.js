import React from 'react'
import Modal from '@atlaskit/modal-dialog'
import { connect } from 'react-redux'
import { trashUserNote, trashUserNoteCanceled } from '../../state/actions'
import { getIsDeletingNote, getActiveUserNote } from '../../state/selectors'

const mapStateToProps = state => ({
    isVisible: getIsDeletingNote(state),
    active: getActiveUserNote(state)
})

export const DeleteModal = connect(
    mapStateToProps,
    {
        trashUserNote,
        trashUserNoteCanceled
    }
)(({ title, active, trashUserNote, trashUserNoteCanceled, isVisible }) => {
    const key = Object.keys(active)[0]
    return (
        <React.Fragment>
            {isVisible && (
                <Modal
                    heading="You are about to delete a note..."
                    actions={[
                        {
                            text: 'Delete',
                            onClick: () => trashUserNote(key)
                        },
                        { text: 'Cancel', onClick: trashUserNoteCanceled }
                    ]}
                >
                    <p>
                        Are you sure you want to delete {' '}
                        <b>{active[key].title}</b>?
                    </p>
                </Modal>
            )}
        </React.Fragment>
    )
})
