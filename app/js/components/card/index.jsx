import React from 'react'
import Button from '@atlaskit/button'
import { string, object, func } from 'prop-types'
import { ReactRenderer } from '@atlaskit/renderer'
import './card.less'

export const Card = ({ title, snippetAdf, onClick }) => (
    <div className="card">
        <h3 className="card__title">{title}</h3>
        <div className="card__snippet">
            <ReactRenderer document={snippetAdf} />
        </div>
        <div className="card__button">
            <Button appearance="primary" onClick={onClick}>
                View note
            </Button>
        </div>
    </div>
)

Card.propTypes = {
    title: string,
    snippetAdf: object,
    onClick: func
}
