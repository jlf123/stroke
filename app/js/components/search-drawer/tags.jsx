import React from 'react'
import LabelIcon from '@atlaskit/icon/glyph/label'
import { ResultBase, ResultItemGroup } from '@atlaskit/quick-search'
import { Card } from '../card'

export const TagsSearchContainer = ({
    selectedTag,
    noteTitleAndSnippets,
    setActiveTag,
    closeSearchDrawer,
    switchActiveNote
}) => (
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
                noteTitleAndSnippets.map(({ title, snippet, id }, index) => (
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
                ))}
        </div>
    </React.Fragment>
)

export const TagsSearchList = ({ tags, setActiveTag }) => (
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
)
