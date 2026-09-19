import {types} from '@putout/babel';
import {isNext} from '@putout/printer/is';

const {
    isCallExpression,
    isStringLiteral,
} = types;

export const tr = (path, {write, traverse, store, maybe}) => {
    const [first] = path.get('arguments');
    const cells = first.get('elements');
    const columnWidths = store();
    
    write('|');
    
    for (const [i, cell] of cells.entries()) {
        write(' ');
        traverse(cell);
        
        if (columnWidths) {
            const contentWidth = getContentWidth(cell);
            const padding = columnWidths[i] - contentWidth;
            
            if (padding > 0)
                write(' '.repeat(padding));
        }
        
        write(' |');
    }
    
    maybe.write.newline(isNext(path));
};

function getContentWidth(cellPath) {
    const args = cellPath.node.arguments;
    let total = 0;
    
    for (const arg of args)
        total += nodeWidth(arg);
    
    return total;
}

function nodeWidth(node) {
    if (isStringLiteral(node))
        return node.value.length;
    
    if (isCallExpression(node)) {
        const {name} = node.callee;
        const [first] = node.arguments;
        
        if (name === 'code')
            return 2 + nodeWidth(first);
        
        if (name === 'bold')
            return 4 + nodeWidth(first);
        
        if (name === 'italic')
            return 2 + nodeWidth(first);
        
        if (name === 'strike')
            return 4 + nodeWidth(first);
        
        if (name === 'link')
            return Infinity;
        
        if (name === 'image')
            return Infinity;
    }
    
    return 0;
}
