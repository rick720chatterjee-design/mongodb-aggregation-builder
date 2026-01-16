import { JoinNode } from "./join.node";
import { FacetNode } from './facet.node';
import { Expression } from './expression.node';
import { SearchNode } from './search.node';
import { HavingNode } from './having.node';
import { UnwindNode } from './unwind.node';
import { WindowNode } from './window.node';
export type LogicalOp = 'and' | 'or';
export type Condition = {
    kind: 'eq';
    field: string;
    value: any;
} | {
    kind: 'gt';
    field: string;
    value: any;
} | {
    kind: 'between';
    field: string;
    min: any;
    max: any;
};
export type AggregateOp = {
    op: 'sum';
    field: string;
    as: string;
} | {
    op: 'avg';
    field: string;
    as: string;
} | {
    op: 'min';
    field: string;
    as: string;
} | {
    op: 'max';
    field: string;
    as: string;
} | {
    op: 'count';
    as: string;
};
export type Stage = {
    type: 'where';
    group: WhereGroup;
} | {
    type: 'group';
    by: string;
    aggregates: AggregateOp[];
} | {
    type: 'sort';
    field: string;
    dir: 1 | -1;
} | {
    type: 'paginate';
    page: number;
    limit: number;
} | {
    type: 'select';
    fields: string[];
} | JoinNode | FacetNode | AddFieldNode | SearchNode | HavingNode | UnwindNode | WindowNode;
export interface WhereGroup {
    op: LogicalOp;
    conditions: (Condition | WhereGroup)[];
}
export interface GroupStage {
    type: 'group';
    by: string;
    aggregates: AggregateOp[];
}
export interface AddFieldNode {
    type: 'addField';
    name: string;
    expression: Expression;
}
