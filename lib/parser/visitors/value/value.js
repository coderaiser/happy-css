import * as csstree from 'css-tree';
import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
    numericLiteral,
    arrayExpression,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const filterEmpty = (node) => node.type !== 'WhiteSpace' && node.type !== 'Operator';

const getUrlValue = (node) => {
    if (node.value && node.value.value)
        return node.value.value;

    /* c8 ignore next 3 */
    return node.value;
};

const convertIdentifier = (node) => stringLiteral(node.name);

const convertDimension = (node) => call('dimension', [
    numericLiteral(Number(node.value)),
    stringLiteral(node.unit),
]);

const convertPercentage = (node) => call('percentage', [
    numericLiteral(Number(node.value)),
]);

const convertHash = (node) => call('color', [
    stringLiteral(`#${node.value}`),
]);

const convertNumber = (node) => numericLiteral(Number(node.value));

const convertString = (node) => stringLiteral(node.value);

const convertUrl = (node) => call('functionValue', [
    stringLiteral('url'),
    arrayExpression([stringLiteral(getUrlValue(node))]),
]);

const convertFunctionArg = (node) => convertValueNode(node);

const convertFunction = (node) => call('functionValue', [
    stringLiteral(node.name),
    arrayExpression(
        node.children
            .toArray()
            .filter(filterEmpty)
            .map(convertFunctionArg),
    ),
]);

const valueConvertors = {
    Identifier: convertIdentifier,
    Dimension: convertDimension,
    Percentage: convertPercentage,
    Hash: convertHash,
    Number: convertNumber,
    String: convertString,
    Url: convertUrl,
    Function: convertFunction,
};

function convertValueNode(node) {
    const {type} = node;

    if (valueConvertors[type])
        return valueConvertors[type](node);

    /* c8 ignore next 3 */
    return stringLiteral(csstree.generate(node));
}

const filterValueChildren = (node) => node.type !== 'WhiteSpace';

const convertValueChild = (node) => convertValueNode(node);

export function convertValue(valueNode) {
    const children = valueNode.children
        .toArray()
        .filter(filterValueChildren);

    if (children.length === 1)
        return convertValueNode(children[0]);

    return call('valueList', [arrayExpression(children.map(convertValueChild))]);
}