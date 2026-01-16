import { Expression } from '../ast/expression.node';

export function compileExpression(expr: Expression): any {
  switch (expr.kind) {
    case 'add':
      return {
        $add: expr.fields.map(f => `$${f}`),
      };

    case 'concat':
      return {
        $concat: expr.values.map(v =>
          typeof v === 'string' ? `$${v}` : v
        ),
      };

    case 'cond':
      return {
        $cond: {
          if: {
            [`$${expr.op}`]: [`$${expr.field}`, expr.value],
          },
          then: expr.then,
          else: expr.else,
        },
      };
  }
}
