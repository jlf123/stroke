import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Drawer from '@atlaskit/drawer'
import {
    getTags,
    getSelectedTag,
    getNoteTitleAndSnippetsByActiveTag,
    getUserNotes
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
    ResultItemGroup,
    ObjectResult
} from '@atlaskit/quick-search'
import LabelIcon from '@atlaskit/icon/glyph/label'
import { Card } from '../card'
import lunr from 'lunr'
import throttle from 'lodash/throttle'
import snippet from '../../util/snippet'
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note'
import './search-drawer.less'

const search = throttle((index, query, setSearchResults) => {
    const results = index.search(query)
    setSearchResults(results ? results.map(({ ref }) => ref) : [])
}, 500)

const SearchDrawer = ({
    closeSearchDrawer,
    tagsRequested,
    tags = [],
    setActiveTag,
    selectedTag,
    noteTitleAndSnippets,
    switchActiveNote,
    notes
}) => {
    const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(true)
    const [searchIndex, setSearchIndex] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        // get all the available tags to display in the search drawer
        tagsRequested()

        // build the search index
        setSearchIndex(
            lunr(function () {
                this.field('title')
                this.field('body')
                this.ref('key')

                Object.keys(notes).map(
                    function (key) {
                        this.add({
                            key,
                            title: notes[key].title,
                            body: notes[key].searchableNoteText
                        })
                    }.bind(this)
                )
            })
        )
    }, [])

    useEffect(() => {
        if (searchQuery) {
            search(searchIndex, searchQuery, setSearchResults)
        }
    }, [searchQuery])

    return (
        <Drawer
            isOpen={isSearchDrawerOpen}
            onClose={() => {
                setActiveTag(null)
                setIsSearchDrawerOpen(false)
            }}
            onCloseComplete={closeSearchDrawer}
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
                    <QuickSearch
                        value={searchQuery}
                        onSearchInput={({ target }) => {
                            setSearchQuery(target.value)
                        }}
                    >
                        {searchQuery ? (
                            <ResultItemGroup title="Notes">
                                {searchResults.length > 0 ? (
                                    searchResults.map((key) => (
                                        <ObjectResult
                                            key={key}
                                            name={notes[key].title}
                                            containerName={snippet(
                                                notes[key].value
                                            )}
                                            avatar={
                                                <EditorNoteIcon label="Note Icon" />
                                            }
                                            onClick={() => {
                                                closeSearchDrawer()
                                                setSearchQuery('')
                                                switchActiveNote(key)
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div>
                                        No results yet, try refining your seach
                                    </div>
                                )}
                            </ResultItemGroup>
                        ) : (
                            <ResultItemGroup title="Tags">
                                {tags &&
                                    tags.length &&
                                    tags.map((tagName) => (
                                        <ResultBase
                                            key={tagName}
                                            onClick={() =>
                                                setActiveTag(tagName)
                                            }
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
                        )}
                    </QuickSearch>
                )}
            </div>
        </Drawer>
    )
}

export default connect(
    (state) => ({
        tags: getTags(state),
        selectedTag: getSelectedTag(state),
        noteTitleAndSnippets: getNoteTitleAndSnippetsByActiveTag(state),
        notes: getUserNotes(state)
    }),
    { closeSearchDrawer, tagsRequested, setActiveTag, switchActiveNote }
)(SearchDrawer)
