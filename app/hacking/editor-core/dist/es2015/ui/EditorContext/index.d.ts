import * as React from 'react';
import * as PropTypes from 'prop-types';
import EditorActions from '../../actions';
export default class EditorContext extends React.Component<{
    editorActions?: EditorActions;
}, {}> {
    static childContextTypes: {
        editorActions: PropTypes.Requireable<any>;
    };
    private editorActions;
    constructor(props: any);
    getChildContext(): {
        editorActions: EditorActions;
    };
    render(): React.ReactElement<any>;
}
