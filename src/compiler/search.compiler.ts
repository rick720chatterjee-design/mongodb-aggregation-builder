import { SearchNode } from '../ast/search.node';

export function compileSearch(stage: SearchNode) {
  const flags = stage.caseSensitive ? '' : 'i';

  const buildRegex = () => {
    switch (stage.mode) {
      case 'startsWith':
        return `^${stage.term}`;
      case 'exact':
        return `^${stage.term}$`;
      case 'contains':
      default:
        return stage.term;
    }
  };

  return {
    $match: {
      $or: stage.fields.map(field => ({
        [field]: {
          $regex: buildRegex(),
          $options: flags,
        },
      })),
    },
  };
}
