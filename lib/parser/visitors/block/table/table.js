import {types} from '@putout/babel';
import {convertBlock} from '#parser/block';

const {
    arrayExpression,
    identifier,
    callExpression,
    stringLiteral,
} = types;

const maybeString = (a) => a || '';

export const table = (node) => {
    const align = node.align
        .map(maybeString)
        .join(',');
    
    const args = [
        stringLiteral(align),
        arrayExpression(node.children.map(convertBlock)),
    ];
    
    return callExpression(identifier('table'), args);
};
