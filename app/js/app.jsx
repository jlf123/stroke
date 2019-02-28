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

export default connect(
    null,
    {
        fetchUserNotesRequested
    }
)(
    class App extends Component {
        componentDidMount() {
            this.props.fetchUserNotesRequested();
        }

        render() {
            const { width } = this.props;
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
                                {this.props.children}
                            </div>
                        </LayoutManager>
                    </NavigationProvider>
                    <DeleteModal />
                </React.Fragment>
            );
        }
    }
);
