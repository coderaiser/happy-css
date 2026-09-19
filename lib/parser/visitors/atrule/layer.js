import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {convertNode} from '#parser/visitors';

const {
    identifier,
    callExpression,
    stringLiteral,
    arrayExpression,
    expressionStatement,
} = types;

const convertChild = (comments) => (child) => convertNode(child, comments);

export function convertLayer(node, comments) {
    const query = csstree.generate(node.prelude);

    const rules = node.block.children
        .toArray()
        .map(convertChild(comments));

    return expressionStatement(
        callExpression(identifier('layer'), [
            stringLiteral(query),
            arrayExpression(rules),
        ]),
    );
}