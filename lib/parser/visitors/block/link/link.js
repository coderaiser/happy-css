import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const link = (node) => {
    const children = node.children.map(convertInline);
    const [first] = children;
    const args = [];
    
    if (children.length === 1)
        args.push(first);
    else
        args.push(callExpression(identifier('paragraph'), children));
    
    args.push(stringLiteral(node.url));
    
    if (node.title)
        args.push(stringLiteral(node.title));
    
    return callExpression(identifier('link'), args);
};
