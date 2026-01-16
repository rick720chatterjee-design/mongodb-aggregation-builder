import { UnwindNode } from '../ast/unwind.node';

export function compileUnwind(stage: UnwindNode) {
  const unwind: any = {
    path: `$${stage.path}`,
    preserveNullAndEmptyArrays: stage.preserveEmpty,
  };

  if (stage.indexAs) {
    unwind.includeArrayIndex = stage.indexAs;
  }

  return { $unwind: unwind };
}
