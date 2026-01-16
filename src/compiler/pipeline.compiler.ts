import { WhereGroup, Stage } from '../ast/nodes';
import { compileGroup } from './group.compiler';
import { compileWhere } from './where.compiler';
import { compileJoin } from './join.compiler';
import { compileFacet } from './facet.compiler';
import { compileAddField } from './add-field.compiler';
import { compileSearch } from './search.compiler';
import { compileHaving } from './having.compiler';
import { compileUnwind } from './unwind.compiler';
import { compileWindow } from './window.compiler';


export function compilePipeline(where: WhereGroup, stages: Stage[]) {
  const pipeline: any[] = [];

  if (where.conditions.length) {
    pipeline.push({ $match: compileWhere(where) });
  }

  for (const stage of stages) {
    if (stage.type === 'sort') {
      pipeline.push({ $sort: { [stage.field]: stage.dir } });
    }

    if (stage.type === 'paginate') {
      pipeline.push(
        { $skip: (stage.page - 1) * stage.limit },
        { $limit: stage.limit }
      );
    }

    if (stage.type === 'select') {
      pipeline.push({
        $project: Object.fromEntries(stage.fields.map(f => [f, 1])),
      });
    }

    if (stage.type === 'group') {
      pipeline.push(
        compileGroup(stage.by, stage.aggregates)
      );
    }

    if (stage.type === 'join') {
      pipeline.push(compileJoin(stage));
    }

    if (stage.type === 'facet') {
      pipeline.push(
        compileFacet(stage.page, stage.limit)
      );
    }

    if (stage.type === 'addField') {
      pipeline.push(compileAddField(stage));
    }

    if (stage.type === 'search') {
      pipeline.push(compileSearch(stage));
    }

    if (stage.type === 'having') {
      pipeline.push(compileHaving(stage));
    }

    if (stage.type === 'unwind') {
      pipeline.push(compileUnwind(stage));
    }

    if (stage.type === 'window') {
      pipeline.push(compileWindow(stage));
    }
  }

  return pipeline;
}
