import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';
import {convertBlock} from '#parser/block';

const isBool = (a) => typeof a === 'boolean';

const {
    identifier,
    callExpression,
    booleanLiteral,
} = types;

export const listItem = (node) => {
    const {children} = node;
    const args = [];
    
    for (const child of children) {
        if (child.type === 'list') {
            args.push(convertBlock(child));
            continue;
        }
        
        if (child.children) {
            args.push(...child.children.map(convertInline));
            continue;
        }
        
        args.push(convertBlock(child));
    }
    
    if (isBool(node.checked))
        args.push(booleanLiteral(node.checked));
    
    return callExpression(identifier('li'), args);
};
