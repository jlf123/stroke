import React, { Component } from 'react';
import StrokeNavigation from './components/navigation';
import Page from '@atlaskit/page';
import '../less/_base.less';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';
import { globalNav } from './components/navigation/global';
import { connect } from 'react-redux';
import { fetchUserNotesRequested } from './state/actions';
import { ProductNav } from './components/navigation/product';
import { DeleteModal } from './components/delete';
import { getRoute } from './state/selectors';
import StrokeEditor from './components/editor';
import TagsContainer from './components/tags/tags';

const mapStateToProps = state => ({
    route: getRoute(state)
});

export default connect(
    mapStateToProps,
    {
        fetchUserNotesRequested
    }
)(
    class App extends Component {
        componentDidMount() {
            this.props.fetchUserNotesRequested();
        }

        render() {
            const { width, route } = this.props;
            console.log('got the route: ', route)
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
                </React.Fragment>
            );
        }
    }
);
