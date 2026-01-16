"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowBuilder = void 0;
class WindowBuilder {
    constructor() {
        this.outputs = [];
    }
    partitionBy(field) {
        this.partition = field;
        return this;
    }
    orderBy(field, dir = 'asc') {
        this.sort = {
            field,
            order: dir === 'asc' ? 1 : -1,
        };
        return this;
    }
    runningSum(field) {
        return {
            as: (alias) => {
                this.outputs.push({
                    op: 'runningSum',
                    field,
                    as: alias,
                });
                return this;
            },
        };
    }
    rank() {
        return {
            as: (alias) => {
                this.outputs.push({
                    op: 'rank',
                    as: alias,
                });
                return this;
            },
        };
    }
    denseRank() {
        return {
            as: (alias) => {
                this.outputs.push({
                    op: 'denseRank',
                    as: alias,
                });
                return this;
            },
        };
    }
    movingAvg(field, window) {
        return {
            as: (alias) => {
                this.outputs.push({
                    op: 'movingAvg',
                    field,
                    window: window.rows
                        ? { type: 'rows', value: window.rows }
                        : { type: 'days', value: window.days },
                    as: alias,
                });
                return this;
            },
        };
    }
    movingSum(field, window) {
        return {
            as: (alias) => {
                this.outputs.push({
                    op: 'movingSum',
                    field,
                    window: window.rows
                        ? { type: 'rows', value: window.rows }
                        : { type: 'days', value: window.days },
                    as: alias,
                });
                return this;
            },
        };
    }
    build() {
        if (!this.sort) {
            throw new Error('Window requires orderBy()');
        }
        return {
            type: 'window',
            partitionBy: this.partition,
            sortBy: this.sort,
            outputs: this.outputs,
        };
    }
}
exports.WindowBuilder = WindowBuilder;
