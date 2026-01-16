"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionBuilder = void 0;
class ConditionBuilder {
    constructor(query, field, group) {
        this.query = query;
        this.field = field;
        this.group = group;
    }
    eq(value) {
        this.group.conditions.push({ kind: 'eq', field: this.field, value });
        return this.query;
    }
    gt(value) {
        this.group.conditions.push({ kind: 'gt', field: this.field, value });
        return this.query;
    }
    between(min, max) {
        this.group.conditions.push({
            kind: 'between',
            field: this.field,
            min,
            max,
        });
        return this.query;
    }
}
exports.ConditionBuilder = ConditionBuilder;
