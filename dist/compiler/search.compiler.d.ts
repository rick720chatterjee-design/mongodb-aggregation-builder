import { SearchNode } from '../ast/search.node';
export declare function compileSearch(stage: SearchNode): {
    $match: {
        $or: {
            [x: string]: {
                $regex: string;
                $options: string;
            };
        }[];
    };
};
