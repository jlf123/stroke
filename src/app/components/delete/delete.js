import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import { bool, func } from 'prop-types';

export const DeleteModal = ({
    active,
    trashUserNote,
    trashUserNoteCanceled,
    isVisible
}) => {
    const key = Object.keys(active)[0];
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
                        Are you sure you want to delete{' '}
                        <b>{active[key].title}</b>?
                    </p>
                </Modal>
            )}
        </React.Fragment>
    );
};

DeleteModal.propTypes = {
    active: bool,
    trashUserNote: func,
    trashUserNoteCanceled: func,
    isVisible: bool
};
