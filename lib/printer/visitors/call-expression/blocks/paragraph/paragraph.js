import {isNext} from '@putout/printer/is';
import {types} from '@putout/babel';

const {isCallExpression} = types;

export const paragraph = (path, {print, traverse}) => {
    const args = path.get('arguments');
    
    for (const arg of args)
        traverse(arg);
    
    if (isCallExpression(path.parentPath))
        return;
    
    if (!isNext(path))
        return;
    
    print.newline();
};
