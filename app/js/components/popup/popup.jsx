import React from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import './popup.less';

const StrokePopup = ({ container, title, close, view }) => {
    const styles = {
        position: 'fixed',
        left: container.current.clientWidth + 131,
        width: '600px',
        background: '#0747A6',
        padding: 10,
        borderRadius: 5,
        top: container.current.getBoundingClientRect().top
    };
    return (
        <div className="popup" style={styles}>
            <div className="popup__arrow" />
            <div className="popup__header">
                <div className="popup__title">{title}</div>
                <div className="popup__icon" onClick={close}>
                    <CrossIcon />
                </div>
            </div>
            <hr />
            <iframe src={view} frameborder="0" />
        </div>
    );
};

export default StrokePopup;
