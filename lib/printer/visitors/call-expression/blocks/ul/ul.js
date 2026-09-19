import {types} from '@putout/babel';

const {
    isCallExpression,
    isIdentifier,
} = types;

const isInsideBlockquote = (path) => {
    const {callee} = path.parentPath.node;
    
    return isIdentifier(callee, {
        name: 'blockquote',
    });
};

export const ul = (path, {write, traverse, maybe}) => {
    const args = path.get('arguments');
    const depth = getListDepth(path);
    const indent = '    '.repeat(depth);
    const quote = isInsideBlockquote(path);
    const {length} = args;
    const n = length - 1;
    
    for (const [i, item] of args.entries()) {
        maybe.write(i && quote, '> ');
        write(`${indent}- `);
        traverse(item);
        
        if (!quote || i < n)
            write.newline();
    }
};

export const ol = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const depth = getListDepth(path);
    const indent = '    '.repeat(depth);
    let n = 1;
    
    for (const item of args) {
        write(`${indent}${n++}. `);
        traverse(item);
        write.newline();
    }
};

function getListDepth(path) {
    let depth = 0;
    let current = path.parentPath;
    
    while (current) {
        if (isCallExpression(current) && current.node.callee) {
            const {name} = current.node.callee;
            
            if (name === 'ul' || name === 'ol')
                ++depth;
        }
        
        current = current.parentPath;
    }
    
    return depth;
}
