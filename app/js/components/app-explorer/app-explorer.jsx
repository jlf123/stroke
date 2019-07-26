import React, { useState, useEffect } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import firebase from '../../util/firebase';
import './app-explorer.less';
import { useSavedApps } from '../../hooks/use-saved-apps';

const isInstalled = (installedApps, appId) =>
    installedApps.find(o => o === appId);

const AppExplorer = () => {
    const [showModal, setShowModal] = useState(false);
    const [apps, setApps] = useState([]);
    const [installedApps, setInstalledApps] = useSavedApps();
    console.log('got the saved apps ', installedApps);
    useEffect(() => {
        const db = firebase.firestore();
        const loadApps = async () => {
            const apps = await db.collection('apps').get();
            const transformedApps = apps.docs.map(app => ({
                ...app.data(),
                id: app.id
            }));
            setApps(transformedApps);
        };
        loadApps();
    }, []);
    return (
        <React.Fragment>
            <Button appearance="primary" onClick={() => setShowModal(true)} className="margin-right">
                Add an App
            </Button>
            <ModalTransition>
                {showModal && (
                    <Modal
                        heading="Browse Apps"
                        actions={[
                            {
                                text: 'Close',
                                onClick: () => {
                                    setShowModal(false)
                                    location.reload();
                                }
                            }
                        ]}
                    >
                        <div>Available Apps</div>
                        {apps.map(({ id, title, description, icon }) => (
                            <React.Fragment key={id}>
                                <hr/>
                                <div className="app-item">
                                    <div className="app-item__primary">
                                        <div className="app-item__icon">
                                            <img
                                                src={icon}
                                                alt=""
                                                height="35"
                                                width="35"
                                            />
                                        </div>
                                        <div className="app-item__metadata">
                                            <div className="app-item__metadata--title">
                                                {title}
                                            </div>
                                            <div className="app-item__metadata--description">
                                                {description}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="app-item__btn"
                                        onClick={() =>
                                            !isInstalled(installedApps, id) &&
                                            setInstalledApps([...installedApps, id])
                                        }
                                    >
                                        <Button
                                            isDisabled={isInstalled(
                                                installedApps,
                                                id
                                            )}
                                        >
                                            {isInstalled(installedApps, id)
                                                ? 'Installed'
                                                : 'Install'}
                                        </Button>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </Modal>
                )}
            </ModalTransition>
        </React.Fragment>
    );
};

export default AppExplorer;
