"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJoin = compileJoin;
const where_compiler_1 = require("./where.compiler");
function compileJoin(join) {
    const pipeline = [
        {
            $match: {
                $expr: {
                    $eq: [`$${join.foreignField}`, `$$localId`],
                },
            },
        },
    ];
    if (join.where) {
        pipeline.push({
            $match: (0, where_compiler_1.compileWhere)(join.where),
        });
    }
    if (join.select?.length) {
        pipeline.push({
            $project: Object.fromEntries(join.select.map(f => [f, 1])),
        });
    }
    return {
        $lookup: {
            from: join.from,
            let: { localId: `$${join.localField}` },
            pipeline,
            as: join.from,
        },
    };
}
