"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSearch = compileSearch;
function compileSearch(stage) {
    const flags = stage.caseSensitive ? '' : 'i';
    const buildRegex = () => {
        switch (stage.mode) {
            case 'startsWith':
                return `^${stage.term}`;
            case 'exact':
                return `^${stage.term}$`;
            case 'contains':
            default:
                return stage.term;
        }
    };
    return {
        $match: {
            $or: stage.fields.map(field => ({
                [field]: {
                    $regex: buildRegex(),
                    $options: flags,
                },
            })),
        },
    };
}
