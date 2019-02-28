import { Step, StepResult } from 'prosemirror-transform';
/**
 * For more context on what this is about:
 * @see https://discuss.prosemirror.net/t/preventing-image-placeholder-replacement-from-being-undone/1394
 */
export declare class SetAttrsStep extends Step {
    pos: number;
    attrs: object;
    constructor(pos: any, attrs: any);
    apply(doc: any): StepResult<any>;
    invert(doc: any): SetAttrsStep;
    map(mapping: any): SetAttrsStep | null;
    toJSON(): {
        stepType: string;
        pos: number;
        attrs: object;
    };
    static fromJSON(schema: any, json: any): SetAttrsStep;
}
