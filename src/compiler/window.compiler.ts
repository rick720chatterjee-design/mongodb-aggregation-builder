import { WindowNode } from '../ast/window.node';

export function compileWindow(stage: WindowNode) {
  const output: any = {};

  for (const o of stage.outputs) {
    switch (o.op) {
      case 'runningSum':
        output[o.as] = {
          $sum: `$${o.field}`,
          window: { documents: ['unbounded', 'current'] },
        };
        break;

      case 'rank':
        output[o.as] = { $rank: {} };
        break;

      case 'denseRank':
        output[o.as] = { $denseRank: {} };
        break;

      case 'movingAvg': {
        const win =
            o.window.type === 'rows'
            ? { documents: [-(o.window.value - 1), 0] }
            : { range: [-o.window.value * 24 * 60 * 60 * 1000, 0] };

        output[o.as] = {
            $avg: `$${o.field}`,
            window: win,
        };
        break;
        }

      case 'movingSum': {
        const win =
            o.window.type === 'rows'
            ? { documents: [-(o.window.value - 1), 0] }
            : { range: [-o.window.value * 24 * 60 * 60 * 1000, 0] };

        output[o.as] = {
            $sum: `$${o.field}`,
            window: win,
        };
        break;
        }
    }
  }

  return {
    $setWindowFields: {
      ...(stage.partitionBy && {
        partitionBy: `$${stage.partitionBy}`,
      }),
      sortBy: {
        [stage.sortBy.field]: stage.sortBy.order,
      },
      output,
    },
  };
}
