import { AddFieldNode } from '../ast/nodes';
export declare function compileAddField(stage: AddFieldNode): {
    $addFields: {
        [stage.name]: any;
    };
};
