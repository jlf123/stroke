import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const TitleInput = styled.input`
    border: none;
    outline: none;
    font-size: 2.07142857em;
    margin: 0 0 21px;
    padding: 0;
    width: 100%;

    &::placeholder {
        color: '#8B93A2';
    }
`
TitleInput.displayName = 'TitleInput'

const StrokeTitle = ({
    title,
    onFocus,
    onBlur,
    onChange,
    innerRef,
    activeNoteId
}) => {
    const [inputValue, setInputValue] = useState(title)

    // programatically update the title whenever
    // the active note is changed
    useEffect(() => {
        setInputValue(title)
    }, [activeNoteId])

    return (
        <TitleInput
            placeholder="Give this note a title..."
            innerRef={innerRef}
            value={inputValue}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(event) => {
                setInputValue(event.target.value)
                onChange(event)
            }}
            id="note-title"
            key="note-title"
        />
    )
}

export default StrokeTitle
