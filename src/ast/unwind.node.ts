export interface UnwindNode {
  type: 'unwind';
  path: string;
  preserveEmpty: boolean;
  indexAs?: string;
}
