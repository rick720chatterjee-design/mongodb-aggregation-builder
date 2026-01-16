export type Expression =
  | { kind: 'add'; fields: string[] }
  | { kind: 'concat'; values: (string | number)[] }
  | {
      kind: 'cond';
      field: string;
      op: 'gt' | 'lt' | 'eq';
      value: any;
      then: any;
      else: any;
    };
