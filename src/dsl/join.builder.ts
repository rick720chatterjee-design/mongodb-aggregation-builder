import { WhereGroup } from '../ast/nodes';
import { ConditionBuilder } from './condition.builder';

export class JoinBuilder {
  private localField!: string;
  private foreignField!: string;
  private whereGroup: WhereGroup = { op: 'and', conditions: [] };
  private projection?: string[];

  constructor(private readonly from: string) {}

  on(local: string, foreign: string) {
    this.localField = local;
    this.foreignField = foreign;
    return this;
  }

  where(field: string) {
    return new ConditionBuilder(
      {
        _addCondition: (c: any) =>
          this.whereGroup.conditions.push(c),
      } as any,
      field,
      this.whereGroup
    );
  }

  select(fields: string[]) {
    this.projection = fields;
    return this;
  }

  build() {
    return {
      type: 'join' as const,
      from: this.from,
      localField: this.localField,
      foreignField: this.foreignField,
      where: this.whereGroup.conditions.length
        ? this.whereGroup
        : undefined,
      select: this.projection,
    };
  }
}
