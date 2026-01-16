"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileHaving = compileHaving;
function compileHaving(stage) {
    const match = {};
    for (const c of stage.conditions) {
        switch (c.op) {
            case 'eq':
                match[c.field] = c.value;
                break;
            case 'gt':
                match[c.field] = { $gt: c.value };
                break;
            case 'gte':
                match[c.field] = { $gte: c.value };
                break;
            case 'lt':
                match[c.field] = { $lt: c.value };
                break;
            case 'lte':
                match[c.field] = { $lte: c.value };
                break;
        }
    }
    return { $match: match };
}
