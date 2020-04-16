import React from 'react';
import ReactDOM from 'react-dom';
import './splash-screen.less';

const SplashScreen = () => (
    <div class="container">
        <div class="splashscreen">
            <div className="splashscreen__stroke-icon"></div>
            <div className="splashscreen__pencil"></div>
        </div>
    </div>
);

ReactDOM.render((<SplashScreen />), document.querySelector('#app'));
