const isUnary = (node) => node.type === 'UnaryExpression';

// the parser emits a UnaryExpression for negative numbers, so `.value` is
// undefined there and has to be read from the argument instead
export const getNumber = ({node}) => {
    if (isUnary(node))
        return `-${node.argument.value}`;
    
    return node.value;
};
