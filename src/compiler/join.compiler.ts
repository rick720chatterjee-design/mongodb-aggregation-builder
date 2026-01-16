import { JoinNode } from '../ast/join.node';
import { compileWhere } from './where.compiler';

export function compileJoin(join: JoinNode) {
  const pipeline: any[] = [
    {
      $match: {
        $expr: {
          $eq: [`$${join.foreignField}`, `$$localId`],
        },
      },
    },
  ];

  if (join.where) {
    pipeline.push({
      $match: compileWhere(join.where),
    });
  }

  if (join.select?.length) {
    pipeline.push({
      $project: Object.fromEntries(
        join.select.map(f => [f, 1])
      ),
    });
  }

  return {
    $lookup: {
      from: join.from,
      let: { localId: `$${join.localField}` },
      pipeline,
      as: join.from,
    },
  };
}
