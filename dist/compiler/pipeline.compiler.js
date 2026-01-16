"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilePipeline = compilePipeline;
const group_compiler_1 = require("./group.compiler");
const where_compiler_1 = require("./where.compiler");
const join_compiler_1 = require("./join.compiler");
const facet_compiler_1 = require("./facet.compiler");
const add_field_compiler_1 = require("./add-field.compiler");
const search_compiler_1 = require("./search.compiler");
const having_compiler_1 = require("./having.compiler");
const unwind_compiler_1 = require("./unwind.compiler");
const window_compiler_1 = require("./window.compiler");
function compilePipeline(where, stages) {
    const pipeline = [];
    if (where.conditions.length) {
        pipeline.push({ $match: (0, where_compiler_1.compileWhere)(where) });
    }
    for (const stage of stages) {
        if (stage.type === 'sort') {
            pipeline.push({ $sort: { [stage.field]: stage.dir } });
        }
        if (stage.type === 'paginate') {
            pipeline.push({ $skip: (stage.page - 1) * stage.limit }, { $limit: stage.limit });
        }
        if (stage.type === 'select') {
            pipeline.push({
                $project: Object.fromEntries(stage.fields.map(f => [f, 1])),
            });
        }
        if (stage.type === 'group') {
            pipeline.push((0, group_compiler_1.compileGroup)(stage.by, stage.aggregates));
        }
        if (stage.type === 'join') {
            pipeline.push((0, join_compiler_1.compileJoin)(stage));
        }
        if (stage.type === 'facet') {
            pipeline.push((0, facet_compiler_1.compileFacet)(stage.page, stage.limit));
        }
        if (stage.type === 'addField') {
            pipeline.push((0, add_field_compiler_1.compileAddField)(stage));
        }
        if (stage.type === 'search') {
            pipeline.push((0, search_compiler_1.compileSearch)(stage));
        }
        if (stage.type === 'having') {
            pipeline.push((0, having_compiler_1.compileHaving)(stage));
        }
        if (stage.type === 'unwind') {
            pipeline.push((0, unwind_compiler_1.compileUnwind)(stage));
        }
        if (stage.type === 'window') {
            pipeline.push((0, window_compiler_1.compileWindow)(stage));
        }
    }
    return pipeline;
}
