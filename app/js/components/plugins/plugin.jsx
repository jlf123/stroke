import React, { useState, useRef } from 'react';
import StrokeIcon from '../icon/icon';
import { GroupHeading, Item } from '@atlaskit/navigation-next';
import './plugin.less';
import StrokePopup from '../popup/popup';

const PluginsView = () => {
    const [plugins, setPlugins] = useState([
        {
            id: '1234',
            title: 'Stroke Confluence App',
            description:
                'This app provides an integration point between Stroke and Confluence Cloud',
            icon: 'http://localhost:8080/icon',
            view: 'http://localhost:8080/view'
        }
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const itemWrapperEl = useRef();

    if (!plugins.length) {
        return;
    }

    return (
        <React.Fragment>
            <GroupHeading>Apps</GroupHeading>
            <React.Fragment>
                {plugins.map(({ id, title, description, icon, view }) => (
                    <div style={{ position: 'relative' }} ref={itemWrapperEl}>
                        <Item
                            before={() => <PluginIcon src={icon} />}
                            text={title}
                            onClick={() => setShowPopup(true)}
                            subText={description}
                        />
                        {showPopup && (
                            <StrokePopup
                                container={itemWrapperEl}
                                title={title}
                                view={view}
                                close={() => setShowPopup(false)}
                            />
                        )}
                    </div>
                ))}
            </React.Fragment>
        </React.Fragment>
    );
};

const PluginIcon = ({ src, onClick }) => (
    <div className="plugin-icon">
        <img
            src={src}
            height="24"
            onClick={() => {
                onClick ? onClick() : null;
            }}
        />
    </div>
);

export default PluginsView;
