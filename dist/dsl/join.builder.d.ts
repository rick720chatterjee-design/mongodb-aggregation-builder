import { WhereGroup } from '../ast/nodes';
import { ConditionBuilder } from './condition.builder';
export declare class JoinBuilder {
    private readonly from;
    private localField;
    private foreignField;
    private whereGroup;
    private projection?;
    constructor(from: string);
    on(local: string, foreign: string): this;
    where(field: string): ConditionBuilder;
    select(fields: string[]): this;
    build(): {
        type: "join";
        from: string;
        localField: string;
        foreignField: string;
        where: WhereGroup | undefined;
        select: string[] | undefined;
    };
}
