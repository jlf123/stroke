import React, { Component } from 'react';
import App from './app.jsx';
import { Provider } from 'react-redux';
import store from './store';

export default class Stroke extends Component {
    constructor() {
        super();
        this.state = {
            navOpenState: {
                isOpen: true,
                width: 304
            }
        };
    }

    onNavResize(navOpenState) {
        this.setState({
            navOpenState
        });
    }

    toggleNav(shouldClose) {
        this.setState({
            navOpenState: {
                isOpen: !shouldClose,
                width: shouldClose ? 0 : 304
            }
        });
    }

    render() {
        const { navOpenState } = this.state;

        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
