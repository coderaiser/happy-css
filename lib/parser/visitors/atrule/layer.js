import * as csstree from 'css-tree';
import {types} from '@putout/babel';
import {convertNode} from '#parser/visitors';
import {createStringLiteral} from '#create-string-literal';

const {
    identifier,
    callExpression,
    arrayExpression,
    expressionStatement,
} = types;

const convertChild = (comments) => (child) => convertNode(child, comments);

export function convertLayer(node, comments) {
    const query = csstree.generate(node.prelude);
    
    const rules = node
        .block
        .children
        .toArray()
        .map(convertChild(comments));
    
    return expressionStatement(callExpression(identifier('layer'), [
        createStringLiteral(query),
        arrayExpression(rules),
    ]));
}
