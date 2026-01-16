"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileWhere = compileWhere;
function compileWhere(group) {
    const clauses = group.conditions.map((c) => {
        if (c.op)
            return compileWhere(c);
        switch (c.kind) {
            case 'eq':
                return { [c.field]: c.value };
            case 'gt':
                return { [c.field]: { $gt: c.value } };
            case 'between':
                return { [c.field]: { $gte: c.min, $lte: c.max } };
        }
    });
    return { [`$${group.op}`]: clauses };
}
