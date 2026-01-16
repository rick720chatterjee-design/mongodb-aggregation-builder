"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBuilder = void 0;
class GroupBuilder {
    constructor() {
        this.aggregates = [];
    }
    sum(field) {
        return this._push({ op: 'sum', field });
    }
    avg(field) {
        return this._push({ op: 'avg', field });
    }
    min(field) {
        return this._push({ op: 'min', field });
    }
    max(field) {
        return this._push({ op: 'max', field });
    }
    count() {
        return this._push({ op: 'count' });
    }
    _push(base) {
        return {
            as: (alias) => {
                this.aggregates.push({ ...base, as: alias });
                return this;
            },
        };
    }
    build() {
        return this.aggregates;
    }
}
exports.GroupBuilder = GroupBuilder;
