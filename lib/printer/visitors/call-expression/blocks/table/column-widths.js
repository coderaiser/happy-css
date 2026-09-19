import {types} from '@putout/babel';

const {
    isCallExpression,
    isStringLiteral,
} = types;

export const getCellContentWidth = (cellPath) => {
    const args = cellPath.node.arguments;
    let total = 0;
    
    for (const arg of args)
        total += getNodeWidth(arg);
    
    return total;
};

const getNodeWidth = (node) => {
    if (isStringLiteral(node))
        return node.value.length;
    
    if (isCallExpression(node)) {
        const {name} = node.callee;
        
        if (name === 'code')
            return 2 + getNodeWidth(node.arguments[0]);
        
        if (name === 'bold')
            return 4 + getNodeWidth(node.arguments[0]);
        
        if (name === 'italic')
            return 2 + getNodeWidth(node.arguments[0]);
        
        if (name === 'strike')
            return 4 + getNodeWidth(node.arguments[0]);
    }
    
    return 0;
};
