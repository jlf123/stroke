import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Drawer from '@atlaskit/drawer'
import {
    getIsSearchDrawerOpen,
    getTags,
    getSelectedTag,
    getNoteTitleAndSnippetsByActiveTag
} from '../../state/selectors'
import {
    closeSearchDrawer,
    tagsRequested,
    setActiveTag,
    switchActiveNote
} from '../../state/actions'
import {
    QuickSearch,
    ResultBase,
    ResultItemGroup
} from '@atlaskit/quick-search'
import LabelIcon from '@atlaskit/icon/glyph/label'
import { Card } from '../card'
import './search-drawer.less'

const SearchDrawer = ({
    isSearchDrawerOpen,
    closeSearchDrawer,
    tagsRequested,
    tags = [],
    setActiveTag,
    selectedTag,
    noteTitleAndSnippets,
    switchActiveNote
}) => {
    useEffect(() => {
        if (isSearchDrawerOpen) {
            tagsRequested()
        }
    }, [isSearchDrawerOpen])
    return (
        <Drawer
            isOpen={isSearchDrawerOpen}
            onClose={() => {
                setActiveTag(null)
                closeSearchDrawer()
            }}
            width="wide"
        >
            <div style={{ paddingLeft: '10px' }}>
                {selectedTag ? (
                    <React.Fragment>
                        <div className="selected-tag-header">
                            <LabelIcon
                                label="Tag Icon"
                                size="large"
                                primaryColor="blue"
                                secondaryColor="blue"
                            />
                            {selectedTag}
                        </div>
                        <div className="card-container">
                            {noteTitleAndSnippets &&
                                noteTitleAndSnippets.length &&
                                noteTitleAndSnippets.map(
                                    ({ title, snippet, id }, index) => (
                                        <Card
                                            title={title}
                                            snippetAdf={snippet}
                                            key={index}
                                            onClick={() => {
                                                setActiveTag(null)
                                                closeSearchDrawer()
                                                switchActiveNote(id)
                                            }}
                                        />
                                    )
                                )}
                        </div>
                    </React.Fragment>
                ) : (
                    <QuickSearch>
                        <ResultItemGroup title="Tags">
                            {tags &&
                                tags.length &&
                                tags.map((tagName) => (
                                    <ResultBase
                                        key={tagName}
                                        onClick={() => setActiveTag(tagName)}
                                        icon={
                                            <LabelIcon
                                                label="Tag Icon"
                                                size="large"
                                                primaryColor="blue"
                                                secondaryColor="blue"
                                            />
                                        }
                                        text={tagName}
                                    />
                                ))}
                        </ResultItemGroup>
                    </QuickSearch>
                )}
            </div>
        </Drawer>
    )
}

export default connect(
    (state) => ({
        isSearchDrawerOpen: getIsSearchDrawerOpen(state),
        tags: getTags(state),
        selectedTag: getSelectedTag(state),
        noteTitleAndSnippets: getNoteTitleAndSnippetsByActiveTag(state)
    }),
    { closeSearchDrawer, tagsRequested, setActiveTag, switchActiveNote }
)(SearchDrawer)
