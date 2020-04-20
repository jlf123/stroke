import React, { Component } from 'react'
import StrokeNavigation from './components/navigation'
import Page from '@atlaskit/page'
import '../less/_base.less'
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next'
import { globalNav } from './components/navigation/global'
import { connect } from 'react-redux'
import { fetchUserNotesRequested } from './state/actions'
import { ProductNav } from './components/navigation/product'
import { DeleteModal } from './components/delete'
import { getRoute, getIsSearchDrawerOpen } from './state/selectors'
import StrokeEditor from './components/editor'
import TagsContainer from './components/tags/tags'
import SearchDrawer from './components/search-drawer'
import { string, boolean, func } from 'prop-types'

const mapStateToProperties = (state) => ({
    route: getRoute(state),
    isSearchDrawerOpen: getIsSearchDrawerOpen(state)
})

class App extends Component {
    componentDidMount() {
        this.props.fetchUserNotesRequested()
    }

    render() {
        const { route, isSearchDrawerOpen } = this.props
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
                        </div>
                    </LayoutManager>
                </NavigationProvider>
                <DeleteModal />
                {isSearchDrawerOpen && <SearchDrawer />}
            </React.Fragment>
        )
    }
}

App.propTypes = {
    route: string,
    isSearchDrawerOpen: boolean,
    fetchUserNotesRequested: func
}

export default connect(mapStateToProperties, {
    fetchUserNotesRequested
})(App)
