import {types} from '@putout/babel';
import {convertDeclaration} from '#parser/declaration';

const {
    identifier,
    callExpression,
    arrayExpression,
    expressionStatement,
} = types;

const isDeclaration = (node) => node.type === 'Declaration';

const convertChild = (comments) => (child) => convertDeclaration(child, comments);

export function convertFontFace(node, comments) {
    const decls = node
        .block
        .children
        .toArray()
        .filter(isDeclaration)
        .map(convertChild(comments));
    
    return expressionStatement(callExpression(identifier('fontFace'), [
        arrayExpression(decls),
    ]));
}
