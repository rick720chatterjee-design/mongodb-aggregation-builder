import { AddFieldNode } from '../ast/nodes';
import { compileExpression } from './expression.compiler';

export function compileAddField(stage: AddFieldNode) {
  return {
    $addFields: {
      [stage.name]: compileExpression(stage.expression),
    },
  };
}
