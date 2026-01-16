import { HavingCondition } from '../ast/having.node';

export class HavingBuilder {
  constructor(private conditions: HavingCondition[]) {}

  eq(value: any) {
    this.conditions.push({ field: this.field, op: 'eq', value });
    return this;
  }

  gt(value: number) {
    this.conditions.push({ field: this.field, op: 'gt', value });
    return this;
  }

  gte(value: number) {
    this.conditions.push({ field: this.field, op: 'gte', value });
    return this;
  }

  lt(value: number) {
    this.conditions.push({ field: this.field, op: 'lt', value });
    return this;
  }

  lte(value: number) {
    this.conditions.push({ field: this.field, op: 'lte', value });
    return this;
  }

  // internal
  private field!: string;
  _setField(field: string) {
    this.field = field;
    return this;
  }
}
