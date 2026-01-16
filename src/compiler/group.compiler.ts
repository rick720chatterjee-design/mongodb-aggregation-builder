import { AggregateOp } from '../ast/nodes';

export function compileGroup(by: string, aggs: AggregateOp[]) {
  const group: any = {
    _id: `$${by}`,
  };

  for (const agg of aggs) {
    switch (agg.op) {
      case 'sum':
        group[agg.as] = { $sum: `$${agg.field}` };
        break;
      case 'avg':
        group[agg.as] = { $avg: `$${agg.field}` };
        break;
      case 'min':
        group[agg.as] = { $min: `$${agg.field}` };
        break;
      case 'max':
        group[agg.as] = { $max: `$${agg.field}` };
        break;
      case 'count':
        group[agg.as] = { $sum: 1 };
        break;
    }
  }

  return { $group: group };
}
