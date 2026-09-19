import {types} from '@putout/babel';
import {convertDeclaration} from '#parser/declaration';

const {
    identifier,
    callExpression,
    stringLiteral,
    numericLiteral,
    arrayExpression,
    expressionStatement,
} = types;

const call = (name, args) => callExpression(identifier(name), args);

const isDeclaration = (node) => node.type === 'Declaration';

const convertPercentageStop = (node) =>
    call('percentage', [numericLiteral(Number(node.value))]);

const convertStop = (node) => {
    if (node.type === 'TypeSelector')
        return stringLiteral(node.name);

    return convertPercentageStop(node);
};

const getKeyframesName = (node) => {
    const nameNode = node.prelude.children.toArray()[0];

    if (nameNode.value)
        return nameNode.value;

    return nameNode.name;
};

const convertChild = (comments) => (child) => convertDeclaration(child, comments);

const getStopNode = (node) => node.prelude.children.toArray()[0].children.toArray()[0];

function convertKeyframeRule(node, comments) {
    const stop = convertStop(getStopNode(node));

    const decls = node.block.children
        .toArray()
        .filter(isDeclaration)
        .map(convertChild(comments));

    return call('keyframeRule', [stop, arrayExpression(decls)]);
}

export function convertKeyframes(node, comments) {
    const name = getKeyframesName(node);

    const convertStopChild = (child) => convertKeyframeRule(child, comments);

    const stops = node.block.children
        .toArray()
        .map(convertStopChild);

    return expressionStatement(
        call('keyframes', [
            stringLiteral(name),
            arrayExpression(stops),
        ]),
    );
}