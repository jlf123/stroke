import React, { useState } from 'react';

export const useSavedApps = () => {
    const apps = window.localStorage.getItem('apps');
    const [savedApps, setSavedApps] = useState(apps ? apps.split(',') : []);

    const changeSavedApps = appIds => {
        setSavedApps(appIds);
        window.localStorage.setItem('apps', appIds.join(','));
    };
    return [savedApps, changeSavedApps];
};
