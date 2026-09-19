import {types} from '@putout/babel';
import {isPrev, isNext} from '@putout/printer/is';
import {dedent} from '#dedent';

const {
    isIdentifier,
    isTemplateLiteral,
} = types;

const isUL = (node) => isIdentifier(node, {
    name: 'ul',
});

export const blockquote = (path, {maybe, write, traverse}) => {
    const args = path.get('arguments');
    const n = args.length - 1;
    
    maybe.write.newline(isPrev(path));
    
    for (const [i, arg] of args.entries()) {
        const {callee} = arg.node;
        
        write('> ');
        
        const isParagraph = callee && callee.name === 'paragraph';
        
        if (!isParagraph) {
            traverse(arg);
        } else {
            const paragraphArgs = arg.get('arguments');
            
            for (const [j, paragraphArg] of paragraphArgs.entries()) {
                if (isOnlyNewline(paragraphArg))
                    continue;
                
                traverse(paragraphArg);
                
                if (isOnlyNewline(paragraphArgs[j + 1])) {
                    write.newline();
                    write('> ');
                }
            }
        }
        
        if (!isUL(arg))
            maybe.write.newline(i < n);
        
        if (i < n) {
            write('>');
            write.newline();
        }
    }
    
    maybe.write.newline(isNext(path));
};

function isOnlyNewline(path) {
    if (!path || !isTemplateLiteral(path))
        return false;
    
    const [quasi] = path.node.quasis;
    const cooked = dedent(quasi.value.cooked);
    
    return cooked === '\n';
}
