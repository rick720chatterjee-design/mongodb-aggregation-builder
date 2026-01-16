import { HavingCondition } from '../ast/having.node';
export declare class HavingBuilder {
    private conditions;
    constructor(conditions: HavingCondition[]);
    eq(value: any): this;
    gt(value: number): this;
    gte(value: number): this;
    lt(value: number): this;
    lte(value: number): this;
    private field;
    _setField(field: string): this;
}
