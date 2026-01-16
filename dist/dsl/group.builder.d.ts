import { AggregateOp } from '../ast/nodes';
export declare class GroupBuilder {
    private aggregates;
    sum(field: string): {
        as: (alias: string) => GroupBuilder;
    };
    avg(field: string): {
        as: (alias: string) => GroupBuilder;
    };
    min(field: string): {
        as: (alias: string) => GroupBuilder;
    };
    max(field: string): {
        as: (alias: string) => GroupBuilder;
    };
    count(): {
        as: (alias: string) => GroupBuilder;
    };
    private _push;
    build(): AggregateOp[];
}
