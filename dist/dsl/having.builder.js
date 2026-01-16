"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HavingBuilder = void 0;
class HavingBuilder {
    constructor(conditions) {
        this.conditions = conditions;
    }
    eq(value) {
        this.conditions.push({ field: this.field, op: 'eq', value });
        return this;
    }
    gt(value) {
        this.conditions.push({ field: this.field, op: 'gt', value });
        return this;
    }
    gte(value) {
        this.conditions.push({ field: this.field, op: 'gte', value });
        return this;
    }
    lt(value) {
        this.conditions.push({ field: this.field, op: 'lt', value });
        return this;
    }
    lte(value) {
        this.conditions.push({ field: this.field, op: 'lte', value });
        return this;
    }
    _setField(field) {
        this.field = field;
        return this;
    }
}
exports.HavingBuilder = HavingBuilder;
