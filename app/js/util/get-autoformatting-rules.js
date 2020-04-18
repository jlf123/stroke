import { addTag } from './tags'

export const getAutoFormattingRules = (activeNoteKey, fabricActions) => {
    return Promise.resolve({
        getRules: () => {
            return Promise.resolve({
                '\\$\\$([a-z|A-Z]*)': ([, title]) => {
                    setTimeout(() => {
                        fabricActions.replaceSelection({
                            type: 'extension',
                            attrs: {
                                extensionType: 'com.stroke',
                                extensionKey: 'tag',
                                parameters: {
                                    title
                                }
                            }
                        })

                        addTag({
                            tagName: title,
                            noteKey: window.ACTIVE_NOTE_KEY
                        })
                    }, 500)

                    return Promise.resolve({
                        type: 'text',
                        text: ' '
                    })
                }
            })
        }
    })
}
