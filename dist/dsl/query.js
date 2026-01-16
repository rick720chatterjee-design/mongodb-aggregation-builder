"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const condition_builder_1 = require("./condition.builder");
const pipeline_compiler_1 = require("../compiler/pipeline.compiler");
const group_builder_1 = require("./group.builder");
const join_builder_1 = require("./join.builder");
const expression_builder_1 = require("./expression.builder");
const having_builder_1 = require("./having.builder");
const window_builder_1 = require("./window.builder");
class Query {
    constructor() {
        this.whereGroup = { op: 'and', conditions: [] };
        this.stages = [];
        this.havingConditions = [];
    }
    static from(_collection) {
        return new Query();
    }
    where(field) {
        return new condition_builder_1.ConditionBuilder(this, field, this.whereGroup);
    }
    and(field) {
        return this.where(field);
    }
    orGroup(cb) {
        const sub = new Query();
        cb(sub);
        this.whereGroup.conditions.push({
            op: 'or',
            conditions: sub.whereGroup.conditions,
        });
        return this;
    }
    groupBy(field, cb) {
        const builder = new group_builder_1.GroupBuilder();
        cb(builder);
        this.stages.push({
            type: 'group',
            by: field,
            aggregates: builder.build(),
        });
        return this;
    }
    sortBy(field, dir) {
        this.stages.push({
            type: 'sort',
            field,
            dir: dir === 'asc' ? 1 : -1,
        });
        return this;
    }
    paginate(page, limit) {
        this.stages.push({ type: 'paginate', page, limit });
        return this;
    }
    select(fields) {
        this.stages.push({ type: 'select', fields });
        return this;
    }
    join(collection, cb) {
        const builder = new join_builder_1.JoinBuilder(collection);
        cb(builder);
        this.stages.push(builder.build());
        return this;
    }
    facet(opts) {
        this.stages.push({
            type: 'facet',
            page: opts.page,
            limit: opts.limit,
        });
        return this;
    }
    addField(name, cb) {
        const builder = new expression_builder_1.ExpressionBuilder();
        const expression = cb(builder);
        this.stages.push({
            type: 'addField',
            name,
            expression,
        });
        return this;
    }
    search(term, options) {
        if (Array.isArray(options)) {
            this.stages.push({
                type: 'search',
                term,
                fields: options,
                mode: 'contains',
                caseSensitive: false,
            });
        }
        else {
            this.stages.push({
                type: 'search',
                term,
                fields: options.fields,
                mode: options.mode ?? 'contains',
                caseSensitive: options.caseSensitive ?? false,
            });
        }
        return this;
    }
    having(field) {
        const builder = new having_builder_1.HavingBuilder(this.havingConditions)._setField(field);
        return builder;
    }
    unwind(field, opts) {
        this.stages.push({
            type: 'unwind',
            path: field,
            preserveEmpty: opts?.preserveEmpty ?? false,
            indexAs: opts?.indexAs,
        });
        return this;
    }
    window(cb) {
        const builder = new window_builder_1.WindowBuilder();
        cb(builder);
        this.stages.push(builder.build());
        return this;
    }
    _addCondition(cond) {
        this.whereGroup.conditions.push(cond);
    }
    build() {
        if (this.havingConditions.length) {
            this.stages.push({
                type: 'having',
                conditions: this.havingConditions,
            });
        }
        return (0, pipeline_compiler_1.compilePipeline)(this.whereGroup, this.stages);
    }
}
exports.Query = Query;
