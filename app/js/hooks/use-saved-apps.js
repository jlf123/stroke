import React, { useState } from 'react';

export const useSavedApps = () => {
    const apps = window.localStorage.getItem('apps');
    const [savedApps, setSavedApps] = useState(apps ? apps.split(',') : []);

    const changeSavedApps = appId => {
        const newApps = [...savedApps, appId]
        setSavedApps(newApps);
        window.localStorage.setItem('apps', newApps.join(','));
    };
    return [savedApps, changeSavedApps];
};
