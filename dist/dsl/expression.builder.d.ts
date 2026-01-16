import { Expression } from '../ast/expression.node';
export declare class ExpressionBuilder {
    add(fields: string[]): Expression;
    concat(values: (string | number)[]): Expression;
    when(field: string): {
        gt: (value: any) => {
            then: (t: any) => {
                else: (e: any) => Expression;
            };
        };
        eq: (value: any) => {
            then: (t: any) => {
                else: (e: any) => Expression;
            };
        };
    };
}
