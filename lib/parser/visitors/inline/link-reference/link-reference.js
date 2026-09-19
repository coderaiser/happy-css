import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const linkReference = (node) => {
    const args = [
        ...node.children.map(convertInline),
        stringLiteral(node.label),
    ];
    
    return callExpression(identifier('linkReference'), args);
};
