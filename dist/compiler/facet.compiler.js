"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileFacet = compileFacet;
function compileFacet(page, limit) {
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
