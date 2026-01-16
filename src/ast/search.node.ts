export type SearchMode = 'contains' | 'startsWith' | 'exact';

export interface SearchNode {
  type: 'search';
  term: string;
  fields: string[];
  mode: SearchMode;
  caseSensitive: boolean;
}
