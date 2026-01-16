"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileExpression = compileExpression;
function compileExpression(expr) {
    switch (expr.kind) {
        case 'add':
            return {
                $add: expr.fields.map(f => `$${f}`),
            };
        case 'concat':
            return {
                $concat: expr.values.map(v => typeof v === 'string' ? `$${v}` : v),
            };
        case 'cond':
            return {
                $cond: {
                    if: {
                        [`$${expr.op}`]: [`$${expr.field}`, expr.value],
                    },
                    then: expr.then,
                    else: expr.else,
                },
            };
    }
}
