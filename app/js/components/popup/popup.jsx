import React, { useMemo, useEffect, useRef, useState } from 'react'
import CrossIcon from '@atlaskit/icon/glyph/cross'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import { StrokeLoading } from '../loading'
import './popup.less'

const StrokePopup = ({
    container,
    title,
    close,
    appUrl,
    deleteApp,
    note,
    icon
}) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPopupVisible(true)
        })
    }, [])

    return useMemo(() => {
        const styles = {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            right: 75,
            width: '80vw',
            zIndex: 1000,
            background: 'white',
            padding: 10,
            borderRadius: 5,
            height: '80vh',
            top: popupVisible ? container.current.getBoundingClientRect().top + 50 : '-500px',
            border: '1px solid #C1C7D0',
            opacity: popupVisible ? 1 : 0,
            transition: 'top .5s, opacity .5s',
            boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }

        return (
            <div className="popup" style={styles}>
                <div className="popup__arrow" />
                <div className="popup__header">
                    <div className="popup__header--primary">
                        <div className="popup__app-icon">{icon}</div>
                        <div className="popup__title">{title}</div>
                    </div>
                    {deleteApp && (
                        <div className="popup__delete-app" onClick={deleteApp}>
                            <TrashIcon />
                        </div>
                    )}
                    <div className="icon-btn" onClick={close}>
                        <CrossIcon />
                    </div>
                </div>
                {!iframeLoaded && (
                    <div className="popup__loading-container">
                        <StrokeLoading message="Loading app..." />
                    </div>
                )}
                <iframe
                    src={`${appUrl}/view`}
                    frameBorder="0"
                    id="popup-iframe"
                    allow=""
                    onLoad={() => {
                        setTimeout(() => {
                            document
                                .getElementById('popup-iframe')
                                .contentWindow.postMessage(
                                    {
                                        call: 'sendingNote',
                                        value: {
                                            title: note.title,
                                            value: note.value
                                        }
                                    },
                                    '*'
                                )
                            setIframeLoaded(true)
                        }, 500)
                    }}
                    style={{
                        flex: 1,
                        display: iframeLoaded ? 'inherit' : 'none'
                    }}
                />
            </div>
        )
    }, [title, iframeLoaded, popupVisible])
}

export default StrokePopup
