import { ConditionBuilder } from './condition.builder';
import { GroupBuilder } from './group.builder';
import { JoinBuilder } from './join.builder';
import { ExpressionBuilder } from './expression.builder';
import { HavingBuilder } from './having.builder';
import { WindowBuilder } from './window.builder';
export declare class Query {
    private whereGroup;
    private stages;
    private havingConditions;
    static from(_collection: string): Query;
    where(field: string): ConditionBuilder;
    and(field: string): ConditionBuilder;
    orGroup(cb: (q: Query) => void): this;
    groupBy(field: string, cb: (g: GroupBuilder) => void): this;
    sortBy(field: string, dir: 'asc' | 'desc'): this;
    paginate(page: number, limit: number): this;
    select(fields: string[]): this;
    join(collection: string, cb: (j: JoinBuilder) => void): this;
    facet(opts: {
        page: number;
        limit: number;
    }): this;
    addField(name: string, cb: (e: ExpressionBuilder) => any): this;
    search(term: string, options: string[] | {
        fields: string[];
        mode?: 'contains' | 'startsWith' | 'exact';
        caseSensitive?: boolean;
    }): this;
    having(field: string): HavingBuilder;
    unwind(field: string, opts?: {
        preserveEmpty?: boolean;
        indexAs?: string;
    }): this;
    window(cb: (w: WindowBuilder) => void): this;
    _addCondition(cond: any): void;
    build(): any[];
}
