import React, { useState, useRef, useEffect } from 'react';
import StrokeIcon from '../icon/icon';
import { GroupHeading, Item } from '@atlaskit/navigation-next';
import './plugin.less';
import StrokePopup from '../popup/popup';
import { useSavedApps } from '../../hooks/use-saved-apps';
import firebase from '../../util/firebase';

const PluginsView = () => {
    const [apps, setApps] = useSavedApps();
    const [plugins, setPlugins] = useState([]);
    const [activePlugin, setActivePlugin] = useState();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const loadApps = async () => {
            const db = firebase.firestore();
            const plugins = await Promise.all(
                apps.map(async appId => {
                    const plugin = await db
                        .collection('apps')
                        .doc(appId)
                        .get();
                    if (plugin.exists) {
                        return plugin.data();
                    }
                })
            );
            console.log('got the plugins: ', plugins);
            setPlugins(plugins);
        };
        loadApps();
    }, [apps]);

    if (!plugins.length) {
        return null;
    }

    return (
        <React.Fragment>
            <GroupHeading>Apps</GroupHeading>
            <React.Fragment>
                {plugins.map(plugin => {
                    const ref = React.createRef();
                    return (
                        <div style={{ position: 'relative' }} ref={ref}>
                            <Item
                                before={() => <PluginIcon src={plugin.icon} />}
                                text={plugin.title}
                                onClick={() => {
                                    setActivePlugin({ ...plugin, ref });
                                    setShowPopup(true);
                                }}
                                subText={plugin.description}
                            />
                        </div>
                    );
                })}
                {showPopup && activePlugin && (
                    <StrokePopup
                        container={activePlugin.ref}
                        title={activePlugin.title}
                        view={activePlugin.view}
                        close={() => {
                            setActivePlugin(null);
                            setShowPopup(false);
                        }}
                    />
                )}
            </React.Fragment>
        </React.Fragment>
    );
};

const PluginIcon = ({ src, onClick }) => (
    <div className="plugin-icon">
        <img
            src={src}
            height="24"
            width="24"
            onClick={() => {
                onClick ? onClick() : null;
            }}
        />
    </div>
);

export default PluginsView;
