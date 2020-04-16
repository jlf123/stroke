import React from 'react'
import ReactDOM from 'react-dom'
import { StrokeLoading } from '../js/components/loading'
import './splash-screen.less'

const SplashScreen = () => (
    <div className="container">
        <StrokeLoading />
    </div>
)

ReactDOM.render(<SplashScreen />, document.querySelector('#app'))
