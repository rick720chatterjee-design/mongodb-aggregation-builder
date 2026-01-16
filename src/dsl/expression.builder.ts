import { Expression } from '../ast/expression.node';

export class ExpressionBuilder {
  add(fields: string[]): Expression {
    return { kind: 'add', fields };
  }

  concat(values: (string | number)[]): Expression {
    return { kind: 'concat', values };
  }

  when(field: string) {
    return {
      gt: (value: any) => ({
        then: (t: any) => ({
          else: (e: any): Expression => ({
            kind: 'cond',
            field,
            op: 'gt',
            value,
            then: t,
            else: e,
          }),
        }),
      }),
      eq: (value: any) => ({
        then: (t: any) => ({
          else: (e: any): Expression => ({
            kind: 'cond',
            field,
            op: 'eq',
            value,
            then: t,
            else: e,
          }),
        }),
      }),
    };
  }
}
