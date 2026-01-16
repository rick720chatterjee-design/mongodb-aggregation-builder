import { AggregateOp } from '../ast/nodes';

export class GroupBuilder {
  private aggregates: AggregateOp[] = [];

  sum(field: string) {
    return this._push({ op: 'sum', field });
  }

  avg(field: string) {
    return this._push({ op: 'avg', field });
  }

  min(field: string) {
    return this._push({ op: 'min', field });
  }

  max(field: string) {
    return this._push({ op: 'max', field });
  }

  count() {
    return this._push({ op: 'count' });
  }

  private _push(base: any) {
    return {
      as: (alias: string) => {
        this.aggregates.push({ ...base, as: alias });
        return this;
      },
    };
  }

  build() {
    return this.aggregates;
  }
}
