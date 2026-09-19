import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {identifier, callExpression} = types;

export const html = (node) => {
    return callExpression(identifier('html'), [
        createStringLiteral(node.value),
    ]);
};
