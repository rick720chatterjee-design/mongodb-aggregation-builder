import { WhereGroup } from './nodes';
export interface JoinNode {
    type: 'join';
    from: string;
    localField: string;
    foreignField: string;
    where?: WhereGroup;
    select?: string[];
}
