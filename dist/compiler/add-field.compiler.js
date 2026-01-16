"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileAddField = compileAddField;
const expression_compiler_1 = require("./expression.compiler");
function compileAddField(stage) {
    return {
        $addFields: {
            [stage.name]: (0, expression_compiler_1.compileExpression)(stage.expression),
        },
    };
}
