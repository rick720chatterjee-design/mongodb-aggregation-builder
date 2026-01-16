export function compileFacet(page: number, limit: number) {
  const skip = (page - 1) * limit;

  return {
    $facet: {
      data: [
        { $skip: skip },
        { $limit: limit },
      ],
      meta: [
        { $count: 'total' },
      ],
    },
  };
}
