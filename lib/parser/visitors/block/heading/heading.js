import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {
    identifier,
    callExpression,
    numericLiteral,
} = types;

export const heading = (node) => {
    const {depth} = node;
    const id = identifier('heading');
    
    const args = [
        numericLiteral(depth),
        ...node.children.map(convertInline),
    ];
    
    return callExpression(id, args);
};
