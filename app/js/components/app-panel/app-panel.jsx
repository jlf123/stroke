import React, { useRef } from 'react'
import { ConfluenceIcon } from '@atlaskit/logo'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import { connect } from 'react-redux'
import { openAppPopup } from '../../state/actions'
import Tooltip from '@atlaskit/tooltip'
import './app-panel.less'

export const AppPanel = connect(null, { openAppPopup })(({ openAppPopup }) => {
    const selectedAppRef = useRef()
    const appExplorerRef = useRef()
    return (
        <div className="app-panel">
            <div className="app-panel__title">Apps</div>
            <div className="app-panel__app-container">
                <div className="app-panel__apps">
                    <Tooltip content="Open Confluence app">
                        <div
                            className="app-panel__app icon-btn"
                            ref={selectedAppRef}
                            onClick={() =>
                                openAppPopup({
                                    appUrl: 'http://localhost:8080/confluence',
                                    appId: 'stroke-confluence',
                                    appRef: selectedAppRef,
                                    appName: 'Confluence',
                                    appIcon: <ConfluenceIcon />
                                })
                            }
                        >
                            <ConfluenceIcon />
                        </div>
                    </Tooltip>
                </div>
                <Tooltip content="Install a new Stroke app">
                    <div
                        className="app-panel__add-app icon-btn"
                        ref={appExplorerRef}
                        onClick={() => openAppPopup({
                            appUrl: 'http://localhost:8080/app-explorer',
                            appId: 'app-explorer',
                            appRef: appExplorerRef,
                            appName: 'App Explorer'
                        })}
                    >
                        <EditorAddIcon label="Add a Stroke App" />
                    </div>
                </Tooltip>
            </div>
        </div>
    )
})
