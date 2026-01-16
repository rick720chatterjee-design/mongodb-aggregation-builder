export declare function compileFacet(page: number, limit: number): {
    $facet: {
        data: ({
            $skip: number;
            $limit?: undefined;
        } | {
            $limit: number;
            $skip?: undefined;
        })[];
        meta: {
            $count: string;
        }[];
    };
};
