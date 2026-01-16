import { WhereGroup, Stage } from '../ast/nodes';
import { ConditionBuilder } from './condition.builder';
import { compilePipeline } from '../compiler/pipeline.compiler';
import { GroupBuilder } from './group.builder';
import { JoinBuilder } from './join.builder';
import { ExpressionBuilder } from './expression.builder';
import { HavingBuilder } from './having.builder';
import { WindowBuilder } from './window.builder';


export class Query {
  private whereGroup: WhereGroup = { op: 'and', conditions: [] };
  private stages: Stage[] = [];
  private havingConditions: any[] = [];

  static from(_collection: string) {
    return new Query();
  }

  where(field: string) {
    return new ConditionBuilder(this, field, this.whereGroup);
  }

  and(field: string) {
    return this.where(field);
  }

  orGroup(cb: (q: Query) => void) {
    const sub = new Query();
    cb(sub);
    this.whereGroup.conditions.push({
      op: 'or',
      conditions: sub.whereGroup.conditions,
    });
    return this;
  }

  groupBy(field: string, cb: (g: GroupBuilder) => void) {
    const builder = new GroupBuilder();
    cb(builder);

    this.stages.push({
      type: 'group',
      by: field,
      aggregates: builder.build(),
    });
    return this;
}

  sortBy(field: string, dir: 'asc' | 'desc') {
    this.stages.push({
      type: 'sort',
      field,
      dir: dir === 'asc' ? 1 : -1,
    });
    return this;
  }

  paginate(page: number, limit: number) {
    this.stages.push({ type: 'paginate', page, limit });
    return this;
  }

  select(fields: string[]) {
    this.stages.push({ type: 'select', fields });
    return this;
  }

  join(collection: string, cb: (j: JoinBuilder) => void) {
    const builder = new JoinBuilder(collection);
    cb(builder);
    this.stages.push(builder.build());
    return this;
  }

  facet(opts: { page: number; limit: number }) {
    this.stages.push({
      type: 'facet',
      page: opts.page,
      limit: opts.limit,
    });
    return this;
  }

  addField(
    name: string,
    cb: (e: ExpressionBuilder) => any
  ) {
    const builder = new ExpressionBuilder();
    const expression = cb(builder);

    this.stages.push({
      type: 'addField',
      name,
      expression,
    });

    return this;
  }

  search(
    term: string,
    options:
      | string[]
      | {
          fields: string[];
          mode?: 'contains' | 'startsWith' | 'exact';
          caseSensitive?: boolean;
        }
  ) {
    if (Array.isArray(options)) {
      this.stages.push({
        type: 'search',
        term,
        fields: options,
        mode: 'contains',
        caseSensitive: false,
      });
    } else {
      this.stages.push({
        type: 'search',
        term,
        fields: options.fields,
        mode: options.mode ?? 'contains',
        caseSensitive: options.caseSensitive ?? false,
      });
    }

    return this;
  }

  having(field: string) {
    const builder = new HavingBuilder(this.havingConditions)._setField(field);
    return builder;
  }

  unwind(
    field: string,
    opts?: {
      preserveEmpty?: boolean;
      indexAs?: string;
    }
  ) {
    this.stages.push({
      type: 'unwind',
      path: field,
      preserveEmpty: opts?.preserveEmpty ?? false,
      indexAs: opts?.indexAs,
    });

    return this;
  }

  window(cb: (w: WindowBuilder) => void) {
    const builder = new WindowBuilder();
    cb(builder);
    this.stages.push(builder.build());
    return this;
  }
  
  _addCondition(cond: any) {
    this.whereGroup.conditions.push(cond);
  }

  build() {
    if (this.havingConditions.length) {
      this.stages.push({
        type: 'having',
        conditions: this.havingConditions,
      });
    }
    return compilePipeline(this.whereGroup, this.stages);
  }
}
