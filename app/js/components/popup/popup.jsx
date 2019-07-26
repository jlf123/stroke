import React, { useMemo, useEffect } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import './popup.less';

const StrokePopup = ({ container, title, close, view }) => {
    return useMemo(() => {
        const styles = {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            left: container.current.clientWidth + 131,
            width: '600px',
            background: 'white',
            padding: 10,
            borderRadius: 5,
            minHeight: '300px',
            top: container.current.getBoundingClientRect().top,
            border: '1px solid #C1C7D0',
            boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
                <iframe
                    src={view}
                    frameBorder="0"
                    scrolling="no"
                    id="popup-iframe"
                    style={{
                        flex: 1
                    }}
                />
            </div>
        );
    }, [title]);
};

export default StrokePopup;
