import React from 'react';
import ReactDOM from 'react-dom';
import './splash-screen.less';

const SplashScreen = () => (
    <div class="container">
        <div class="splashscreen">
            <div class="splashscreen__stroke-icon"></div>
            <div class="splashscreen__pencil"></div>
        </div>
    </div>
);

ReactDOM.render((<SplashScreen />), document.querySelector('#app'));
