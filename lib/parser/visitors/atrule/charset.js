import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {
    identifier,
    callExpression,
    expressionStatement,
} = types;

export function convertCharset(node) {
    const {value} = node.prelude.children.toArray()[0];
    
    return expressionStatement(callExpression(identifier('charset'), [
        createStringLiteral(value),
    ]));
}
