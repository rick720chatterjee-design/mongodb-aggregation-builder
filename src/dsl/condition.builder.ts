import { Query } from './query';
import { WhereGroup } from '../ast/nodes';

export class ConditionBuilder {
  constructor(
    private query: Query,
    private field: string,
    private group: WhereGroup
  ) {}

  eq(value: any) {
    this.group.conditions.push({ kind: 'eq', field: this.field, value });
    return this.query;
  }

  gt(value: any) {
    this.group.conditions.push({ kind: 'gt', field: this.field, value });
    return this.query;
  }

  between(min: any, max: any) {
    this.group.conditions.push({
      kind: 'between',
      field: this.field,
      min,
      max,
    });
    return this.query;
  }
}
