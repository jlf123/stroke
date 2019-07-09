import React from 'react';
import { GlobalNav } from '@atlaskit/navigation-next';
import AddIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import TrashIcon from '@atlaskit/icon/glyph/trash';

export const globalNav = () => (
    <GlobalNav
        secondaryItems={[]}
        primaryItems={[
            {
                id: 'stroke',
                /* eslint-disable-next-line react/display-name */
                icon: () => (
                    <img
                        src="https://images.ctfassets.net/zsv3d0ugroxu/3WyidDXMDSYYigmuisSUYU/5aa013cdefeb32a6042d8a5c1851671e/AtlassianLogo_05b.svg"
                        className="primary-icon"
                    />
                )
            },
            {
                icon: SearchIcon,
                id: 'search',
                tooltip: 'Search'
            },
            {
                id: 'add',
                icon: AddIcon,
                tooltip: 'Add a new note'
            },
            {
                id: 'trash',
                icon: TrashIcon,
                tooltip: 'Delete this note'
            }
        ]}
    />
);
