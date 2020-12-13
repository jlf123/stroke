import React, { useEffect, useState } from 'react'
import Page from '@atlaskit/page'
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next'
import { globalNav } from './components/navigation/global'
import { connect } from 'react-redux'
import { fetchUserNotesRequested, closeAppPopup } from './state/actions'
import { ProductNav } from './components/navigation/product'
import { DeleteModal } from './components/delete'
import {
    getRoute,
    getIsSearchDrawerOpen,
    getAppPopup,
    getActiveUserNote
} from './state/selectors'
import TagsContainer from './components/tags/tags'
import StrokeEditor from './components/editor'
import SearchDrawer from './components/search-drawer'
import StrokePopup from './components/popup/popup'
import { string, boolean, func } from 'prop-types'
import '../less/_base.less'

const mapStateToProperties = (state) => ({
    route: getRoute(state),
    isSearchDrawerOpen: getIsSearchDrawerOpen(state),
    appPopup: getAppPopup(state),
    activeNote: getActiveUserNote(state)
})

const App = ({ 
        route,
        isSearchDrawerOpen,
        appPopup,
        activeNote = {},
        closeAppPopup,
        fetchUserNotesRequested
    }) => {

        useEffect(() => {
            fetchUserNotesRequested()
        }, [])

        useEffect(() => {
            if (appPopup) {
                window.addEventListener('keydown', closePopup)
                return;
            }

            window.removeEventListener('keydown', closePopup);
        }, [appPopup])

        const closePopup = (event) => {
            if (event.keyCode === 27 && appPopup) {
                closeAppPopup();
            }
        }

        return (
            <React.Fragment>
                <NavigationProvider>
                    <LayoutManager
                        globalNavigation={globalNav}
                        productNavigation={ProductNav}
                    >
                        <div
                            style={{
                                minHeight: '100vh',
                                backgroundColor: '#ffff'
                            }}
                        >
                            {route === 'EDITOR' && <StrokeEditor />}
                            {route === 'TAGS' && <TagsContainer />}
                            {appPopup && (
                                <StrokePopup
                                    container={appPopup.appRef}
                                    title={appPopup.appName}
                                    close={() => closeAppPopup()}
                                    note={
                                        activeNote[Object.keys(activeNote)[0]]
                                    }
                                    appUrl={appPopup.appUrl}
                                    icon={appPopup.appIcon}
                                />
                            )}
                        </div>
                    </LayoutManager>
                </NavigationProvider>
                <DeleteModal />
                {isSearchDrawerOpen && <SearchDrawer />}
            </React.Fragment>
        )
    }

App.propTypes = {
    route: string,
    isSearchDrawerOpen: boolean,
    fetchUserNotesRequested: func
}

export default connect(mapStateToProperties, {
    fetchUserNotesRequested,
    closeAppPopup
})(App)
