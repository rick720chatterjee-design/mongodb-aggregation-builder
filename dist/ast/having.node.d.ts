export type HavingOp = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';
export interface HavingCondition {
    field: string;
    op: HavingOp;
    value: any;
}
export interface HavingNode {
    type: 'having';
    conditions: HavingCondition[];
}
