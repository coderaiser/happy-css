import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';

const {
    identifier,
    callExpression,
    numericLiteral,
    arrayExpression,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const isComma = (node) => node.type === 'Operator' && node.value.trim() === ',';

const isValue = (node) => node.type !== 'Operator';

const filterEmpty = (node) => node.type !== 'WhiteSpace' && !isComma(node);

const getUrlValue = (node) => node.value;

const convertIdentifier = (node) => createStringLiteral(node.name);

const convertDimension = (node) => {
    const value = Number(node.value);
    const valueNode = value < 0 ? types.valueToNode(value) : numericLiteral(value);
    
    return call('dimension', [valueNode, createStringLiteral(node.unit)]);
};

const convertPercentage = (node) => {
    const value = Number(node.value);
    const valueNode = value < 0 ? types.valueToNode(value) : numericLiteral(value);
    
    return call('percentage', [valueNode]);
};

const convertHash = (node) => call('color', [
    createStringLiteral(`#${node.value}`),
]);

const convertNumber = (node) => {
    const value = Number(node.value);
    return value < 0 ? types.valueToNode(value) : numericLiteral(value);
};

const convertString = (node) => call('string', [
    createStringLiteral(node.value),
]);

const convertOperator = (node) => call('operator', [
    createStringLiteral(node.value.trim()),
]);

const convertUrl = (node) => call('functionValue', [
    createStringLiteral('url'),
    arrayExpression([
        call('string', [
            createStringLiteral(getUrlValue(node)),
        ]),
    ]),
]);

const convertFunctionArg = convertValueNode;

// `rgb(255, 0, 0)` is comma separated, `rgb(0 0 0 / 50%)` is space separated
const hasAdjacentValues = (children) => children
    .slice(1)
    .some((node, i) => isValue(node) && isValue(children[i]));

const isSpaceSeparated = (children) => !children.some(isComma) && hasAdjacentValues(children);

const convertFunction = (node) => {
    const children = node.children.toArray();
    const args = [
        createStringLiteral(node.name),
        arrayExpression(children
            .filter(filterEmpty)
            .map(convertFunctionArg)),
    ];
    
    if (isSpaceSeparated(children))
        args.push(createStringLiteral(' '));
    
    return call('functionValue', args);
};

const valueConvertors = {
    Identifier: convertIdentifier,
    Dimension: convertDimension,
    Percentage: convertPercentage,
    Hash: convertHash,
    Number: convertNumber,
    String: convertString,
    Url: convertUrl,
    Function: convertFunction,
    Operator: convertOperator,
};

function convertValueNode(node) {
    const {type} = node;
    
    if (valueConvertors[type])
        return valueConvertors[type](node);
    
    /* c8 ignore next 3 */
    return createStringLiteral(csstree.generate(node));
}

const filterValueChildren = (node) => node.type !== 'WhiteSpace';

export function convertValue(valueNode) {
    if (valueNode.type === 'Raw')
        return createStringLiteral(valueNode.value.trim());
    
    const children = valueNode.children
        .toArray()
        .filter(filterValueChildren);
    
    if (children.length === 1)
        return convertValueNode(children[0]);
    
    return call('valueList', [
        arrayExpression(children.map(convertFunctionArg)),
    ]);
}
