import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tagsRequested, switchActiveNote } from '../../state/actions';
import { getTags } from '../../state/selectors';
import Panel from '@atlaskit/panel';
import './tags.less';

const mapDispatchToProps = {
    tagsRequested,
    switchActiveNote
};

const mapStateToProps = state => ({
    tags: getTags(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends Component {
        componentDidMount() {
            this.props.tagsRequested();
        }

        render() {
            const { tags, switchActiveNote } = this.props;

            return (
                <div className="tags">
                    {tags &&
                        tags.map(({ tag, notes }) => (
                            <React.Fragment>
                                <h2>{tag}</h2>
                                {notes &&
                                    notes.map(({ title, id, text }) => (
                                        <div
                                            class="tags__note-container"
                                            key={id}
                                            onClick={() => switchActiveNote(id)}
                                        >
                                            <h4 class="tags__note-title">
                                                {title}
                                            </h4>
                                            <div class="tags__note-inner">
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
);
