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

const getUrlValue = (node) => node.value;

const convertIdentifier = (node) => stringLiteral(node.name);

const convertDimension = (node) => {
    const value = Number(node.value);
    const valueNode = value < 0 ? types.valueToNode(value) : numericLiteral(value);
    
    return call('dimension', [valueNode, stringLiteral(node.unit)]);
};

const convertPercentage = (node) => {
    const value = Number(node.value);
    const valueNode = value < 0 ? types.valueToNode(value) : numericLiteral(value);
    
    return call('percentage', [valueNode]);
};

const convertHash = (node) => call('color', [
    stringLiteral(`#${node.value}`),
]);

const convertNumber = (node) => {
    const value = Number(node.value);
    return value < 0 ? types.valueToNode(value) : numericLiteral(value);
};

const convertString = (node) => stringLiteral(node.value);

const convertUrl = (node) => call('functionValue', [
    stringLiteral('url'),
    arrayExpression([
        stringLiteral(getUrlValue(node)),
    ]),
]);

const convertFunctionArg = convertValueNode;

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

export function convertValue(valueNode) {
    const children = valueNode.children
        .toArray()
        .filter(filterValueChildren);
    
    if (children.length === 1)
        return convertValueNode(children[0]);
    
    return call('valueList', [
        arrayExpression(children.map(convertFunctionArg)),
    ]);
}
