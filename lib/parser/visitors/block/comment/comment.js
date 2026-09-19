import {types} from '@putout/babel';

const {callExpression, expressionStatement, identifier, stringLiteral} = types;

export function convertComment(node, comments) {
    const value = nodeToString(node);

    return expressionStatement(callExpression(identifier('comment'), [
        stringLiteral(value),
    ]));
}

function nodeToString(node) {
    if (node.type === 'CDO' || node.type === 'CDC')
        return '/*';

    if (node.type === 'Comment') {
        const value = node.value || '';

        return `/*${value}*/`;
    }

    return '';
}
