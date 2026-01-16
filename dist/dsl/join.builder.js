"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinBuilder = void 0;
const condition_builder_1 = require("./condition.builder");
class JoinBuilder {
    constructor(from) {
        this.from = from;
        this.whereGroup = { op: 'and', conditions: [] };
    }
    on(local, foreign) {
        this.localField = local;
        this.foreignField = foreign;
        return this;
    }
    where(field) {
        return new condition_builder_1.ConditionBuilder({
            _addCondition: (c) => this.whereGroup.conditions.push(c),
        }, field, this.whereGroup);
    }
    select(fields) {
        this.projection = fields;
        return this;
    }
    build() {
        return {
            type: 'join',
            from: this.from,
            localField: this.localField,
            foreignField: this.foreignField,
            where: this.whereGroup.conditions.length
                ? this.whereGroup
                : undefined,
            select: this.projection,
        };
    }
}
exports.JoinBuilder = JoinBuilder;
