import {types} from '@putout/babel';
import {indent} from '#indent';

const {
    stringLiteral,
    templateLiteral,
    templateElement,
} = types;

export const createStringLiteral = (value) => {
    if (!value.includes('\n'))
        return stringLiteral(value);
    
    const indented = indent(value);
    
    return templateLiteral([
        templateElement({
            raw: escapeRaw(indented),
            cooked: indented,
        }),
    ], []);
};

function escapeRaw(value) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replaceAll('${', '\\${');
}
