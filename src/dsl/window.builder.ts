import { WindowOutput } from '../ast/window.node';

export class WindowBuilder {
  private partition?: string;
  private sort!: { field: string; order: 1 | -1 };
  private outputs: WindowOutput[] = [];

  partitionBy(field: string) {
    this.partition = field;
    return this;
  }

  orderBy(field: string, dir: 'asc' | 'desc' = 'asc') {
    this.sort = {
      field,
      order: dir === 'asc' ? 1 : -1,
    };
    return this;
  }

  runningSum(field: string) {
    return {
      as: (alias: string) => {
        this.outputs.push({
          op: 'runningSum',
          field,
          as: alias,
        });
        return this;
      },
    };
  }

  rank() {
    return {
      as: (alias: string) => {
        this.outputs.push({
          op: 'rank',
          as: alias,
        });
        return this;
      },
    };
  }

  denseRank() {
    return {
      as: (alias: string) => {
        this.outputs.push({
          op: 'denseRank',
          as: alias,
        });
        return this;
      },
    };
  }

  movingAvg(
    field: string,
    window: { rows?: number; days?: number }
    ) {
    return {
        as: (alias: string) => {
        this.outputs.push({
            op: 'movingAvg',
            field,
            window: window.rows
            ? { type: 'rows', value: window.rows }
            : { type: 'days', value: window.days! },
            as: alias,
        });
        return this;
        },
    };
    }

    movingSum(
    field: string,
    window: { rows?: number; days?: number }
    ) {
    return {
        as: (alias: string) => {
        this.outputs.push({
            op: 'movingSum',
            field,
            window: window.rows
            ? { type: 'rows', value: window.rows }
            : { type: 'days', value: window.days! },
            as: alias,
        });
        return this;
        },
    };
    }

  build() {
    if (!this.sort) {
      throw new Error('Window requires orderBy()');
    }

    return {
      type: 'window' as const,
      partitionBy: this.partition,
      sortBy: this.sort,
      outputs: this.outputs,
    };
  }
}
