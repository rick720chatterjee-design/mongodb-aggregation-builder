import { WhereGroup } from '../ast/nodes';

export function compileWhere(group: WhereGroup): any {
  const clauses = group.conditions.map((c: any) => {
    if (c.op) return compileWhere(c);

    switch (c.kind) {
      case 'eq':
        return { [c.field]: c.value };
      case 'gt':
        return { [c.field]: { $gt: c.value } };
      case 'between':
        return { [c.field]: { $gte: c.min, $lte: c.max } };
    }
  });

  return { [`$${group.op}`]: clauses };
}
