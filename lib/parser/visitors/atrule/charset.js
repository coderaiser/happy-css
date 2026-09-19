import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
    expressionStatement,
} = types;

export function convertCharset(node) {
    const value = node.prelude.children.toArray()[0].value;

    return expressionStatement(
        callExpression(identifier('charset'), [stringLiteral(value)]),
    );
}