"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileUnwind = compileUnwind;
function compileUnwind(stage) {
    const unwind = {
        path: `$${stage.path}`,
        preserveNullAndEmptyArrays: stage.preserveEmpty,
    };
    if (stage.indexAs) {
        unwind.includeArrayIndex = stage.indexAs;
    }
    return { $unwind: unwind };
}
