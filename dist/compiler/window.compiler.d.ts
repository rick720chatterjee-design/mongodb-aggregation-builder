import { WindowNode } from '../ast/window.node';
export declare function compileWindow(stage: WindowNode): {
    $setWindowFields: {
        sortBy: {
            [stage.sortBy.field]: 1 | -1;
        };
        output: any;
        partitionBy?: string | undefined;
    };
};
