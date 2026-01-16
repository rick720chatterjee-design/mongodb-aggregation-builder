import { JoinNode } from '../ast/join.node';
export declare function compileJoin(join: JoinNode): {
    $lookup: {
        from: string;
        let: {
            localId: string;
        };
        pipeline: any[];
        as: string;
    };
};
