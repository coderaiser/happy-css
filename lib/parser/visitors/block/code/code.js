import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const code = (node) => {
    const {value} = node;
    const lang = node.lang || '';
    
    const codeblock = identifier('codeblock');
    
    return callExpression(codeblock, [
        stringLiteral(lang),
        createStringLiteral(value),
    ]);
};
