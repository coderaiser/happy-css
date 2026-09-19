import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const definition = (node) => {
    const args = [
        stringLiteral(node.label),
        stringLiteral(node.url),
    ];
    
    if (node.title)
        args.push(stringLiteral(node.title));
    
    return callExpression(identifier('definition'), args);
};
