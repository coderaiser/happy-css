import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const image = (node) => {
    const args = [
        stringLiteral(node.alt || ''),
        stringLiteral(node.url),
    ];
    
    if (node.title)
        args.push(stringLiteral(node.title));
    
    return callExpression(identifier('image'), args);
};
