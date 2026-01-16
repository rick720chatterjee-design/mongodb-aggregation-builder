import { HavingNode } from '../ast/having.node';
export declare function compileHaving(stage: HavingNode): {
    $match: any;
};
