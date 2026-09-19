import {types} from '@putout/babel';

const {isStringLiteral} = types;

export const link = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const n = args.length;
    const last = args.at(-1);
    const secondLast = n >= 2 && args.at(-2);
    
    let urlIdx = n - 1;
    let titleIdx = -1;
    
    if (isStringLiteral(last) && isStringLiteral(secondLast) && n >= 3) {
        urlIdx = n - 2;
        titleIdx = n - 1;
    }
    
    const href = args[urlIdx].node.value;
    const title = titleIdx >= 0 ? args[titleIdx].node.value : '';
    
    write('[');
    
    for (const arg of args.slice(0, urlIdx))
        traverse(arg);
    
    if (title) {
        write(`](${href} "${title}")`);
        return;
    }
    
    write(`](${href})`);
};
