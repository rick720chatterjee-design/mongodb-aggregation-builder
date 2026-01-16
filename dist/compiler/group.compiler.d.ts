import { AggregateOp } from '../ast/nodes';
export declare function compileGroup(by: string, aggs: AggregateOp[]): {
    $group: any;
};
