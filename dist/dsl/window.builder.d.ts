import { WindowOutput } from '../ast/window.node';
export declare class WindowBuilder {
    private partition?;
    private sort;
    private outputs;
    partitionBy(field: string): this;
    orderBy(field: string, dir?: 'asc' | 'desc'): this;
    runningSum(field: string): {
        as: (alias: string) => WindowBuilder;
    };
    rank(): {
        as: (alias: string) => WindowBuilder;
    };
    denseRank(): {
        as: (alias: string) => WindowBuilder;
    };
    movingAvg(field: string, window: {
        rows?: number;
        days?: number;
    }): {
        as: (alias: string) => WindowBuilder;
    };
    movingSum(field: string, window: {
        rows?: number;
        days?: number;
    }): {
        as: (alias: string) => WindowBuilder;
    };
    build(): {
        type: "window";
        partitionBy: string | undefined;
        sortBy: {
            field: string;
            order: 1 | -1;
        };
        outputs: WindowOutput[];
    };
}
