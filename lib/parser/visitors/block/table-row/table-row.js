import {types} from '@putout/babel';
import {convertBlock} from '#parser/block';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

export const tableRow = (node) => {
    return callExpression(identifier('tr'), [
        arrayExpression(node.children.map(convertBlock)),
    ]);
};
