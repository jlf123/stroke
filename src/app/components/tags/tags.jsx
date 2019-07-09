import React, { Component } from 'react';
import './tags.less';
import { func, object } from 'prop-types';

export default class Tags extends Component {
    componentDidMount() {
        this.props.tagsRequested();
    }

    render() {
        const { tags, switchActiveNote } = this.props;

        return (
            <div className="tags">
                {tags &&
                    tags.map(({ tag, notes }, index) => (
                        <React.Fragment key={index}>
                            <h2>{tag}</h2>
                            {notes &&
                                notes.map(({ title, id, text }) => (
                                    <div
                                        className="tags__note-container"
                                        key={id}
                                        onClick={() => switchActiveNote(id)}
                                    >
                                        <h4 className="tags__note-title">
                                            {title}
                                        </h4>
                                        <div className="tags__note-inner">
                                            <p>{text}</p>
                                        </div>
                                    </div>
                                ))}
                        </React.Fragment>
                    ))}
            </div>
        );
    }
}

Tags.propTypes = {
    tagsRequested: func,
    tags: object,
    switchActiveNote: func
};
