import React from 'react'
import './loading.less'

export const StrokeLoading = ({ message }) => (
    <div className="stroke-loading">
        <div className="stroke-loading__stroke-icon"></div>
        <div className="stroke-loading__pencil"></div>
        {message && <div className="stroke-loading__message">{message}</div>}
    </div>
)
