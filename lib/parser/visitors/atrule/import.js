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

const getUrlValue = (node) => {
    if (node.value && node.value.value)
        return node.value.value;

    return node.value;
};

const convertUrlArg = (node) => call('functionValue', [
    stringLiteral('url'),
    arrayExpression([stringLiteral(getUrlValue(node))]),
]);

const convertStringArg = (node) => stringLiteral(node.value);

const importArgConvertors = {
    Url: convertUrlArg,
    String: convertStringArg,
};

export function convertImport(node) {
    const prelude = node.prelude.children.toArray()[0];
    const {type} = prelude;

    if (importArgConvertors[type])
        return expressionStatement(call('cssImport', [importArgConvertors[type](prelude)]));

    return expressionStatement(call('cssImport', [stringLiteral(csstree.generate(prelude))]));
}