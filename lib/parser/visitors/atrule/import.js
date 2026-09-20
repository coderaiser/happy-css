import * as csstree from 'css-tree';
import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
    arrayExpression,
    expressionStatement,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const getUrlValue = (node) => node.value;

const convertUrlArg = (node) => call('functionValue', [
    stringLiteral('url'),
    arrayExpression([stringLiteral(getUrlValue(node))]),
]);

const convertStringArg = (node) => stringLiteral(node.value);

export function convertImport(node) {
    const prelude = node.prelude;

    if (prelude.children) {
        const child = prelude.children.toArray()[0];
        const {type} = child;

        if (type === 'Url')
            return expressionStatement(call('cssImport', [convertUrlArg(child)]));

        if (type === 'String')
            return expressionStatement(call('cssImport', [convertStringArg(child)]));
    }

    return expressionStatement(call('cssImport', [stringLiteral(prelude.value)]));
}