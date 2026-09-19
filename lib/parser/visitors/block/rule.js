import {types} from '@putout/babel';
import {convertSelector} from '../selector/selector.js';
import {convertDeclaration} from '../declaration/declaration.js';
import {convertNode} from '../../index.js';

const {arrayExpression, callExpression, expressionStatement, identifier, stringLiteral} = types;

export function convertRule(node, comments) {
    const selector = convertSelector(node.prelude);

    const block = node.block;
    const blockChildren = toArray(block.children);

    const declarations = blockChildren.map(child => {
        if (child.type === 'Comment') {
            const commentText = nodeToStringComment(child);

            return expressionStatement(callExpression(identifier('comment'), [
                stringLiteral(commentText),
            ]));
        }

        if (child.type === 'Declaration') {
            return convertDeclaration(child, comments);
        }

        return expressionStatement(callExpression(identifier('raw'), [
            stringLiteral(child.type),
        ]));
    });

    return expressionStatement(callExpression(identifier('rule'), [
        selector,
        arrayExpression(declarations),
    ]));
}

const isList = (value) => value && value.constructor && value.constructor.name === 'List';

function toArray(value) {
    if (isList(value))
        return value.toArray();

    if (Array.isArray(value))
        return value;

    return [];
}

function nodeToStringComment(node) {
    if (node.type === 'CDO' || node.type === 'CDC')
        return '/*';

    if (node.type === 'Comment') {
        const value = node.value || '';

        return `/*${value}*/`;
    }

    return '';
}
