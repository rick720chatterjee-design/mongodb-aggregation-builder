import { Query } from './query';
import { WhereGroup } from '../ast/nodes';
export declare class ConditionBuilder {
    private query;
    private field;
    private group;
    constructor(query: Query, field: string, group: WhereGroup);
    eq(value: any): Query;
    gt(value: any): Query;
    between(min: any, max: any): Query;
}
