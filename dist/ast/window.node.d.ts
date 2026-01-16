export type SlidingWindow = {
    type: 'rows';
    value: number;
} | {
    type: 'days';
    value: number;
};
export type WindowOutput = {
    op: 'runningSum';
    field: string;
    as: string;
} | {
    op: 'rank';
    as: string;
} | {
    op: 'denseRank';
    as: string;
} | {
    op: 'movingAvg';
    field: string;
    window: SlidingWindow;
    as: string;
} | {
    op: 'movingSum';
    field: string;
    window: SlidingWindow;
    as: string;
};
export interface WindowNode {
    type: 'window';
    partitionBy?: string;
    sortBy: {
        field: string;
        order: 1 | -1;
    };
    outputs: WindowOutput[];
}
