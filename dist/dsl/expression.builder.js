"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionBuilder = void 0;
class ExpressionBuilder {
    add(fields) {
        return { kind: 'add', fields };
    }
    concat(values) {
        return { kind: 'concat', values };
    }
    when(field) {
        return {
            gt: (value) => ({
                then: (t) => ({
                    else: (e) => ({
                        kind: 'cond',
                        field,
                        op: 'gt',
                        value,
                        then: t,
                        else: e,
                    }),
                }),
            }),
            eq: (value) => ({
                then: (t) => ({
                    else: (e) => ({
                        kind: 'cond',
                        field,
                        op: 'eq',
                        value,
                        then: t,
                        else: e,
                    }),
                }),
            }),
        };
    }
}
exports.ExpressionBuilder = ExpressionBuilder;
